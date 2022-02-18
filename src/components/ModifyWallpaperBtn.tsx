import React, { useState } from "react";
import { requestNewestWallpaper } from "../utils/unsplash";
import { useRecoilState } from "recoil";
import { configState } from "../recoilRoot";

export default function ModifyWallpaperBtn() {
  const [config, setConfig] = useRecoilState(configState);
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async () => {
    setIsLoading(true);
    try {
      await requestNewestWallpaper(config, setConfig);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <button
        className="update"
        onClick={handleClick}
        data-loading={isLoading.toString()}
        data-size={config.publicObject.iconSize}
      >
        <img src="icons/64.svg" />
      </button>
      {isLoading && <span className="download_progress">正在下载中</span>}
    </div>
  );
}
