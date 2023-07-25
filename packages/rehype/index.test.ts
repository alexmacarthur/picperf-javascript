import { expect, it, describe } from "vitest";
import { rehypePicPerf } from "./index";
import { parse, stringify } from "./test-utils";

describe("absolute paths", () => {
  it("should prefix URL", async () => {
    const ast = await parse(
      `<img src="https://some-image.com/image.png" alt="">`,
    );

    await rehypePicPerf()(ast);

    const result = await stringify(ast);

    expect(result).toContain(
      `<img src="https://picperf.dev/https://some-image.com/image.png" alt="">`,
    );
  });

  it("should not prefix URL that's already been prefixed", async () => {
    const ast = await parse(
      `<img src="https://picperf.dev/https://some-image.com/image.png" alt="">`,
    );

    await rehypePicPerf()(ast);

    const result = await stringify(ast);

    expect(result).toContain(
      `<img src="https://picperf.dev/https://some-image.com/image.png" alt="">`,
    );
  });

  it("is opted out of prefixing URL", async () => {
    const ast = await parse(
      `<img src="https://some-image.com/image.png" alt="">`,
    );

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
    const ast = await parse(`<img src="./image.png" alt="my alt">`);
    await rehypePicPerf()(ast);
    const result = await stringify(ast);

    expect(result).toContain(`<img src="./image.png" alt="my alt">`);
  });

  it("should not prefix URL for root paths", async () => {
    const ast = await parse(`<img src="/image.png" alt="my alt">`);

    await rehypePicPerf()(ast);

    const result = await stringify(ast);

    expect(result).toContain(`<img src="/image.png" alt="my alt">`);
  });
});

describe("data-src", () => {
  it("should not prefix URL for data-src", async () => {
    const ast = await parse(
      `<img data-src="https://some-image.com/image.png" alt="">`,
    );

    await rehypePicPerf()(ast);

    const result = await stringify(ast);

    expect(result).toContain(
      `<img data-src="https://picperf.dev/https://some-image.com/image.png" alt="">`,
    );
  });
});

describe("srcset", () => {
  it("should not prefix URL for non-HTTP srcset values", async () => {
    const ast = await parse(`
    <img srcset="elf-400w.jpg 480w, elf-800w.jpg 800w" sizes="(max-width: 600px) 480px, 800px" src="elf.jpg" >
    `);

    await rehypePicPerf()(ast);

    const result = await stringify(ast);

    expect(result).toContain(
      `<img srcset="elf-400w.jpg 480w, elf-800w.jpg 800w" sizes="(max-width: 600px) 480px, 800px" src="elf.jpg">`,
    );
  });

  it("should prefix URL for HTTP srcset values", async () => {
    const ast = await parse(`
      <img srcset="https://some-image.com/elf-400w.jpg 480w, https://some-image.com/elf-800w.jpg 800w" sizes="(max-width: 600px) 480px, 800px" src="https://some-image.com/elf.jpg">
    `);

    await rehypePicPerf()(ast);

    const result = await stringify(ast);

    expect(result).toContain(
      `<img srcset="https://picperf.dev/https://some-image.com/elf-400w.jpg 480w, https://picperf.dev/https://some-image.com/elf-800w.jpg 800w" sizes="(max-width: 600px) 480px, 800px" src="https://picperf.dev/https://some-image.com/elf.jpg">`,
    );
  });
});
