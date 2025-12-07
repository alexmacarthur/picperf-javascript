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
  customDomain?: string;
  includeInSitemap: boolean;
}

export function buildSrc({
  src,
  srcset,
  origin,
  pagePath,
  environment,
  customDomain = import.meta.env.PICPERF_CUSTOM_DOMAIN,
  includeInSitemap,
}: BuildSrcArgs): Pick<BuildSrcArgs, "src" | "srcset"> {
  const normalizedCustomDomain =
    customDomain === "undefined" ? undefined : customDomain;
  const isProduction = environment.toLowerCase() === "production";
  const builtUrl = buildImageUrlWithHost({
    imageUrl: origin,
    imagePath: src,
  });
  const sitemapPath = includeInSitemap ? pagePath : undefined;

  const imageSrc = isProduction
    ? transform({
        path: builtUrl,
        sitemapPath,
        rootHost: normalizedCustomDomain,
      })
    : src;
  const imageSrcset =
    isProduction && srcset
      ? transformSrcset({
          value: srcset,
          host: origin,
          sitemapPath: sitemapPath,
          rootHost: normalizedCustomDomain,
        })
      : srcset;

  return { src: imageSrc, srcset: imageSrcset };
}
