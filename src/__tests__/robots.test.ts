import robots from "@/app/robots";

describe("robots.ts", () => {
  it("allows all user agents to crawl /", () => {
    const result = robots();
    expect(result.rules).toEqual({ userAgent: "*", allow: "/" });
  });

  it("returns the correct sitemap URL", () => {
    const result = robots();
    expect(result.sitemap).toBe("https://flowly.io/sitemap.xml");
  });
});
