/**
 * @jest-environment node
 */
import { POST } from "@/app/api/contact/route";

function req(body: unknown) {
  return { json: () => Promise.resolve(body) } as unknown as Request;
}

function badJsonReq() {
  return {
    json: () => Promise.reject(new SyntaxError("Unexpected token")),
  } as unknown as Request;
}

const valid = {
  name: "John Doe",
  email: "john@company.com",
  message: "We need enterprise features for our growing team.",
};

describe("POST /api/contact", () => {
  // ── Happy path ──────────────────────────────────────────────────────────
  it("returns 200 for a valid payload", async () => {
    const res = await POST(req(valid));
    expect(res.status).toBe(200);
  });

  it("returns { success: true } for a valid payload", async () => {
    const res = await POST(req(valid));
    const data = await res.json();
    expect(data.success).toBe(true);
  });

  it("returns a confirmation message string", async () => {
    const res = await POST(req(valid));
    const data = await res.json();
    expect(typeof data.message).toBe("string");
    expect(data.message.length).toBeGreaterThan(0);
  });

  it("accepts optional company and phone fields", async () => {
    const res = await POST(
      req({ ...valid, company: "Acme Inc.", phone: "+1 555 0100" })
    );
    expect(res.status).toBe(200);
  });

  // ── Name validation ──────────────────────────────────────────────────────
  it("returns 400 when name is missing", async () => {
    const { name: _n, ...rest } = valid;
    const res = await POST(req(rest));
    expect(res.status).toBe(400);
  });

  it("returns 400 when name is 1 character", async () => {
    const res = await POST(req({ ...valid, name: "J" }));
    expect(res.status).toBe(400);
  });

  it("accepts a 2-character name (boundary)", async () => {
    const res = await POST(req({ ...valid, name: "Jo" }));
    expect(res.status).toBe(200);
  });

  it("returns 400 when name exceeds 100 characters", async () => {
    const res = await POST(req({ ...valid, name: "A".repeat(101) }));
    expect(res.status).toBe(400);
  });

  it("accepts a name of exactly 100 characters (boundary)", async () => {
    const res = await POST(req({ ...valid, name: "A".repeat(100) }));
    expect(res.status).toBe(200);
  });

  it("returns 400 when name is a number", async () => {
    const res = await POST(req({ ...valid, name: 42 }));
    expect(res.status).toBe(400);
  });

  // ── Email validation ─────────────────────────────────────────────────────
  it("returns 400 when email is missing", async () => {
    const { email: _e, ...rest } = valid;
    const res = await POST(req(rest));
    expect(res.status).toBe(400);
  });

  it("returns 400 for an invalid email format", async () => {
    const res = await POST(req({ ...valid, email: "not-an-email" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when email is a number", async () => {
    const res = await POST(req({ ...valid, email: 42 }));
    expect(res.status).toBe(400);
  });

  // ── Message validation ───────────────────────────────────────────────────
  it("returns 400 when message is missing", async () => {
    const { message: _m, ...rest } = valid;
    const res = await POST(req(rest));
    expect(res.status).toBe(400);
  });

  it("returns 400 when message is fewer than 10 characters", async () => {
    const res = await POST(req({ ...valid, message: "Short" }));
    expect(res.status).toBe(400);
  });

  it("accepts a message of exactly 10 characters (boundary)", async () => {
    const res = await POST(req({ ...valid, message: "0123456789" }));
    expect(res.status).toBe(200);
  });

  it("returns 400 when message exceeds 5000 characters", async () => {
    const res = await POST(req({ ...valid, message: "A".repeat(5001) }));
    expect(res.status).toBe(400);
  });

  it("accepts a message of exactly 5000 characters (boundary)", async () => {
    const res = await POST(req({ ...valid, message: "A".repeat(5000) }));
    expect(res.status).toBe(200);
  });

  it("returns 400 when message is null", async () => {
    const res = await POST(req({ ...valid, message: null }));
    expect(res.status).toBe(400);
  });

  // ── Security – XSS prevention ────────────────────────────────────────────
  it("returns 400 for <script> tag in name", async () => {
    const res = await POST(req({ ...valid, name: '<script>alert("xss")</script>' }));
    expect(res.status).toBe(400);
  });

  it("returns 400 for javascript: URI in name", async () => {
    const res = await POST(req({ ...valid, name: "javascript:void(0)" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 for <script> tag in message", async () => {
    const res = await POST(
      req({ ...valid, message: 'Hello <script>alert("xss")</script> world' })
    );
    expect(res.status).toBe(400);
  });

  it("returns 400 for <iframe> injection in message", async () => {
    const res = await POST(
      req({ ...valid, message: '<iframe src="https://evil.com"></iframe>' })
    );
    expect(res.status).toBe(400);
  });

  it("returns 400 for inline onerror handler in message", async () => {
    const res = await POST(
      req({ ...valid, message: '<img src=x onerror="alert(1)"> check this' })
    );
    expect(res.status).toBe(400);
  });

  it("returns 400 for javascript: URI in message", async () => {
    const res = await POST(
      req({ ...valid, message: "Click here: javascript:alert(1) for details" })
    );
    expect(res.status).toBe(400);
  });

  // ── Malformed requests ─────────────────────────────────────────────────
  it("returns 400 for malformed JSON body", async () => {
    const res = await POST(badJsonReq());
    expect(res.status).toBe(400);
  });

  it("returns 400 for an empty body object", async () => {
    const res = await POST(req({}));
    expect(res.status).toBe(400);
  });

  it("returns 400 when body is a plain string", async () => {
    const res = await POST(req("just a string"));
    expect(res.status).toBe(400);
  });

  it("error response includes an error string", async () => {
    const res = await POST(req({}));
    const data = await res.json();
    expect(typeof data.error).toBe("string");
    expect(data.error.length).toBeGreaterThan(0);
  });

  it("response always has Content-Type: application/json", async () => {
    const res = await POST(req(valid));
    expect(res.headers.get("Content-Type")).toContain("application/json");
  });
});
