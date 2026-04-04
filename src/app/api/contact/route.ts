const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const XSS_RE = /<\s*script|javascript\s*:|on\w+\s*=|<\s*iframe/i;

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function hasXSS(value: string): boolean {
  return XSS_RE.test(value);
}

export async function POST(request: Request): Promise<Response> {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const { name, email, message } = body;

  // --- name ---
  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return json({ error: "Name must be at least 2 characters" }, 400);
  }
  if (name.length > 100) {
    return json({ error: "Name exceeds maximum length" }, 400);
  }
  if (hasXSS(name)) {
    return json({ error: "Invalid characters in name" }, 400);
  }

  // --- email ---
  if (!email || typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return json({ error: "Valid email is required" }, 400);
  }

  // --- message ---
  if (!message || typeof message !== "string" || message.trim().length < 10) {
    return json({ error: "Message must be at least 10 characters" }, 400);
  }
  if (message.length > 5000) {
    return json({ error: "Message exceeds maximum length" }, 400);
  }
  if (hasXSS(message)) {
    return json({ error: "Invalid characters in message" }, 400);
  }

  return json(
    { success: true, message: "Message received. We'll be in touch within 24 hours." },
    200
  );
}
