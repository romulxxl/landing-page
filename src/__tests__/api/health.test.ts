/**
 * @jest-environment node
 */
import { GET } from "@/app/api/health/route";

describe("GET /api/health", () => {
  it("returns HTTP 200", async () => {
    const res = await GET();
    expect(res.status).toBe(200);
  });

  it("returns Content-Type: application/json", async () => {
    const res = await GET();
    expect(res.headers.get("Content-Type")).toContain("application/json");
  });

  it('returns { status: "ok" }', async () => {
    const res = await GET();
    const data = await res.json();
    expect(data.status).toBe("ok");
  });

  it("returns a valid ISO 8601 timestamp", async () => {
    const before = Date.now();
    const res = await GET();
    const after = Date.now();
    const data = await res.json();
    const ts = new Date(data.timestamp).getTime();
    expect(ts).toBeGreaterThanOrEqual(before);
    expect(ts).toBeLessThanOrEqual(after);
  });

  it("timestamp matches ISO format", async () => {
    const res = await GET();
    const data = await res.json();
    expect(data.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  });
});
