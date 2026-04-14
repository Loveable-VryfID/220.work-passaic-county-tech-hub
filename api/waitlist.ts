import { createClient, type RedisClientType } from "redis";

// Vercel Function using the Web standard Request/Response signature.
//
// POST /api/waitlist
//   Body: { name, email, phone?, interest?, message? }
//   Pushes the signup onto the Redis list named "waitlist".
//
// GET /api/waitlist
//   Admin-only. Requires either an `Authorization: Bearer <ADMIN_TOKEN>`
//   header or a `?token=<ADMIN_TOKEN>` query param. Returns the full list
//   of signups as JSON, or as a downloadable CSV when `?format=csv`.

// Connects to the Redis database provisioned via the Vercel Marketplace
// (Upstash). The connection string is exposed as the REDIS_URL env var.
let cachedClient: RedisClientType | null = null;

async function getRedisClient(): Promise<RedisClientType> {
  if (cachedClient?.isOpen) return cachedClient;
  const url = process.env.REDIS_URL;
  if (!url) {
    throw new Error(
      "REDIS_URL is not set. Connect a Redis database to this project in the Vercel dashboard (Storage tab).",
    );
  }
  const client: RedisClientType = createClient({ url });
  client.on("error", (err) => console.error("Redis client error", err));
  await client.connect();
  cachedClient = client;
  return client;
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method === "GET") {
    return handleGet(request);
  }
  if (request.method === "POST") {
    return handlePost(request);
  }
  return new Response(JSON.stringify({ error: "Method not allowed" }), {
    status: 405,
    headers: { "Content-Type": "application/json", Allow: "GET, POST" },
  });
}

async function handlePost(request: Request): Promise<Response> {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const name = typeof payload.name === "string" ? payload.name.trim() : "";

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    return new Response(
      JSON.stringify({ error: "A valid email is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  try {
    const client = await getRedisClient();
    await client.rPush(
      "waitlist",
      JSON.stringify({
        email,
        name,
        phone: typeof payload.phone === "string" ? payload.phone : "",
        interest: typeof payload.interest === "string" ? payload.interest : "",
        message: typeof payload.message === "string" ? payload.message : "",
        submittedAt: new Date().toISOString(),
      }),
    );
  } catch (err) {
    console.error("Failed to write waitlist signup to Redis", err);
    return new Response(
      JSON.stringify({ error: "Could not save signup. Please try again." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

async function handleGet(request: Request): Promise<Response> {
  const adminToken = process.env.ADMIN_TOKEN;
  if (!adminToken) {
    return new Response(
      JSON.stringify({
        error:
          "ADMIN_TOKEN environment variable is not set. Configure it in the Vercel dashboard to enable waitlist reads.",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } },
    );
  }

  const url = new URL(request.url);
  const headerToken = request.headers
    .get("authorization")
    ?.replace(/^Bearer\s+/i, "");
  const queryToken = url.searchParams.get("token");
  const providedToken = headerToken || queryToken || "";

  if (providedToken !== adminToken) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const client = await getRedisClient();
    const raw = await client.lRange("waitlist", 0, -1);
    const entries = raw.map((item) => {
      if (typeof item !== "string") return item;
      try {
        return JSON.parse(item);
      } catch {
        return item;
      }
    });

    const format = url.searchParams.get("format")?.toLowerCase();
    if (format === "csv") {
      return new Response(entriesToCsv(entries), {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": 'attachment; filename="waitlist.csv"',
          "Cache-Control": "no-store",
        },
      });
    }

    return new Response(
      JSON.stringify({ count: entries.length, entries }, null, 2),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (err) {
    console.error("Failed to read waitlist from Redis", err);
    return new Response(
      JSON.stringify({ error: "Could not read waitlist." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

// Build an Excel-friendly CSV. Prepends a UTF-8 BOM so Excel detects encoding
// correctly, and escapes any field containing quotes, commas, or newlines.
function entriesToCsv(entries: unknown[]): string {
  const columns = [
    "submittedAt",
    "name",
    "email",
    "phone",
    "interest",
    "message",
  ];
  const escape = (value: unknown): string => {
    const str = value == null ? "" : String(value);
    return /[",\n\r]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
  };
  const header = columns.join(",");
  const rows = entries.map((entry) => {
    const record = (entry && typeof entry === "object" ? entry : {}) as Record<
      string,
      unknown
    >;
    return columns.map((col) => escape(record[col])).join(",");
  });
  return "\uFEFF" + [header, ...rows].join("\r\n") + "\r\n";
}
