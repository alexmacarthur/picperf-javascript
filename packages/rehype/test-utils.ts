import { unified } from "unified";
import { rehype } from "rehype";
import remarkParse from "remark-parse";
import rehypeParse from "rehype-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

export async function parse(markdown: string) {
  const ast = unified().use(remarkParse).parse(markdown);

  return JSON.stringify(ast, null, 2);
}

export function stringify(ast: any): string {
  return unified().use(rehypeStringify).stringify(ast);
}
