import { buildImageUrl } from "./buildImageUrl";
import { setSitemapPath } from "./setSitemapPath";

const PREFIX = "https://picperf.io";
const PREFIX_PATTERN =
  /https:\/\/(?:www.)?picperf\.dev|io\/(?:(?:~(.*?)~)|https?:\/\/)/;

function setSitemapPathOnPath(path: string, sitemapPath: string): string {
  const temporaryUrl = `https://fake.com${path}`;
  const url = setSitemapPath(temporaryUrl, sitemapPath);

  return url.replace("https://fake.com", "");
}

export function transform({
  path,
  host,
  sitemapPath,
}: {
  path: string;
  host?: string;
  sitemapPath?: string;
}): string {
  const url = host
    ? buildImageUrl({ imageUrl: host, imagePath: path, sitemapPath })
    : path;

  // We weren't able to build a valid URL.
  if (!url) {
    if (sitemapPath) {
      return setSitemapPathOnPath(path, sitemapPath);
    }

    return path;
  }

  if (!url.startsWith("http")) {
    return url;
  }

  if (PREFIX_PATTERN.test(url)) {
    return url;
  }

  return `${PREFIX}/${url}`;
}

export function transformSrcset({
  value,
  host,
  sitemapPath,
}: {
  value: string;
  host?: string;
  sitemapPath?: string;
}) {
  return value
    .split(",")
    .map((src) => {
      const [url, size] = src.trim().split(" ");

      return `${transform({ path: url, host, sitemapPath })} ${size}`;
    })
    .join(", ");
}
