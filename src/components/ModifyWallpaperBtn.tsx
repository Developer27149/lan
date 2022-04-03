import { requestNewestWallpaper } from "../utils/unsplash";
import { useRecoilState } from "recoil";
import { configState } from "../recoilRoot";
import { downloadState } from "../downloadState";
import { updateRootStateWithKeyAndValue } from "../utils";
import ReactTooltip from "react-tooltip";

export default function ModifyWallpaperBtn() {
  const [config, setConfig] = useRecoilState(configState);
  const [downloadStatusData, setDownloadStatusData] = useRecoilState(downloadState);
  const { isDownloading, progress } = downloadStatusData;

  const handleClick = async () => {
    try {
      setDownloadStatusData({ isDownloading: true, progress: 1 });
      await requestNewestWallpaper(config, setConfig, setDownloadStatusData);
      // 更新当前壁纸清晰度为默认壁纸清晰度
      updateRootStateWithKeyAndValue(
        setConfig,
        "currentWallpaperQuality",
        config.publicObject.imgQuality
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <ReactTooltip place="right" id="change-wp" />
      <button
        className="update"
        onClick={handleClick}
        data-loading={isDownloading.toString()}
        data-size={config.publicObject.iconSize}
        data-tip="换一个心情？"
        data-for="change-wp"
      >
        <img src="icons/64.svg" />
      </button>
      {isDownloading && (
        <span className="download_progress" style={{ width: `${progress}vw` }}></span>
      )}
    </div>
  );
}
