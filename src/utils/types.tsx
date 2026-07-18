export type PexelsPhotoSrc = {
  original: string;
  portrait: string;
  large2x: string;
  tiny: string;
};

export type PexelsPhoto = {
  id: number;
  width: number;
  height: number;
  url: string;

  photographer: string;
  photographer_url: string;

  avg_color: string;

  src: PexelsPhotoSrc;

  alt: string;
};

export type PexelsResponse = {
  page: number;
  per_page: number;
  photos: PexelsPhoto[];
};
