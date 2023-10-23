import { buildImageUrl } from "./buildImageUrl";

const PREFIX = "https://picperf.dev";
const PREFIX_PATTERN =
  /https:\/\/(?:www.)?picperf\.dev\/(?:(?:~(.*?)~)|https?:\/\/)/;

export function transform(path: string, host?: string) {
  const url = host ? buildImageUrl(host, path) : path;

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

  return `${PREFIX}/${url}`;
}

export function transformSrcset(value: string, host?: string) {
  return value
    .split(",")
    .map((src) => {
      const [url, size] = src.trim().split(" ");

      return `${transform(url, host)} ${size}`;
    })
    .join(", ");
}
