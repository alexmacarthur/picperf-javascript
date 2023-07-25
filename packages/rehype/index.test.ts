import { expect, it } from "vitest";
import { rehypePicPerf } from "./index";
import { parse, stringify } from "./test-utils";

it("should be true", async () => {
  const ast = await parse(`## hello?`);

  console.log(ast);

  // rehypePicPerf()(ast);

  // const result = stringify(ast);

  // console.log(result);

  expect(true).toBe(true);
});
