import { import_ } from "@brillout/import";
import { transform, transformSrcset } from "../../shared/transform";

interface Options {
  shouldTransform: (url: string) => boolean;
}

const defaultOptions: Options = {
  shouldTransform: (url) => url.startsWith("http"),
};

export function rehypePicPerf(
  options: Options = defaultOptions,
): (ast: any) => void {
  const mergedOptions = { ...defaultOptions, ...options };

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

      if (!mergedOptions.shouldTransform(src || dataSrc)) {
        return;
      }

      propertiesToTransform.forEach((property) => {
        if (!node.properties[property]) {
          return;
        }

        if (property === "srcSet") {
          node.properties.srcSet = transformSrcset(srcSet);
          return;
        }

        node.properties[property] = transform(node.properties[property]);
      });
    });
  };
}
