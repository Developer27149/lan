import { storageDataType } from "../types";

export const storageSet = async (obj: Object) => {
  return new Promise((resolve, reject) => {
    try {
      if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
      resolve(obj);
    } catch (error) {
      reject(error);
    }
  });
};

export const getFromStorage = async (key: string) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(key, (items) => {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
      resolve(items);
    });
  });
};

export const saveConfigToStorage = async (config: storageDataType) => {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.set({ config }, () => {
        console.log("ok");
        resolve(true);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const getConfigFromStorage = async () => {
  const { config } = (await getFromStorage("config")) as { config: storageDataType };
  return config;
};

export const searchIconBase64FromStorage = async (key: string) => {
  const res = (await getFromStorage("bookmarkIcon")) as {
    bookmarkIcon: { [k: string]: string };
  };
  if (res.bookmarkIcon) {
    return res.bookmarkIcon[key];
  }
  // 不存在，则创建再返回空字符串
  await storageSet({ bookmarkIcon: [] });
  return undefined;
};

export const updateBookmarkIconData = async (key: string, value: string) => {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.local.set({ [key]: value }, () => {
        console.log("ok,bookmark data was updated!");
        resolve(true);
      });
    } catch (error) {
      reject(error);
    }
  });
};
