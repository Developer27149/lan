import _ from "lodash";
import { storageDataType } from "../types/index.js";

const getWallpaperBase64 = async () => {
  const { wallpaper = "" } = await chrome.storage.local.get("wallpaper");
  return wallpaper;
};

const keyword2site = {
  gg: "google",
  z: "zhihu",
  b: "bing",
  gh: "github",
  y: "youtube",
};

const colors = ["#0f95b0", "#2c9678", "#fb8b05", "#2e317c"];
const getRandomColor = () => {
  return colors[_.random(colors.length - 1)];
};

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}

const getWallpaperBase64FromUrl = async (url: string) => {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    return blobToBase64(blob);
  } catch (error) {
    console.log(error);
    return "";
  }
};

const handleDownloadCurWallpaper = (config: storageDataType) =>
  chrome.downloads.download({
    url:
      config.publicObject.currentWallpaperQuality === "raw"
        ? config.publicObject.wallpaperBase64
        : config.publicObject.imageUrl,
  });

const formatTomatoSeconds = (count: number) => {
  const minutes = ~~(count / 60);
  const seconds = count % 60;
  return `${minutes > 9 ? minutes : `0${minutes}`}:${seconds > 9 ? seconds : `0${seconds}`}`;
};

// 在打开设置页面的时候防止显示搜索框
const handleStopMousemove = (e: React.MouseEvent<HTMLElement>) => {
  e.stopPropagation();
};

const getFormatCurClock = () => {
  const date = new Date();
  const mm = date.getMinutes();
  const hh = date.getHours();
  return `${hh > 9 ? hh : `0${hh}`}:${mm > 9 ? mm : `0${mm}`}`;
};

export {
  keyword2site,
  getWallpaperBase64,
  getRandomColor,
  getWallpaperBase64FromUrl,
  handleDownloadCurWallpaper,
  formatTomatoSeconds,
  getFormatCurClock,
  handleStopMousemove,
};
