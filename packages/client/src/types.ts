export type Url = `https://${string}`;

export interface ImageWidth {
  url: Url;
  renderedWidth: number;
  naturalWidth: number;
}

export interface TransformationRequest {
  url: Url;
  transformations: {
    width: number;
  };
}
