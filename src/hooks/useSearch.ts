import { FC, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { DiBingSmall } from "react-icons/di";
import { RiZhihuFill } from "react-icons/ri";

type keywordType = "g" | "z" | "b";
export const useSearch = () => {
  const [EngineIcon, setEngineIcon] = useState<FC>(FcGoogle);
  const [curKeyword, setCurKeyword] = useState<keywordType>("g");
  const handleEngineKeyword = (keyword: keywordType) => {
    switch (keyword) {
      case "g":
        setEngineIcon(FcGoogle);
        setCurKeyword("g");
        break;
      case "b":
        setEngineIcon(DiBingSmall);
        setCurKeyword("b");
        break;
      case "z":
        setEngineIcon(RiZhihuFill);
        setCurKeyword("z");
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    (async () => {
      const res = await chrome.storage.local.get("engine");
      handleEngineKeyword(res.engine);
    })();
  }, []);
  return { EngineIcon, handleEngineKeyword, curKeyword };
};
