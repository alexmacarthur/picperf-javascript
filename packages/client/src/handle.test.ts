import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as utils from "./utils";
import { AUTO_TRANSFORM_ENDPOINT, handle } from "./handle";

function mockScreenWidth(width: number) {
  // @ts-ignore
  globalThis.screen = {
    availWidth: width,
  };
}

afterEach(() => {
  mockScreenWidth(0);
});

function loop(times: number, cb) {
  for (let i = 0; i < times; i++) {
    cb(i + 1);
  }
}

describe("on a mobile device", () => {
  beforeEach(() => {
    mockScreenWidth(1200);
  });

  it("images are not transformed", async () => {
    document.body.innerHTML = `
      <img src="https://img1.jpeg" />
      <img src="https://img2.jpeg" />
      <img src="https://img3.jpeg" />
    `;

    const mockFetch = vi.fn();

    let getWidthSpy = vi.spyOn(utils, "getWidth");

    await handle(mockFetch);

    expect(mockFetch).not.toHaveBeenCalled();
    expect(getWidthSpy).not.toHaveBeenCalled();
  });
});

describe("on a desktop", () => {
  beforeEach(() => {
    mockScreenWidth(1500);
  });

  it("images need to be transformed", async () => {
    document.body.innerHTML = `
      <img src="https://img1.jpeg" />
      <img src="https://img2.jpeg" />
      <img src="https://img3.jpeg" />
    `;

    const mockFetch = vi.fn();

    let getWidthSpy = vi.spyOn(utils, "getWidth");

    loop(3, function (iteration) {
      getWidthSpy = getWidthSpy.mockResolvedValueOnce({
        url: `https://img${iteration}.jpeg`,
        renderedWidth: 500,
        naturalWidth: 1000,
      });
    });

    await handle(mockFetch);

    expect(mockFetch).toHaveBeenCalledTimes(3);

    loop(3, function (time) {
      expect(mockFetch).toHaveBeenCalledWith(
        "http://go.picperf.io/api/optimize/transform/auto",
        expect.objectContaining({
          keepalive: true,
          priority: "low",
          method: "POST",
          body: `{"url":"https://img${time}.jpeg","transformations":{"width":500}}`,
        }),
      );
    });
  });

  it("images do not need to be transformed", async () => {
    document.body.innerHTML = `
      <img src="https://img1.jpeg" />
      <img src="https://img2.jpeg" />
      <img src="https://img3.jpeg" />
    `;

    const mockFetch = vi.fn();

    let getWidthSpy = vi.spyOn(utils, "getWidth");

    loop(3, function (iteration) {
      getWidthSpy = getWidthSpy.mockResolvedValueOnce({
        url: `https://img${iteration}.jpeg`,
        renderedWidth: 1000,
        naturalWidth: 1000,
      });
    });

    await handle(mockFetch);

    expect(mockFetch).not.toHaveBeenCalled();
  });
});
