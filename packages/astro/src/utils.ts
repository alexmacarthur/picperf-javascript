import {
  transform,
  transformSrcset,
  buildImageUrlWithHost,
} from "@picperf/utils";

interface BuildSrcArgs {
  src: string;
  origin: string;
  srcset?: string;
  pagePath?: string;
  environment: string;
  includeInSitemap: boolean;
}

export function buildSrc({
  src,
  srcset,
  origin,
  pagePath,
  environment,
  includeInSitemap,
}: BuildSrcArgs): Pick<BuildSrcArgs, "src" | "srcset"> {
  const isProduction = environment.toLowerCase() === "production";
  const builtUrl = buildImageUrlWithHost({
    imageUrl: origin,
    imagePath: src,
  });
  const sitemapPath = includeInSitemap ? pagePath : undefined;

  const imageSrc = isProduction
    ? transform({ path: builtUrl, sitemapPath })
    : src;
  const imageSrcset =
    isProduction && srcset
      ? transformSrcset({ value: srcset, host: origin, sitemapPath })
      : srcset;

  return { src: imageSrc, srcset: imageSrcset };
}
