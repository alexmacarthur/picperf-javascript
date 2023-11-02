import { ImageMetadata } from "astro";

export type OverriddenImageElement = Omit<Partial<HTMLImageElement>, "src"> & {
  src: string | ImageMetadata;
};

export type PicPerfImageProps = OverriddenImageElement & {
  class?: string;
  src: string | ImageMetadata;
};

export type SrcObjImageProps = OverriddenImageElement & {
  srcObj: ImageMetadata;
};

export type SrcImageProps = PicPerfImageProps & { src: string };

export default function PicPerfImage(
  props: PicPerfImageProps,
): HTMLImageElement;
