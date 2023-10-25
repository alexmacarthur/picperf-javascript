export function buildImageUrl(url: string, path: string) {
  const urlObj = new URL(url);

  if (path.startsWith("data:")) {
    return null;
  }

  if (path.startsWith("//")) {
    return `https:${path}`;
  }

  if (path.startsWith("/")) {
    return `${urlObj.origin}${path}`;
  }

  if (path.startsWith("http")) {
    return path;
  }

  const levels = path.match(/\.\.\//g)?.length || 0;
  const rawImgPath = path.replace(/\.\.?\//g, ""); // dot slashes

  const parsedPath = urlObj.pathname
    .split("/")
    .filter((p) => !!p)
    .reverse();

  const cloned = [...parsedPath];

  cloned.splice(0, levels);

  const newPath = [...cloned.reverse()].join("/");

  return [urlObj.origin, newPath, rawImgPath].filter((p) => !!p).join("/");
}
