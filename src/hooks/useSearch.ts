import { useEffect, useState, useRef } from "react";
import { keywordType } from "../types/index";
import _ from "lodash";
import { getObjFromStorage, getRandomColor, saveToStorage } from "../utils/index";

export const useSearch = (engineType: keywordType) => {
  const [curKeyword, setCurKeyword] = useState<keywordType>(engineType);
  const [visibility, setVisibility] = useState("hidden");
  const [iconColor, setIconColor] = useState("purple");
  const inpRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inpRef.current) {
      inpRef.current.focus();
    }
  }, []);
  useEffect(() => {
    saveToStorage({ engine: curKeyword });
  }, [curKeyword]);

  useEffect(() => {
    setIconColor(getRandomColor());
  }, [curKeyword]);

  useEffect(() => {
    // init keyword
    (async () => {
      const res = await getObjFromStorage("engine");
      setCurKeyword(res?.engine);
    })();
    // init search box visibility attr
    let id = 0;
    const handleMouseMove = _.debounce(() => {
      clearTimeout(id);
      setVisibility("visible");
      if (inpRef.current) {
        inpRef.current.focus();
      }
      id = setTimeout(() => {
        setVisibility("hidden");
      }, 10000);
    }, 50);
    const handleKeepType = _.debounce(() => {
      clearTimeout(id);
      setVisibility("visible");
    }, 50);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("keydown", handleKeepType);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("keydown", handleKeepType);
    };
  }, []);
  return { curKeyword, setCurKeyword, visibility, inpRef, iconColor };
};
