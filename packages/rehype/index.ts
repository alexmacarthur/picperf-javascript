import { visit } from "unist-util-visit";
import { transform } from "../../shared/transform";

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

  return (ast) => {
    visit(ast, ["image"], (node) => {
      if (!mergedOptions.shouldTransform(node.url)) {
        return;
      }

      node.url = transform(node.url);
    });
  };
}
