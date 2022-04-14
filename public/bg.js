// access key
const access_key = "ETQLApk4L6g__-ELS59ONCB_e8oAjqtgWYgzDl76-9I";
const headers = new Headers();
headers.append("Content-Type", "application/json");
const url = `https://api.unsplash.com/collections/hkToSCaeZUE/photos?client_id=${access_key}&per_page=1`;

const saveToStorage = async (obj) => chrome.storage.local.set(obj);
const getFromStorage = async (key) => {
  return new Promise((resolve, reject) => {
    try {
      if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
      chrome.storage.local.get(key, (res) => {
        resolve(res[key]);
      });
    } catch (error) {
      reject(error);
    }
  });
};

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
  let config = await getFromStorage("config");
  if (!config) {
    config = {
      publicObject: {
        engine: "gg",
        wallpaperPage: 1,
        iconSize: "sm",
        tomatoSeconds: 60,
        showCurClock: true,
        openType: "新页面",
        imgQuality: "full",
        imageUrls: { raw: "", full: "", regular: "" },
        currentWallpaperQuality: "full",
        wallpaperBase64: "",
        showBookmark: true,
        bookmarkPos: "bottom",
        bookmarkList: [],
        showClock: false,
        hiddenSearchBox: false,
        showAddIconBox: false,
        updateBookmarkIconUrl: "",
      },
      historyId: [],
    };
    try {
      const res = await fetch(url);
      const jsonData = await res.json();
      const {
        id,
        urls: { full, raw, regular },
      } = jsonData[0];
      // 将初始化壁纸的 id 和 base64 字符串全部存入 storage
      config.publicObject.wallpaperBase64 = await getBase64DataFromUrl(regular);
      config.historyId = [id];
      config.publicObject.imageUrls = { full, regular, raw };
    } catch (error) {
      console.log(error);
    } finally {
      await saveToStorage({ config });
    }
  }
});
