import React, { useState } from "react";
import { useAppContext } from "../context/index.js";
import { getObjFromStorage } from "../utils/index.js";
import { requestNewestWallpaper } from "../utils/unsplash";

export default function ModifyWallpaperBtn() {
  const { state, dispatch } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true);
    await requestNewestWallpaper();
    const obj = await getObjFromStorage("wallpaper");
    dispatch({
      type: "wallpaper",
      payload: obj?.wallpaper,
    });
    setIsLoading(false);
  };
  return (
    <button
      className="update"
      onClick={handleClick}
      data-loading={isLoading.toString()}
      data-size={state.iconSize}
    >
      <img src="icons/64.svg" />
    </button>
  );
}
