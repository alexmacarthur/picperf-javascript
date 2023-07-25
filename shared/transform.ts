function transform(value: string) {
  return `https://picperf.dev/${value}`;
}

function transformSrcset(value: string) {
  return value
    .split(",")
    .map((src) => {
      const [url, size] = src.trim().split(" ");

      return `${transform(url)} ${size}`;
    })
    .join(",");
}
