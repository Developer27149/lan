const getWallpaperBase64 = async () => {
  const { wallpaper = "" } = await chrome.storage.local.get("wallpaper");
  return wallpaper;
};

const saveWallpaperFromUrl = (url: string) => {
  const res = "";
};

export { getWallpaperBase64, saveWallpaperFromUrl };
