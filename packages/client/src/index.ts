import { handle } from "./handle";

declare global {
  interface Window {
    PicPerf: {
      handle: typeof handle;
    };
  }
}

globalThis.PicPerf = {
  handle,
};

handle();

export { handle };
