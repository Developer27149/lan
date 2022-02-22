import _ from "lodash";
import {
  bookmarkPosType,
  downloadStateType,
  imgQualityType,
  publicObjectType,
  storageDataType,
} from "../types/index.js";
import { SetterOrUpdater } from "recoil";

const getWallpaperBase64 = async () => {
  const { wallpaper = "" } = await chrome.storage.local.get("wallpaper");
  return wallpaper;
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

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}

const getWallpaperBase64FromUrl = async (
  url: string,
  setDownloadStatusData: SetterOrUpdater<downloadStateType>
) => {
  try {
    const res = await fetch(url);
    const reader = res.body?.getReader()!;
    const contentLength = +(res.headers.get("Content-Length") as string | number);
    let receivedLength = 0;
    const chunks = [];
    while (true) {
      const { done, value } = await reader?.read();
      if (done) {
        setDownloadStatusData({
          isDownloading: false,
          progress: 1,
        });
        break;
      }
      chunks.push(value);
      receivedLength += value!.length;
      const percent = (receivedLength / contentLength) * 100;
      setDownloadStatusData({
        isDownloading: true,
        progress: Math.max(1, +percent.toFixed(2)),
      });
    }
    const blob = new Blob(chunks as BlobPart[]);
    // (async () => {})();
    // const blob = await res.blob();
    return blobToBase64(blob);
  } catch (error) {
    console.log(error);
    return "";
  }
};

const handleDownloadCurWallpaper = (config: storageDataType) => {
  console.log(config.publicObject);

  chrome.downloads.download({
    url:
      config.publicObject.currentWallpaperQuality === "raw"
        ? config.publicObject.wallpaperBase64
        : config.publicObject.imageUrls.raw,
  });
};

const formatTomatoSeconds = (count: number) => {
  const minutes = ~~(count / 60);
  const seconds = count % 60;
  return `${minutes > 9 ? minutes : `0${minutes}`}:${seconds > 9 ? seconds : `0${seconds}`}`;
};

// 在打开设置页面的时候防止显示搜索框
const handleStopMousemove = (e: React.MouseEvent<HTMLElement>) => {
  e.stopPropagation();
};

const getFormatCurClock = () => {
  const date = new Date();
  const mm = date.getMinutes();
  const hh = date.getHours();
  return `${hh > 9 ? hh : `0${hh}`}:${mm > 9 ? mm : `0${mm}`}`;
};

const updateRootStateWithKeyAndValue = (
  setConfig: SetterOrUpdater<storageDataType>,
  key: "historyId" | keyof publicObjectType,
  value: any
) => {
  setConfig((prevConfig) => {
    if (key === "historyId") {
      prevConfig.historyId = value;
    } else {
      if (prevConfig.publicObject[key as keyof typeof prevConfig.publicObject] === value)
        return prevConfig;
      prevConfig.publicObject = { ...prevConfig.publicObject, ...{ [key]: value } };
    }
    return Object.assign(
      {},
      {
        publicObject: Object.assign({}, prevConfig.publicObject),
        historyId: [...prevConfig.historyId],
      }
    );
  });
};

const createReflectMapObject = (keys: any[], values: any[]) => {
  const res: { [key: string]: any } = {};
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    const v = values[i];
    res[k] = v;
    res[v] = k;
  }
  return res;
};

const getAdjacent = (side: bookmarkPosType, value: number) => {
  const res: { [k: string]: string } = {};
  const filterObj = { top: "bottom", bottom: "top", right: "left", left: "right" };
  Object.keys(filterObj)
    .filter((i) => i !== filterObj[side])
    .forEach((i) => {
      res[i] = `${i === side ? value / 12 : value}px`;
      // res[i] = `${value}px`;
    });
  res[side] = "0";
  return res;
};

const getImgBase64FromUrl = async (url: string) => {
  try {
    const res = await fetch(url, { method: "GET", mode: "cors" });
    if (res.status !== 200) {
      return "";
    }
    const blob = await res.blob();
    return blobToBase64(blob);
  } catch (error) {
    return "";
  }
};

const historyPush = (url: string, target = "_self") => {
  window.open(url, target);
};

const imgQualityRiseCompare = (a: imgQualityType, b: imgQualityType) => {
  if (a === "regular" && b !== "regular") return true;
  if (a === "full" && b === "raw") return true;
  return false;
};

export {
  keyword2site,
  getWallpaperBase64,
  getRandomColor,
  getWallpaperBase64FromUrl,
  handleDownloadCurWallpaper,
  formatTomatoSeconds,
  getFormatCurClock,
  handleStopMousemove,
  updateRootStateWithKeyAndValue,
  createReflectMapObject,
  getAdjacent,
  getImgBase64FromUrl,
  historyPush,
  imgQualityRiseCompare,
};
