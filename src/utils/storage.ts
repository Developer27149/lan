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

export const getConfigFromStorage = async () => {
  const { config } = (await getFromStorage("config")) as { config: storageDataType };
  return config;
};

export const saveConfigFromStorage = (config: storageDataType) =>
  chrome.storage.local.set(config);
