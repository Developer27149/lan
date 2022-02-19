import Search from "./Search";
import { useEffect, useMemo } from "react";
import TomatoTime from "./TomatoTime";
import { useRecoilState } from "recoil";
import { configState } from "../recoilRoot";
import { getWallpaperBase64FromUrl, updateRootStateWithKeyAndValue } from "../utils/index.js";

export default function Home() {
  const [config, setConfig] = useRecoilState(configState);
  const {
    publicObject: { wallpaperBase64, imageUrl, currentWallpaperQuality },
  } = config;
  const bgImgUrl = useMemo(() => {
    return {
      backgroundImage:
        wallpaperBase64.length === 0
          ? "linear-gradient(to right, #7f7fd5, #86a8e7, #91eae4);"
          : `url(${config.publicObject.wallpaperBase64})`,
    };
  }, [wallpaperBase64]);
  // 检查当前壁纸，如果是最低画质则进行优化到高清
  useEffect(() => {
    let isCancel = false;
    const updateWallpaper = async () => {
      if (!isCancel) {
        const newImgBase64 = await getWallpaperBase64FromUrl(imageUrl, () => {});
        updateRootStateWithKeyAndValue(setConfig, "wallpaperBase64", newImgBase64);
        updateRootStateWithKeyAndValue(setConfig, "currentWallpaperQuality", "full");
      }
    };
    if (currentWallpaperQuality === "regular") {
      // 优化画质
      console.log("优化一下");

      updateWallpaper();
    }
    return () => {
      isCancel = true;
    };
  }, [config.publicObject.wallpaperBase64]);

  return (
    <main style={bgImgUrl} className="main">
      {config.publicObject.showClock ? <TomatoTime /> : <Search />}
    </main>
  );
}
