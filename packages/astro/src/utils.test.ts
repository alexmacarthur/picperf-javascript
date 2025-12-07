import { buildSrc } from "./utils";
import { it, expect, describe, afterEach } from "vitest";

afterEach(() => {
  import.meta.env.PICPERF_CUSTOM_DOMAIN = undefined;
});

describe("buildSrc", () => {
  it("returns original src and srcset in non-production environments", () => {
    const result = buildSrc({
      src: "/images/photo.jpg",
      origin: "https://example.com",
      srcset: "/images/photo-400.jpg 400w, /images/photo-800.jpg 800w",
      environment: "development",
      includeInSitemap: false,
    });

    expect(result.src).toBe("/images/photo.jpg");
    expect(result.srcset).toBe(
      "/images/photo-400.jpg 400w, /images/photo-800.jpg 800w",
    );
  });

  it("returns transformed src and srcset in production environments", () => {
    const result = buildSrc({
      src: "/images/photo.jpg",
      origin: "https://example.com",
      srcset: "/images/photo-400.jpg 400w, /images/photo-800.jpg 800w",
      environment: "production",
      includeInSitemap: false,
    });

    expect(result.src).toBe(
      "https://picperf.io/https://example.com/images/photo.jpg",
    );
    expect(result.srcset).toBe(
      "https://picperf.io/https://example.com/images/photo-400.jpg 400w, https://picperf.io/https://example.com/images/photo-800.jpg 800w",
    );
  });

  it("handles custom domains correctly", () => {
    const result = buildSrc({
      src: "/images/photo.jpg",
      origin: "https://example.com",
      environment: "production",
      customDomain: "https://cdn.example.com",
      includeInSitemap: false,
    });

    expect(result.src).toBe(
      "https://cdn.example.com/https://example.com/images/photo.jpg",
    );
  });

  it("uses env for custom domain when provided", () => {
    import.meta.env.PICPERF_CUSTOM_DOMAIN = "cdn.customdomain.com";

    const result = buildSrc({
      src: "/images/photo.jpg",
      origin: "https://example.com",
      environment: "production",
      includeInSitemap: false,
    });

    expect(result.src).toBe(
      `https://${import.meta.env.PICPERF_CUSTOM_DOMAIN}/https://example.com/images/photo.jpg`,
    );
  });
});
