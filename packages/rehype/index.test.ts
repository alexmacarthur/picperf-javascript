import { expect, it, describe } from "vitest";
import { rehypePicPerf } from "./index";
import { parse, stringify } from "./test-utils";

describe("absolute paths", () => {
  it("should prefix URL", async () => {
    const ast = await parse(`![](https://some-image.com/image.png)`);

    rehypePicPerf()(ast);

    const result = await stringify(ast);

    expect(result).toContain(
      `<img src="https://picperf.dev/https://some-image.com/image.png" alt="">`,
    );
  });

  it("is opted out of prefixing URL", async () => {
    const ast = await parse(`![](https://some-image.com/image.png)`);

    rehypePicPerf({
      shouldTransform: () => false,
    })(ast);

    const result = await stringify(ast);

    expect(result).toContain(
      `<img src="https://some-image.com/image.png" alt="">`,
    );
  });
});

describe("non-HTTP paths", () => {
  it("should not prefix URL for relative paths", async () => {
    const ast = await parse(`![my alt](./image.png)`);
    rehypePicPerf()(ast);
    const result = await stringify(ast);

    expect(result).toContain(`<img src="./image.png" alt="my alt">`);
  });

  it("should not prefix URL for root paths", async () => {
    const ast = await parse(`![my alt](/image.png)`);

    rehypePicPerf()(ast);

    const result = await stringify(ast);

    expect(result).toContain(`<img src="/image.png" alt="my alt">`);
  });
});
