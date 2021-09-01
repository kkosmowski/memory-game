interface MediaBreakpoints {
  s?: number;
  m?: number;
  l?: number;
}

export interface Breakpoints {
  mobile: MediaBreakpoints;
  tablet: number;
  desktop: MediaBreakpoints;
}

interface MediaItem {
  s?: string;
  m?: string;
  l?: string;
}

export interface Media {
  mobile: MediaItem;
  tablet: string;
  desktop: MediaItem;
}