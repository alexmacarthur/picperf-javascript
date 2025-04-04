import { beforeAll } from "vitest";

beforeAll(() => {
  Object.defineProperty(HTMLImageElement.prototype, "currentSrc", {
    get() {
      return this.src || "";
    },
    configurable: true,
  });
});
