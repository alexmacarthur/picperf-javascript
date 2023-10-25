import { transform, transformSrcset } from "./transform";
import { describe, it, expect } from "vitest";

describe("transform()", () => {
  it("returns same path when it's a data URL", () => {
    const path = "data:whatever";
    const transformedPath = transform(path);

    expect(transformedPath).toBe(path);
  });

  it("returns same url when there's no protocol", () => {
    const path = "www.myimage.com";
    const transformedPath = transform(path);

    expect(transformedPath).toBe(path);
  });

  it("returns same url when it's already been picperf-ized", () => {
    const path = "https://picperf.io/https://my-image.com/image.jpg";
    const transformedPath = transform(path);

    expect(transformedPath).toBe(path);
  });

  it("returns same url when it's already been picperf-ized with old domain", () => {
    const path = "https://picperf.dev/https://my-image.com/image.jpg";
    const transformedPath = transform(path);

    expect(transformedPath).toBe(path);
  });

  it("transforms a URL", () => {
    const path = "https://my-image.com/image.jpg";
    const transformedPath = transform(path);

    expect(transformedPath).toBe(
      "https://picperf.io/https://my-image.com/image.jpg",
    );
  });

  it("uses provided host", () => {
    const path = "/image.jpg";
    const host = "https://yourhost.com";
    const transformedPath = transform(path, host);

    expect(transformedPath).toBe(
      "https://picperf.io/https://yourhost.com/image.jpg",
    );
  });
});

describe("transformSrcset()", () => {
  it("transforms srcset", () => {
    const srcset =
      "https://my-image.com/image.jpg 1x, https://my-image.com/image@2x 2x";
    const transformedSrcset = transformSrcset(srcset);

    expect(transformedSrcset).toBe(
      "https://picperf.io/https://my-image.com/image.jpg 1x, https://picperf.io/https://my-image.com/image@2x 2x",
    );
  });
});
