export type storageDataType = {
  engine: keywordType;
  wallpaperPage: number;
  iconSize: iconSize;
  openType: openTypeStr;
  imgQuality: imgQualityType;
  historyId: string[];
  tomatoSeconds: number;
  showCurClock: boolean;
  wallpaperBase64: string;
};

export type imgQualityType = "regular" | "full" | "raw";
export type keywordType = "gg" | "z" | "b" | "gh" | "y";
export type iconSize = "lg" | "sm" | "md";
export type openTypeStr = "新页面" | "当前页";
export type sliderProps = {
  value: number;
  min?: number;
  max?: number;
};
