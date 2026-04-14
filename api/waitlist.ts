import { kv } from "@vercel/kv";

// Vercel Function using the Web standard Request/Response signature.
// Accepts POST { name, email, phone?, interest?, message? } and pushes the
// email onto the KV list named "waitlist".
export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", Allow: "POST" },
    });
  }

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
    // Push the signup onto the "waitlist" list. We store a small JSON blob
    // so we retain the accompanying form fields alongside the email.
    await kv.rpush(
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
    console.error("Failed to write waitlist signup to KV", err);
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
