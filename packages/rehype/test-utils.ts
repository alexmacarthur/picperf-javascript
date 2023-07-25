import { unified } from "unified";
import { rehype } from "rehype";
import remarkParse from "remark-parse";
import rehypeParse from "rehype-parse";
import remarkRehype from "remark-rehype";
import rehypeResolution from "rehype-resolution";
import rehypeStringify from "rehype-stringify";
import remarkHtml from "remark-html";

export async function parse(markdown: string) {
  return unified().use(remarkParse).parse(markdown);
}

export async function stringify(ast: any): Promise<string> {
  return unified().use(rehypeParse).use(remarkHtml).stringify(ast);
}
