// access key
const access_key = "ETQLApk4L6g__-ELS59ONCB_e8oAjqtgWYgzDl76-9I";
const headers = new Headers();
headers.append("Content-Type", "application/json");
const url = `https://api.unsplash.com/collections/hkToSCaeZUE/photos?client_id=${access_key}&per_page=1`;

function saveToStorage(obj) {
  chrome.storage.local.set(obj);
}

// init storage data
chrome.runtime.onInstalled.addListener(async () => {
  saveToStorage({ engine: "gg" });
  try {
    const res = await fetch(url);
    const jsonData = await res.json();
    console.log(jsonData);
    const { id, urls } = jsonData[0];
    // 将初始化壁纸的 id 和 base64 字符串全部存入 storage
    saveToStorage({ historyIds: id });
    saveBase64StrFromUrl(urls.raw);
  } catch (error) {
    console.log(error);
  }
});

function saveToStorage(obj) {
  chrome.storage.local.set(obj);
}

function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

async function saveBase64StrFromUrl(url) {
  const res = await fetch(url);
  const blob = await res.blob();
  const base64 = await blobToBase64(blob);
  console.log(base64);
  saveToStorage({ wallpaper: base64 });
}
