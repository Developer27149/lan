// init storage data
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ engine: "g" });
});
