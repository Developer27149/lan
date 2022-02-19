import { requestNewestWallpaper } from "../utils/unsplash";
import { useRecoilState } from "recoil";
import { configState } from "../recoilRoot";
import { downloadState } from "../downloadState";

export default function ModifyWallpaperBtn() {
  const [config, setConfig] = useRecoilState(configState);
  const [downloadStatusData, setDownloadStatusData] = useRecoilState(downloadState);
  const { isDownloading, progress } = downloadStatusData;

  const handleClick = async () => {
    try {
      setDownloadStatusData({ isDownloading: true, progress: 1 });
      requestNewestWallpaper(config, setConfig, setDownloadStatusData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button
        className="update"
        onClick={handleClick}
        data-loading={isDownloading.toString()}
        data-size={config.publicObject.iconSize}
      >
        <img src="icons/64.svg" />
      </button>
      {isDownloading && (
        <span className="download_progress" style={{ width: `${progress}vw` }}></span>
      )}
    </div>
  );
}
