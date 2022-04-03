import { storageDataType } from "../types";

export const storageSet = async (obj: object) => {
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
  const res = (await getFromStorage("bookmarkIcons")) as {
    bookmarkIcons: { [k: string]: string };
  };
  if (res.bookmarkIcons) {
    return res.bookmarkIcons[key];
  }
  // 不存在，则创建再返回空字符串
  await storageSet({ bookmarkIcons: [] });
  return undefined;
};

const checkBookmarkIconCount = async () => {
  const res: any = await getFromStorage("bookmarkIcons");
  if (res?.bookmarkIcons) {
    if (Object.keys(res.bookmarkIcons).length > 100) {
      return storageSet({ bookmarkIcons: {} });
    }
  } else {
    return storageSet({ bookmarkIcons: {} });
  }
};

export const updateBookmarkIconData = async (key: string, value: string) => {
  return new Promise((resolve, reject) => {
    try {
      // 如果缓存超过 100 条，则清空一次缓存
      checkBookmarkIconCount()
        .then(() => {
          getFromStorage("bookmarkIcons").then((res) => {
            const { bookmarkIcons = {} } = res as any;
            const newData = { bookmarkIcons: { ...bookmarkIcons, [key]: value } };
            chrome.storage.local.set(newData, () => {
              console.log("ok,bookmark data was updated!", newData);
              resolve(true);
            });
          });
        })
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};
