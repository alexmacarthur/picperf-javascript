import { buildImageUrl } from "./buildImageUrl";

const PREFIX = "https://picperf.dev";

export function transform(path: string, host?: string) {
  const url = host ? buildImageUrl(host, path) : path;

  if (!url.startsWith("http")) {
    return url;
  }

  if (url.startsWith(PREFIX)) {
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
