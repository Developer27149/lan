import { SetterOrUpdater } from "recoil";
import { downloadStateType, storageDataType } from "../types/index";
import { getWallpaperBase64FromUrl } from "./index.js";
const access_key = "ETQLApk4L6g__-ELS59ONCB_e8oAjqtgWYgzDl76-9I";

const headers = new Headers();
headers.append("Content-Type", "application/json");
const url = `https://api.unsplash.com/collections/hkToSCaeZUE/photos?client_id=${access_key}`;

const requestNewestWallpaper = async (
  config: storageDataType,
  setConfig: SetterOrUpdater<storageDataType>,
  setDownloadStatusData: SetterOrUpdater<downloadStateType>
) => {
  try {
    const { historyId, publicObject } = config;
    const { wallpaperPage, imgQuality } = publicObject;
    const res = await fetch(`${url}&per_page=30&page=${wallpaperPage || 1}`);
    const jsonData = (await res.json()) as any[];
    if (jsonData.length === 0) return "暂时找不到新的资源，联系 wechat: Pls-recovery 😂";
    const targetItem = jsonData.find((item) => !historyId.includes(item.id));
    if (targetItem) {
      const { wallpaperPage } = publicObject;
      // 获取到了地址，则下载并且更新 state
      const { id, urls } = targetItem as {
        id: string;
        urls: { raw: string; full: string; regular: string };
      };
      // 根据地址获取当前级别的图像
      const imageUrl = urls[imgQuality];
      const wallpaperBase64 = await getWallpaperBase64FromUrl(imageUrl, setDownloadStatusData);
      if (wallpaperBase64 !== "") {
        // 下载好了
        setConfig({
          historyId: [...historyId, id],
          publicObject: { ...publicObject, wallpaperBase64, wallpaperPage, imageUrls: urls },
        });
      }
    } else {
      await requestNewestWallpaper(
        {
          ...config,
          publicObject: {
            ...publicObject,
            wallpaperPage: publicObject.wallpaperPage + 1,
          },
        },
        setConfig,
        setDownloadStatusData
      );
    }
  } catch (error) {
    console.log(error);
    setDownloadStatusData({ isDownloading: false, progress: 1 });
    return error;
  }
};

export { requestNewestWallpaper };
