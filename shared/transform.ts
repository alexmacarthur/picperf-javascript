const PREFIX = "https://picperf.dev";

export function transform(value: string) {
  if (!value.startsWith("http")) {
    return value;
  }

  if (value.startsWith(PREFIX)) {
    return value;
  }

  return `${PREFIX}/${value}`;
}

export function transformSrcset(value: string) {
  return value
    .split(",")
    .map((src) => {
      const [url, size] = src.trim().split(" ");

      return `${transform(url)} ${size}`;
    })
    .join(", ");
}
