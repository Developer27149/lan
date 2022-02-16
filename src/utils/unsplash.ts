import { SetterOrUpdater } from "recoil";
import { storageDataType } from "../types/index";
import { getWallpaperBase64FromUrl } from "./index.js";
const access_key = "ETQLApk4L6g__-ELS59ONCB_e8oAjqtgWYgzDl76-9I";

const headers = new Headers();
headers.append("Content-Type", "application/json");
const url = `https://api.unsplash.com/collections/hkToSCaeZUE/photos?client_id=${access_key}`;

const requestNewestWallpaper = async (
  config: storageDataType,
  setConfig: SetterOrUpdater<storageDataType>
) => {
  try {
    const { historyId, publicObject } = config;
    const { wallpaperPage, imgQuality } = publicObject;
    const res = await fetch(`${url}&per_page=30&page=${wallpaperPage + 20 || 1}`);
    const jsonData = (await res.json()) as any[];
    const targetItem = jsonData.find((item) => !historyId.includes(item.id));
    if (targetItem) {
      const { wallpaperPage } = publicObject;
      // 获取到了地址，则下载并且更新 state
      const { id, urls } = targetItem as {
        id: string;
        urls: { raw: string; full: string; regular: string };
      };
      // 根据地址获取当前级别的图像
      const wallpaperBase64 = await getWallpaperBase64FromUrl(urls[imgQuality]);
      if (wallpaperBase64 !== "") {
        // 下载好了
        setConfig({
          historyId: [...historyId, id],
          publicObject: { ...publicObject, wallpaperBase64, wallpaperPage },
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
        setConfig
      );
    }

    // const ids = idsStr?.historyIds?.split(",") as string[];
    // const arr = (await jsonPromise) as {
    //   id: string;
    //   urls: {
    //     raw: string;
    //   };
    // }[];

    // if (arr.length === 0) throw new Error("Sources not found!");
    // const target = arr.find((i) => !ids.includes(i.id));
    // if (target) {
    //   ids.push(target.id);
    //   saveToStorage({ historyIds: ids.join(",") });
    //   const rawUrl = target.urls.raw;
    //   await saveWallpaperBase64FromUrl(rawUrl);
    //   return true;
    // } else {
    //   // 递归调用自己，直到返回的数据为空
    //   await saveToStorage({ wallpaper_page: ~~pageObj?.wallpaper_page + 1 });
    //   requestNewestWallpaper();
    // }
  } catch (error) {
    console.log(error);
    return "暂时找不到新的资源，联系 wechat: Pls-recovery 😂";
  }
};

export { requestNewestWallpaper };
