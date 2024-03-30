import { it, expect } from "vitest";
import { setSitemapPath } from "./setSitemapPath";

it("should set sitemap path", () => {
  const url = "https://google.com";
  const path = "/images/logo.png";

  const result = setSitemapPath(url, path);

  expect("https://google.com/?sitemap_path=/images/logo.png").toEqual(result);
});

it("should set sitemap path with query params", () => {
  const url = "https://google.com?hello=world";
  const path = "/images/logo.png";

  const result = setSitemapPath(url, path);

  expect(
    "https://google.com/?hello=world&sitemap_path=/images/logo.png",
  ).toEqual(result);
});

it("should set sitemap path with existing sitemap path", () => {
  const url = "https://google.com?sitemap_path=/images/logo.png";
  const path = "/images/logo.png";

  const result = setSitemapPath(url, path);

  expect("https://google.com/?sitemap_path=/images/logo.png").toEqual(result);
});
