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
  y: "youtube",
};

const colors = ["#0f95b0", "#2c9678", "#fb8b05", "#2e317c"];
const getRandomColor = () => {
  return colors[_.random(colors.length - 1)];
};

const saveToStorage = async (obj: { [key: string]: unknown }): Promise<void> =>
  chrome.storage.local.set(obj);

const clearItemFromStorage = async (key: string) =>
  chrome.storage.local.remove(key);

const getObjFromStorage = async (
  key: string
): Promise<{ [key: string]: any } | null> => {
  const res = await chrome.storage.local.get(key);
  if (res) {
    return res;
  }
  return null;
};

function blobToBase64(blob: Blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

const saveWallpaperBase64FromUrl = async (url: string) => {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    const base64 = await blobToBase64(blob);
    await clearItemFromStorage("wallpaper");
    await saveToStorage({ wallpaper: base64 });
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const handleDownloadCurWallpaper = async () => {
  const res = await getObjFromStorage("wallpaper");
  chrome.downloads.download({ url: res?.wallpaper });
};

const formatTomatoSeconds = (count: number) => {
  const minutes = ~~(count / 60);
  const seconds = count % 60;
  return `${minutes > 9 ? minutes : `0${minutes}`}:${
    seconds > 9 ? seconds : `0${seconds}`
  }`;
};

export {
  keyword2site,
  getWallpaperBase64,
  saveWallpaperFromUrl,
  getRandomColor,
  saveToStorage,
  getObjFromStorage,
  saveWallpaperBase64FromUrl,
  clearItemFromStorage,
  handleDownloadCurWallpaper,
  formatTomatoSeconds,
};
