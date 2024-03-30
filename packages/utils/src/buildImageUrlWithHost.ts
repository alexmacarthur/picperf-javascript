import { setSitemapPath } from "./setSitemapPath";

function buildRawUrl(imageUrl: string, imagePath: string): string | null {
  const urlObj = new URL(imageUrl);

  if (imagePath.startsWith("data:")) {
    return null;
  }

  if (imagePath.startsWith("//")) {
    return `https:${imagePath}`;
  }

  if (imagePath.startsWith("/")) {
    return `${urlObj.origin}${imagePath}`;
  }

  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  const levels = imagePath.match(/\.\.\//g)?.length || 0;
  const rawImgPath = imagePath.replace(/\.\.?\//g, ""); // dot slashes

  const parsedPath = urlObj.pathname
    .split("/")
    .filter((p) => !!p)
    .reverse();

  const cloned = [...parsedPath];

  cloned.splice(0, levels);

  const newPath = [...cloned.reverse()].join("/");

  return [urlObj.origin, newPath, rawImgPath].filter((p) => !!p).join("/");
}

export function buildImageUrlWithHost({
  imageUrl,
  imagePath,
  sitemapPath,
}: {
  imageUrl: string;
  imagePath: string;
  sitemapPath?: string;
}) {
  const rawUrl = buildRawUrl(imageUrl, imagePath);

  if (sitemapPath && rawUrl) {
    return setSitemapPath(rawUrl, sitemapPath);
  }

  return rawUrl;
}
