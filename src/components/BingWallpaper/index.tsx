import { getThisWeekData } from "../../services";
import "./index.sass";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import { BiSelectMultiple } from "react-icons/bi";
import cns from "classnames";
import {
  getWallpaperBase64FromUrl,
  isEmptyObj,
  updateRootStateWithKeyAndValue,
} from "../../utils/";
import { useRecoilState } from "recoil";
import { configState } from "../../recoilRoot";
import { downloadState } from "../../downloadState";
import { bingComponentState } from "../../bingWallpaperState";

export default function BingWallpaperBox() {
  const [_, setDownloadStatusData] = useRecoilState(downloadState);
  const [bingState, setBingState] = useRecoilState(bingComponentState);
  const [loading, setLoading] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [loadCount, setLoadCount] = useState(0);
  const [config, setConfig] = useRecoilState(configState);
  const onClickIconAndApplyToWallpaper = async (url: string) => {
    try {
      setDownloadStatusData({ isDownloading: true, progress: 1 });
      const wallpaperBase64 = await getWallpaperBase64FromUrl(url, setDownloadStatusData);
      if (wallpaperBase64 !== "") {
        // 下载好了
        // 更新当前壁纸清晰度为默认壁纸清晰度
        updateRootStateWithKeyAndValue(setConfig, "wallpaperBase64", wallpaperBase64);
      }
    } catch (error) {
      console.log("下载失败：", error);
    }
  };

  const onClickContainer = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBingState({ ...bingState, show: !bingState.show });
  };

  useEffect(() => {
    if (isEmptyObj(bingState.data)) {
      setLoading(true);
      getThisWeekData().then((data) => {
        setBingState((oldState) => ({
          ...oldState,
          data,
        }));
        setLoading(false);
      });
    }
  }, [bingState]);

  return (
    <div className="bing-container" onClick={onClickContainer}>
      <div className="main" data-count={loadCount}>
        {!isEmptyObj(bingState.data) &&
          bingState.data?.images.map((img, idx) => {
            return (
              <div className="item">
                <img
                  src={`https://cn.bing.com/${img.urlbase}_1920x1080.jpg`}
                  onLoad={() => setLoadCount((v) => v + 1)}
                  key={img.urlbase}
                  className={cns({ active: activeIdx === idx })}
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    setActiveIdx(idx === activeIdx ? -1 : idx);
                  }}
                />
                {loadCount === 6 && (
                  <span
                    className={cns("icon", { active: activeIdx === idx })}
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      onClickIconAndApplyToWallpaper(
                        `https://cn.bing.com/${img.urlbase}_${
                          config.publicObject.imgQuality === "regular" ? "1920x1080" : "UHD"
                        }.jpg`
                      );
                    }}
                  >
                    <BiSelectMultiple />
                  </span>
                )}
              </div>
            );
          })}
      </div>
      {(loadCount !== 6 || loading) && <Loading />}
    </div>
  );
}
