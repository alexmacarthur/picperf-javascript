export function transform(value: string) {
  if (!value.startsWith("http")) {
    return value;
  }

  return `https://picperf.dev/${value}`;
}

export function transformSrcset(value: string) {
  return value
    .split(",")
    .map((src) => {
      const [url, size] = src.trim().split(" ");

      return `${transform(url)} ${size}`;
    })
    .join(",");
}
