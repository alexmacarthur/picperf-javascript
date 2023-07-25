import { visit } from "unist-util-visit";

export const rehypePicPerf =
  (options = {}) =>
  (ast) => {
    function visitor(node) {
      const {
        tagName,
        properties: { src, srcSet },
      } = node;

      if (tagName !== "img") return;

      node.properties.src = "https://via.placeholder.com/150";
    }

    visit(ast, ["element"], visitor);
  };
