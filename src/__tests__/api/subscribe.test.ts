/**
 * @jest-environment node
 */
import { POST } from "@/app/api/subscribe/route";

/**
 * Minimal request mock — the handler only calls request.json().
 * This avoids needing the global `Request` constructor in jsdom.
 */
function req(body: unknown) {
  return { json: () => Promise.resolve(body) } as unknown as Request;
}

function badJsonReq() {
  return {
    json: () => Promise.reject(new SyntaxError("Unexpected token")),
  } as unknown as Request;
}

describe("POST /api/subscribe", () => {
  // ── Happy path ──────────────────────────────────────────────────────────
  it("returns 200 for a valid email", async () => {
    const res = await POST(req({ email: "user@example.com" }));
    expect(res.status).toBe(200);
  });

  it("returns { success: true } for a valid email", async () => {
    const res = await POST(req({ email: "user@example.com" }));
    const data = await res.json();
    expect(data.success).toBe(true);
  });

  it("accepts subdomains in the email", async () => {
    const res = await POST(req({ email: "user@mail.company.io" }));
    expect(res.status).toBe(200);
  });

  it("accepts email with plus sign", async () => {
    const res = await POST(req({ email: "user+tag@example.com" }));
    expect(res.status).toBe(200);
  });

  // ── Format validation ────────────────────────────────────────────────────
  it("returns 400 when email field is missing", async () => {
    const res = await POST(req({}));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(typeof data.error).toBe("string");
  });

  it("returns 400 for empty string email", async () => {
    const res = await POST(req({ email: "" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 for email without @ sign", async () => {
    const res = await POST(req({ email: "notanemail" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 for email without domain", async () => {
    const res = await POST(req({ email: "user@" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 for email without local part", async () => {
    const res = await POST(req({ email: "@domain.com" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when email is a number", async () => {
    const res = await POST(req({ email: 12345 }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when email is null", async () => {
    const res = await POST(req({ email: null }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when email is an array", async () => {
    const res = await POST(req({ email: ["a@b.com"] }));
    expect(res.status).toBe(400);
  });

  it("returns 400 for email longer than 254 characters", async () => {
    const longEmail = "a".repeat(249) + "@x.com"; // 255 chars > 254
    const res = await POST(req({ email: longEmail }));
    expect(res.status).toBe(400);
  });

  // ── Security – XSS / injection ────────────────────────────────────────
  it("returns 400 for <script> tag in email", async () => {
    const res = await POST(req({ email: '<script>alert("xss")</script>' }));
    expect(res.status).toBe(400);
  });

  it("returns 400 for javascript: URI", async () => {
    const res = await POST(req({ email: "javascript:alert(1)" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 for inline event handler", async () => {
    const res = await POST(req({ email: "x@y.com\" onerror=\"alert(1)" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 for SQL injection pattern (not a valid email)", async () => {
    const res = await POST(req({ email: "' OR '1'='1" }));
    expect(res.status).toBe(400);
  });

  // ── Malformed requests ─────────────────────────────────────────────────
  it("returns 400 for malformed JSON body", async () => {
    const res = await POST(badJsonReq());
    expect(res.status).toBe(400);
  });

  it("error response always has Content-Type: application/json", async () => {
    const res = await POST(req({}));
    expect(res.headers.get("Content-Type")).toContain("application/json");
  });

  it("success response has Content-Type: application/json", async () => {
    const res = await POST(req({ email: "user@example.com" }));
    expect(res.headers.get("Content-Type")).toContain("application/json");
  });
});
