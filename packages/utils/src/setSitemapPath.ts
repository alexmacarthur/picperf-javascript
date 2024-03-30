export function setSitemapPath(url: string, path: string): string {
  const urlObj = new URL(url);

  urlObj.searchParams.set("sitemap_path", path);

  // Ensure slashes are not encoded.
  return urlObj.toString().replace(/%2F/g, "/");
}
