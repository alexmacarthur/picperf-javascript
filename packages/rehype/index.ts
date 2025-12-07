import { import_ } from "@brillout/import";
import { transform, transformSrcset } from "@picperf/utils";

interface Options {
  host?: string;
  customDomain?: string;
  shouldTransform?: (url: string) => boolean;
}

const defaultOptions: Options = {
  host: undefined,
  customDomain: undefined,
  shouldTransform: () => true,
};

export function rehypePicPerf(
  options: Options = defaultOptions,
): (ast: any) => void {
  const mergedOptions = { ...defaultOptions, ...options };
  const { host, shouldTransform, customDomain } = mergedOptions;

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
          node.properties.srcSet = transformSrcset({
            host: host,
            value: srcSet,
            rootHost: customDomain,
          });
          return;
        }

        node.properties[property] = transform({
          host: host,
          path: node.properties[property],
          rootHost: customDomain,
        });
      });
    });
  };
}
