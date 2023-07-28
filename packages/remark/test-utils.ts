import { unified } from "unified";
import remarkStringify from "remark-stringify";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";

export async function parse(markdown: string): Promise<any> {
  return unified().use(remarkParse).parse(markdown);
}

export async function stringify(ast: any): Promise<string> {
  const processor = unified().use(remarkParse).use(remarkStringify);
  const markdown = processor.stringify(ast);
  const file = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(markdown);

  return String(file);
}
