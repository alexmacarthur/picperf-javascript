import { ImageMetadata } from "astro";

export type OverriddenImageElement = Omit<Partial<HTMLImageElement>, "src"> & {
  src: string | ImageMetadata;
  fetchpriority?: "auto" | "high" | "low";
};

export type PicPerfImageProps = OverriddenImageElement & {
  class?: string;
  src: string | ImageMetadata;
  includeInSitemap?: boolean;
  customDomain?: string;
};

export type SrcObjImageProps = OverriddenImageElement & {
  srcObj: ImageMetadata;
  includeInSitemap?: boolean;
  customDomain?: string;
};

export type SrcImageProps = PicPerfImageProps & { src: string };

export default function PicPerfImage(
  props: PicPerfImageProps,
): HTMLImageElement;
