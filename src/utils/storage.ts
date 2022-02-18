import { storageDataType } from "../types";

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

export const saveToStorage = async (config: storageDataType) => {
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
