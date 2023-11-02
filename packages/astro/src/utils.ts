import { transform, transformSrcset, buildImageUrl } from "@picperf/utils";

interface BuildSrcArgs {
  src: string;
  srcset?: string;
  origin: string;
  environment: string;
}

export function buildSrc({
  src,
  srcset,
  origin,
  environment,
}: BuildSrcArgs): Pick<BuildSrcArgs, "src" | "srcset"> {
  const isProduction = environment.toLowerCase() === "production";
  const builtUrl = buildImageUrl(origin, src);
  const imageSrc = isProduction ? transform(builtUrl) : src;
  const imageSrcset =
    isProduction && srcset ? transformSrcset(srcset, origin) : srcset;

  return { src: imageSrc, srcset: imageSrcset };
}
