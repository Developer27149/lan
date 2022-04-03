export type storageDataType = {
  publicObject: publicObjectType;
  historyId: string[];
};

export type publicObjectType = {
  engine: keywordType;
  wallpaperPage: number;
  iconSize: iconSize;
  openType: openTypeStr;
  imgQuality: imgQualityType;
  currentWallpaperQuality: imgQualityType;
  tomatoSeconds: number;
  showCurClock: boolean;
  wallpaperBase64: string;
  imageUrls: Record<imgQualityType, string>;
  showClock: boolean;
  showBookmark: boolean;
  bookmarkPos: bookmarkPosType;
  bookmarkList: {
    url: string;
    title: string;
  }[];
  hiddenSearchBox: boolean;
  showAddIconBox: boolean;
  updateBookmarkIconUrl: string;
};

export type bookmarkPosType = "left" | "right" | "top" | "bottom";
export type imgQualityType = "regular" | "full" | "raw";
export type keywordType = "gg" | "z" | "b" | "gh" | "y";
export type iconSize = "lg" | "sm" | "md";
export type openTypeStr = "新页面" | "当前页";
export type sliderProps = {
  value: number;
  min?: number;
  max?: number;
};

export type downloadStateType = {
  isDownloading: boolean;
  progress: number;
};

export type IBookmarkItem = chrome.bookmarks.BookmarkTreeNode;
