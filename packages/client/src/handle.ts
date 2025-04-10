import { isExpired, set } from "./time";

export const AUTO_TRANSFORM_ENDPOINT =
  "https://go.picperf.io/api/optimize/transform/auto";

export async function handle(fetchImplementation: typeof fetch = fetch) {
  if (!isExpired()) {
    return;
  }

  set();

  fetchImplementation(AUTO_TRANSFORM_ENDPOINT, {
    keepalive: true,
    priority: "low",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      url: window.location.origin + window.location.pathname,
    }),
  });
}
