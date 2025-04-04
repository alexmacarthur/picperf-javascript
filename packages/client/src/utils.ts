import { ImageWidth, Url } from "./types";

export function getWidth(image: HTMLImageElement): Promise<ImageWidth> {
  return new Promise((resolve) => {
    function getRenderedWidth() {
      return image.getBoundingClientRect().width;
    }

    if (!image.complete) {
      return image.addEventListener("load", () => {
        resolve({
          url: image.currentSrc as Url,
          renderedWidth: getRenderedWidth(),
          naturalWidth: image.naturalWidth,
        });
      });
    }

    return resolve({
      url: image.currentSrc as Url,
      renderedWidth: getRenderedWidth(),
      naturalWidth: image.naturalWidth,
    });
  });
}

export function buildYieldPolyfill() {
  globalThis.scheduler = globalThis.scheduler || {};
  globalThis.scheduler.postTask =
    globalThis.scheduler.postTask ||
    ((_fn, _opts) => {
      return new Promise((r) => setTimeout(r, 0));
    });
}

export async function humbleLoop<T>(items: Array<T>, fn: (item: T) => void) {
  for (const item of items) {
    fn(item);

    await globalThis.scheduler.postTask(() => {}, {
      priority: "background",
    });
  }
}
