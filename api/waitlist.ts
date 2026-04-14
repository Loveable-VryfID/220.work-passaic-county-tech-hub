// Vercel Function using the Web standard Request/Response signature.
//
// POST /api/waitlist
//   Body: { name, email, phone?, interest?, message? }
//   Subscribes the signup to a Mailchimp audience.
//
// Required environment variables (set in the Vercel dashboard → Settings → Environment Variables):
//   MAILCHIMP_API_KEY  — e.g. "abc123def456-us14"  (get one at Mailchimp → Account → Extras → API keys)
//   MAILCHIMP_LIST_ID  — the audience ID (Mailchimp → Audience → Settings → Audience name and defaults)
//
// Optional:
//   MAILCHIMP_DOUBLE_OPTIN — set to "true" to require an email confirmation before
//                            the subscriber is added. Defaults to single opt-in.

type SubscribeStatus = "subscribed" | "pending";

interface MailchimpError {
  title?: string;
  detail?: string;
  status?: number;
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, 405, { Allow: "POST" });
  }

  const apiKey = process.env.MAILCHIMP_API_KEY;
  const listId = process.env.MAILCHIMP_LIST_ID;
  if (!apiKey || !listId) {
    return json(
      {
        error:
          "Mailchimp is not configured. Set MAILCHIMP_API_KEY and MAILCHIMP_LIST_ID in the Vercel dashboard.",
      },
      503,
    );
  }

  // The Mailchimp API key has the form "<hash>-<datacenter>", e.g. "abc123-us14".
  // The datacenter prefix determines the API hostname.
  const dcMatch = apiKey.match(/-([a-z]+\d+)$/i);
  if (!dcMatch) {
    return json(
      { error: "MAILCHIMP_API_KEY is missing its datacenter suffix (e.g. '-us14')." },
      500,
    );
  }
  const dc = dcMatch[1];

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const phone = typeof payload.phone === "string" ? payload.phone.trim() : "";
  const interest =
    typeof payload.interest === "string" ? payload.interest.trim() : "";
  const message =
    typeof payload.message === "string" ? payload.message.trim() : "";

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    return json({ error: "A valid email is required" }, 400);
  }

  // Split "Jane Doe" into FNAME / LNAME for Mailchimp's default merge fields.
  const [firstName, ...rest] = name.split(/\s+/);
  const lastName = rest.join(" ");
  const mergeFields: Record<string, string> = {};
  if (firstName) mergeFields.FNAME = firstName;
  if (lastName) mergeFields.LNAME = lastName;
  if (phone) mergeFields.PHONE = phone;

  const status: SubscribeStatus =
    process.env.MAILCHIMP_DOUBLE_OPTIN === "true" ? "pending" : "subscribed";

  const tags: string[] = [];
  if (interest) tags.push(`interest:${interest}`);

  // Mailchimp has no standard "message" field. Stash it in a NOTES merge field
  // when present; Mailchimp silently ignores unknown merge fields, so this is
  // safe even if the audience doesn't have a NOTES field configured.
  if (message) mergeFields.NOTES = message;

  const url = `https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members`;
  const auth = Buffer.from(`anystring:${apiKey}`).toString("base64");

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status,
        merge_fields: mergeFields,
        tags,
      }),
    });

    if (response.ok) {
      return json({ ok: true }, 200);
    }

    const errorBody = (await response.json().catch(() => ({}))) as MailchimpError;

    // Mailchimp returns 400 with title "Member Exists" when the email is
    // already on the list. Treat that as success from the user's perspective —
    // they're already signed up.
    if (errorBody.title === "Member Exists") {
      return json({ ok: true, alreadySubscribed: true }, 200);
    }

    console.error("Mailchimp subscribe failed", response.status, errorBody);
    return json(
      {
        error: "Could not save signup. Please try again.",
        detail: errorBody.detail || errorBody.title || `HTTP ${response.status}`,
      },
      502,
    );
  } catch (err) {
    console.error("Failed to reach Mailchimp", err);
    const detail = err instanceof Error ? err.message : String(err);
    return json({ error: "Could not save signup. Please try again.", detail }, 500);
  }
}

function json(body: unknown, status: number, extraHeaders: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...extraHeaders },
  });
}
