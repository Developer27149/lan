import _ from "lodash";

const getWallpaperBase64 = async () => {
  const { wallpaper = "" } = await chrome.storage.local.get("wallpaper");
  return wallpaper;
};

const saveWallpaperFromUrl = (url: string) => {
  const res = "";
};

const keyword2site = {
  gg: "google",
  z: "zhihu",
  b: "bing",
  gh: "github",
};

const colors = ["#0f95b0", "#2c9678", "#fb8b05", "#2e317c"];
const getRandomColor = () => {
  return colors[_.random(colors.length - 1)];
};

export {
  getWallpaperBase64,
  saveWallpaperFromUrl,
  keyword2site,
  getRandomColor,
};
