import { import_ } from "@brillout/import";
import { transform } from "../../shared/transform";

interface Options {
  shouldTransform?: (url: string) => boolean;
  host?: string;
}

const defaultOptions: Options = {
  shouldTransform: () => true,
  host: undefined,
};

export function remarkPicPerf(
  options: Options = defaultOptions,
): (ast: any) => void {
  const mergedOptions = { ...defaultOptions, ...options };
  const { host, shouldTransform } = mergedOptions;

  return async (tree) => {
    const { visit } = await import_("unist-util-visit");

    visit(tree, "image", (node) => {
      const src = node.url;

      if (!src) {
        return;
      }

      if (!shouldTransform(src)) {
        return;
      }

      node.url = transform(src, host);
    });
  };
}
