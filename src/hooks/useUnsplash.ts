import { useState, useEffect } from "react";
import { getWallpaperBase64 } from "../utils";

const useUnsplash = () => {
  const [imgBase64, setImgBase64] = useState("");
  const getNewImg = () => {};
  useEffect(() => {
    getWallpaperBase64().then((str: string) => {
      setImgBase64(str);
    });
  }, []);
  return { imgBase64, getNewImg };
};

export { useUnsplash };
