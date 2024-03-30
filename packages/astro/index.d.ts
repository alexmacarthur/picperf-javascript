import { ImageMetadata } from "astro";

export type OverriddenImageElement = Omit<Partial<HTMLImageElement>, "src"> & {
  src: string | ImageMetadata;
  fetchpriority: "auto" | "high" | "low";
};

export type PicPerfImageProps = OverriddenImageElement & {
  class?: string;
  src: string | ImageMetadata;
  includeInSitemap?: boolean;
};

export type SrcObjImageProps = OverriddenImageElement & {
  srcObj: ImageMetadata;
  includeInSitemap?: boolean;
};

export type SrcImageProps = PicPerfImageProps & { src: string };

export default function PicPerfImage(
  props: PicPerfImageProps
): HTMLImageElement;
