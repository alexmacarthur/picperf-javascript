import { buildImageUrlWithHost } from "./buildImageUrlWithHost";
import { setSitemapPath } from "./setSitemapPath";

const PREFIX = "https://picperf.io";
const PREFIX_PATTERN =
  /https:\/\/(?:www.)?picperf\.dev|io\/(?:(?:~(.*?)~)|https?:\/\/)/;

function setSitemapPathOnPath(path: string, sitemapPath: string): string {
  const temporaryUrl = `https://fake.com${path}`;
  const url = setSitemapPath(temporaryUrl, sitemapPath);

  return url.replace("https://fake.com", "");
}

function applyProtocolIfMissing(url: string): string {
  if (!/^https?:\/\//i.test(url)) {
    return `https://${url}`;
  }

  return url;
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

function maybeApplySitemapPath(url: string, sitemapPath?: string): string {
  if (!sitemapPath) {
    return url;
  }

  // It's a path.
  if (!isValidUrl(url) && sitemapPath) {
    return setSitemapPathOnPath(url, sitemapPath);
  }

  return setSitemapPath(url, sitemapPath);
}

export function transform({
  path,

  // The purpose of this host is for use on relative paths.
  host,
  sitemapPath,
  rootHost = PREFIX,
}: {
  path: string;
  host?: string;
  sitemapPath?: string;
  rootHost?: string;
}): string {
  const url = host
    ? buildImageUrlWithHost({ imageUrl: host, imagePath: path, sitemapPath })
    : maybeApplySitemapPath(path, sitemapPath);

  // We weren't able to build a valid URL.
  if (!url) {
    return path;
  }

  if (!url.startsWith("http")) {
    return url;
  }

  if (PREFIX_PATTERN.test(url)) {
    return url;
  }

  return `${applyProtocolIfMissing(rootHost)}/${url}`;
}

export function transformSrcset({
  value,
  host,
  sitemapPath,
  rootHost,
}: {
  value: string;
  host?: string;
  sitemapPath?: string;
  rootHost?: string;
}) {
  return value
    .split(",")
    .map((src) => {
      const [url, size] = src.trim().split(" ");

      return `${transform({ path: url, host, sitemapPath, rootHost })} ${size}`;
    })
    .join(", ");
}
