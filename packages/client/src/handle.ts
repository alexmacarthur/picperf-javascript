import { ImageWidth, TransformationRequest } from "./types";
import { getWidth } from "./utils";

export const AUTO_TRANSFORM_ENDPOINT =
  "https://go.picperf.io/api/optimize/transform/auto";

export function handle(fetchImmplementation: typeof fetch = fetch) {
  const isOnDesktop = screen.availWidth > 1400;
  const images = document.querySelectorAll("img");

  const promises: Promise<ImageWidth>[] = Array.from(images)
    .map((image) => {
      if (!isOnDesktop) {
        console.log("Is not on a desktop. Not bothering.");
        return null;
      }

      return getWidth(image);
    })
    .filter(Boolean);

  return Promise.all(promises).then(async (results) => {
    const requests = results.map(({ renderedWidth, naturalWidth, url }) => {
      if (renderedWidth < naturalWidth) {
        const body: TransformationRequest = {
          url,
          transformations: { width: renderedWidth },
        };

        return fetchImmplementation(AUTO_TRANSFORM_ENDPOINT, {
          keepalive: true,
          priority: "low",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(body),
        });
      }
    });

    await Promise.all(requests);

    return results;
  });
}
