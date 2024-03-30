import { import_ } from "@brillout/import";
import { transform, transformSrcset } from "@picperf/utils";

interface Options {
  shouldTransform?: (url: string) => boolean;
  host?: string;
}

const defaultOptions: Options = {
  shouldTransform: () => true,
  host: undefined,
};

export function rehypePicPerf(
  options: Options = defaultOptions,
): (ast: any) => void {
  const mergedOptions = { ...defaultOptions, ...options };
  const { host, shouldTransform } = mergedOptions;

  const propertiesToTransform = ["src", "srcSet", "dataSrc", "dataSrcset"];

  return async (ast) => {
    const { visit } = await import_("unist-util-visit");

    visit(ast, "element", (node) => {
      const tag = (node.tagName || "").toLowerCase();

      if (tag !== "img" || !node.properties) {
        return;
      }

      const { src, srcSet, dataSrc } = node.properties;

      // We _must_ have src or data-src attributes.
      if (!src && !dataSrc) {
        return;
      }

      if (!shouldTransform(src || dataSrc)) {
        return;
      }

      propertiesToTransform.forEach((property) => {
        if (!node.properties[property]) {
          return;
        }

        if (property === "srcSet") {
          node.properties.srcSet = transformSrcset({ value: srcSet, host });
          return;
        }

        node.properties[property] = transform({
          path: node.properties[property],
          host,
        });
      });
    });
  };
}
