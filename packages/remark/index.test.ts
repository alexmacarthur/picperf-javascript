import { expect, it, describe } from "vitest";
import { remarkPicPerf } from "./index";
import { parse, stringify } from "./test-utils";

describe("absolute paths", () => {
  it("should prefix URL", async () => {
    const ast = await parse("![](https://some-image.com/image.png)");

    await remarkPicPerf()(ast);

    const result = await stringify(ast);

    expect(result).toContain(
      `<img src="https://picperf.io/https://some-image.com/image.png" alt="">`,
    );
  });

  it("should not prefix URL that's already been prefixed", async () => {
    const ast = await parse(
      "![](https://picperf.io/https://some-image.com/image.png)",
    );

    await remarkPicPerf()(ast);

    const result = await stringify(ast);

    expect(result).toContain(
      `<img src="https://picperf.io/https://some-image.com/image.png" alt="">`,
    );
  });

  it("is opted out of prefixing URL", async () => {
    const ast = await parse("![](https://some-image.com/image.png)");

    remarkPicPerf({
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
    const ast = await parse("![my alt](./image.png)");

    await remarkPicPerf()(ast);

    const result = await stringify(ast);

    expect(result).toContain(`<img src="./image.png" alt="my alt">`);
  });

  it("should prefix URL for relative paths when host is given", async () => {
    const ast = await parse("![my alt](./image.png)");

    await remarkPicPerf({
      host: "https://some-image.com",
    })(ast);

    const result = await stringify(ast);

    expect(result).toContain(
      `<img src="https://picperf.io/https://some-image.com/image.png" alt="my alt">`,
    );
  });

  it("should not prefix URL for root paths", async () => {
    const ast = await parse("![my alt](/image.png)");

    await remarkPicPerf()(ast);

    const result = await stringify(ast);

    expect(result).toContain(`<img src="/image.png" alt="my alt">`);
  });
});
