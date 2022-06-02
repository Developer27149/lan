import Search from "./Search";
import { useEffect, useMemo, useRef } from "react";
import TomatoTime from "./TomatoTime";
import { useRecoilState } from "recoil";
import { configState } from "../recoilRoot";
import {
  getWallpaperBase64FromUrl,
  imgQualityRiseCompare,
  updateRootStateWithKeyAndValue,
} from "../utils/index.js";
import BingWallpaperBox from "./BingWallpaper";
import { bingComponentState } from "../bingWallpaperState";
import { debounce } from "lodash";

export default function Home() {
  const [config, setConfig] = useRecoilState(configState);
  const [bingState, setBingState] = useRecoilState(bingComponentState);
  const {
    publicObject: { wallpaperBase64, imageUrls, currentWallpaperQuality, imgQuality },
  } = config;
  const imgQualityRef = useRef(imgQuality);
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
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        const newImgBase64 = await getWallpaperBase64FromUrl(imageUrls[imgQuality], () => {});
        updateRootStateWithKeyAndValue(setConfig, "wallpaperBase64", newImgBase64);
        updateRootStateWithKeyAndValue(setConfig, "currentWallpaperQuality", "full");
      }
    };
    if (
      currentWallpaperQuality === "regular" ||
      imgQualityRiseCompare(imgQualityRef.current, imgQuality)
    ) {
      // 优化画质
      updateWallpaper();
    }
    return () => {
      isCancel = true;
    };
  }, [wallpaperBase64, imgQuality]);

  useEffect(() => {
    document.addEventListener(
      "keydown",
      debounce((e) => {
        if ((e.metaKey || e.altKey) && e.key === ".") {
          setBingState((oldState) => ({ ...oldState, show: !oldState.show }));
        }
      }, 300)
    );
  }, []);

  return (
    <main style={bgImgUrl} className="main">
      {config?.publicObject?.showClock && <TomatoTime />}
      {!config?.publicObject?.hiddenSearchBox && config?.publicObject?.showClock === false && (
        <Search />
      )}
      {bingState.show && <BingWallpaperBox />}
    </main>
  );
}
