import {
  getObjFromStorage,
  saveToStorage,
  saveWallpaperBase64FromUrl,
} from "./index";

const access_key = "ETQLApk4L6g__-ELS59ONCB_e8oAjqtgWYgzDl76-9I";

const headers = new Headers();
headers.append("Content-Type", "application/json");
const url = `https://api.unsplash.com/collections/hkToSCaeZUE/photos?client_id=${access_key}`;

const requestNewestWallpaper = async () => {
  try {
    const idsPromise = getObjFromStorage("historyIds");
    const pageObj = await getObjFromStorage("wallpaper_page");
    const res = await fetch(
      `${url}&per_page=30&page=${pageObj?.wallpaper_page || 1}`
    );
    const jsonPromise = res.json();
    const idsStr = await idsPromise;
    const ids = idsStr?.historyIds?.split(",") as string[];
    const arr = (await jsonPromise) as {
      id: string;
      urls: {
        raw: string;
      };
    }[];

    if (arr.length === 0) throw new Error("Sources not found!");
    const target = arr.find((i) => !ids.includes(i.id));
    if (target) {
      ids.push(target.id);
      saveToStorage({ historyIds: ids.join(",") });
      const rawUrl = target.urls.raw;
      await saveWallpaperBase64FromUrl(rawUrl);
      return true;
    } else {
      // 递归调用自己，直到返回的数据为空
      await saveToStorage({ wallpaper_page: ~~pageObj?.wallpaper_page + 1 });
      requestNewestWallpaper();
    }
  } catch (error) {
    console.log(error);
    return "暂时找不到新的资源，联系 wechat: Pls-recovery 😂";
  }
};

export { requestNewestWallpaper };
