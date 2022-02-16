import React, { useState } from "react";
import { useAppContext } from "../context/index.js";
import { requestNewestWallpaper } from "../utils/unsplash";
import { useRecoilState } from "recoil";
import { configState } from "../recoilRoot";

export default function ModifyWallpaperBtn() {
  const [config, setConfig] = useRecoilState(configState);

  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true);
    await requestNewestWallpaper(config, setConfig);
    // const obj = await getObjFromStorage("wallpaper");
    // dispatch({
    //   type: "wallpaper",
    //   payload: obj?.wallpaper,
    // });
    setIsLoading(false);
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
