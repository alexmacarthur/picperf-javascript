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
