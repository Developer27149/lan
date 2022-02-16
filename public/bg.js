// access key
const access_key = "ETQLApk4L6g__-ELS59ONCB_e8oAjqtgWYgzDl76-9I";
const headers = new Headers();
headers.append("Content-Type", "application/json");
const url = `https://api.unsplash.com/collections/hkToSCaeZUE/photos?client_id=${access_key}&per_page=1`;

const saveToStorage = async (obj) => chrome.storage.local.set(obj);

async function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

async function getBase64DataFromUrl(url) {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    return blobToBase64(blob);
  } catch (_) {
    return "";
  }
}

// init storage data
chrome.runtime.onInstalled.addListener(async () => {
  let config = {
    engine: "gg",
    wallpaperPage: 1,
    iconSize: "sm",
    tomatoSeconds: 60,
    showCurClock: false,
    openType: "新页面",
    imgQuality: "regular",
    historyId: [],
    imageUrl: "",
    currentWallpaperQuality: "regular",
    wallpaperBase64:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAALCAYAAABCm8wlAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QoPAxIb88htFgAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAACxSURBVBjTdY6xasJgGEXP/RvoonvAd8hDyD84+BZBEMSxL9GtQ8Fis7i6BkGI4DP4CA4dnQON3g6WNjb2wLd8nAsHWsR3D7JXt18kALFwz2dGmPVhJt0IcenUDVsgu91eCRZ9IOMfAnBvSCz8I3QYL0yV6zfyL+VUxKWfMJuOEFd+dE3pC1Finwj0HfGBeKGmblcFTIN4U2C4m+hZAaTrASSGox6YV7k+ARAp4gIIOH0BmuY1E5TjCIUAAAAASUVORK5CYII=",
  };
  try {
    const res = await fetch(url);
    const jsonData = await res.json();
    const { id, urls } = jsonData[0];
    // 将初始化壁纸的 id 和 base64 字符串全部存入 storage
    config.wallpaperBase64 = await getBase64DataFromUrl(urls.regular);
    config.historyId = [id];
  } catch (error) {
    console.log(error);
  } finally {
    saveToStorage({ config });
  }
});
