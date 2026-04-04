import { securityHeaders } from "@/lib/security-headers";

function findHeader(key: string) {
  return securityHeaders.find(
    (h) => h.key.toLowerCase() === key.toLowerCase()
  );
}

describe("Security Headers", () => {
  it("exports an array of header objects", () => {
    expect(Array.isArray(securityHeaders)).toBe(true);
    expect(securityHeaders.length).toBeGreaterThan(0);
  });

  it("every header has a non-empty key and value", () => {
    securityHeaders.forEach(({ key, value }) => {
      expect(typeof key).toBe("string");
      expect(key.trim().length).toBeGreaterThan(0);
      expect(typeof value).toBe("string");
      expect(value.trim().length).toBeGreaterThan(0);
    });
  });

  describe("X-Frame-Options", () => {
    it("is present", () => {
      expect(findHeader("X-Frame-Options")).toBeDefined();
    });

    it("is set to DENY to prevent clickjacking", () => {
      expect(findHeader("X-Frame-Options")?.value).toBe("DENY");
    });
  });

  describe("X-Content-Type-Options", () => {
    it("is present", () => {
      expect(findHeader("X-Content-Type-Options")).toBeDefined();
    });

    it("is set to nosniff to prevent MIME-type sniffing", () => {
      expect(findHeader("X-Content-Type-Options")?.value).toBe("nosniff");
    });
  });

  describe("X-XSS-Protection", () => {
    it("is present", () => {
      expect(findHeader("X-XSS-Protection")).toBeDefined();
    });

    it("enables XSS filtering in legacy browsers", () => {
      const value = findHeader("X-XSS-Protection")?.value ?? "";
      expect(value).toContain("1");
      expect(value).toContain("mode=block");
    });
  });

  describe("Referrer-Policy", () => {
    it("is present", () => {
      expect(findHeader("Referrer-Policy")).toBeDefined();
    });

    it("restricts referrer info with strict-origin-when-cross-origin", () => {
      expect(findHeader("Referrer-Policy")?.value).toBe(
        "strict-origin-when-cross-origin"
      );
    });
  });

  describe("Permissions-Policy", () => {
    it("is present", () => {
      expect(findHeader("Permissions-Policy")).toBeDefined();
    });

    it("disables camera access", () => {
      expect(findHeader("Permissions-Policy")?.value).toContain("camera=()");
    });

    it("disables microphone access", () => {
      expect(findHeader("Permissions-Policy")?.value).toContain(
        "microphone=()"
      );
    });

    it("disables geolocation access", () => {
      expect(findHeader("Permissions-Policy")?.value).toContain(
        "geolocation=()"
      );
    });
  });

  describe("Strict-Transport-Security (HSTS)", () => {
    it("is present", () => {
      expect(findHeader("Strict-Transport-Security")).toBeDefined();
    });

    it("has max-age of at least 1 year (31536000s)", () => {
      const value = findHeader("Strict-Transport-Security")?.value ?? "";
      const match = value.match(/max-age=(\d+)/);
      expect(match).not.toBeNull();
      expect(Number(match![1])).toBeGreaterThanOrEqual(31536000);
    });

    it("includes subdomains", () => {
      expect(findHeader("Strict-Transport-Security")?.value).toContain(
        "includeSubDomains"
      );
    });

    it("includes preload directive", () => {
      expect(findHeader("Strict-Transport-Security")?.value).toContain(
        "preload"
      );
    });
  });
});
