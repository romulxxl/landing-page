const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const XSS_RE = /<\s*script|javascript\s*:|on\w+\s*=|<\s*iframe/i;

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request): Promise<Response> {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const { email } = body;

  if (!email || typeof email !== "string" || email.trim() === "") {
    return json({ error: "Email is required" }, 400);
  }

  if (!EMAIL_RE.test(email.trim())) {
    return json({ error: "Invalid email format" }, 400);
  }

  if (email.length > 254) {
    return json({ error: "Email exceeds maximum length" }, 400);
  }

  if (XSS_RE.test(email)) {
    return json({ error: "Invalid characters in email" }, 400);
  }

  return json({ success: true, message: "Successfully subscribed!" }, 200);
}
