import { ImageWidth, TransformationRequest, Url } from "./types";
import { buildYieldPolyfill, getWidth, humbleLoop } from "./utils";

export const AUTO_TRANSFORM_ENDPOINT =
  "https://go.picperf.io/api/optimize/transform/auto";
const PICPERF_HOST = "https://picperf.io";

buildYieldPolyfill();

export async function handle(fetchImmplementation: typeof fetch = fetch) {
  const isOnDesktop = screen.availWidth > 1400;
  const images = document.querySelectorAll("img");
  const promises: Promise<ImageWidth>[] = [];

  await humbleLoop(Array.from(images), (image) => {
    if (!isOnDesktop) {
      console.log("Is not on a desktop. Not bothering.");
      return;
    }

    if (!image.currentSrc.startsWith(PICPERF_HOST)) {
      console.log("Not a PicPerf image. Not bothering.");
      return;
    }

    promises.push(getWidth(image));
  });

  return Promise.all(promises).then(async (results) => {
    const requests: Promise<Response>[] = [];

    await humbleLoop(results, (result) => {
      const { renderedWidth, naturalWidth, url } = result;

      if (renderedWidth < naturalWidth) {
        const body: TransformationRequest = {
          url: url.replace(new RegExp(`^${PICPERF_HOST}`), "") as Url,
          transformations: { width: renderedWidth },
        };

        const request = fetchImmplementation(AUTO_TRANSFORM_ENDPOINT, {
          keepalive: true,
          priority: "low",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(body),
        });

        requests.push(request);
      }
    });

    await Promise.all(requests);

    return results;
  });
}
