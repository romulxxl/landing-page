import sitemap from "@/app/sitemap";

describe("sitemap.ts", () => {
  it("returns exactly one entry", () => {
    const result = sitemap();
    expect(result).toHaveLength(1);
  });

  it("entry has correct URL", () => {
    const result = sitemap();
    expect(result[0].url).toBe("https://flowly.io");
  });

  it("entry has priority 1", () => {
    const result = sitemap();
    expect(result[0].priority).toBe(1);
  });

  it("entry has a lastModified date", () => {
    const result = sitemap();
    expect(result[0].lastModified).toBeInstanceOf(Date);
  });
});
