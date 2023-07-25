import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";

export async function parse(markdown: string) {
  return unified().use(rehypeParse).parse(markdown);
}

export async function stringify(ast: any): Promise<string> {
  const processor = unified().use(rehypeParse).use(rehypeStringify);

  return processor.stringify(ast);
}
