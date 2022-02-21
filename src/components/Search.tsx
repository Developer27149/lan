import { FormEvent, useState } from "react";
import { useSearch } from "../hooks/useSearch";
import { keyword2site } from "../utils/index";
import { keywordType } from "../types/index";
import EngineIcon from "./EngineIcon";
import { useRecoilState } from "recoil";
import { configState } from "../recoilRoot";

export default function Search() {
  const [config] = useRecoilState(configState);

  const {
    publicObject: { openType, engine, hiddenSearchBox },
  } = config;
  const { setCurKeyword, curKeyword, visibility, inpRef, iconColor } = useSearch(engine);

  const [value, setValue] = useState("");

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const v = e.currentTarget.value;
    if (v.length >= 2 && /^[gbzy][gh]{0,1} /.test(v) && !/^g /.test(v)) {
      const spaceIdx = v.indexOf(" ");
      const key = v.slice(0, spaceIdx) as keywordType;

      if (key !== curKeyword && spaceIdx !== -1) {
        setCurKeyword(key);
        setValue(v.slice(spaceIdx + 1));
      } else {
        setValue(v);
      }
    } else {
      setValue(v);
    }
  };

  const handlePressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      window.open(
        `https://www.${keyword2site[curKeyword]}.com/search?q=${encodeURIComponent(value)}`,
        openType === "当前页" ? "_top" : "_blank"
      );
      setValue("");
    }
  };
  return null;
  if (hiddenSearchBox) return null;
  return (
    <div className="search-box" data-show={visibility}>
      <input
        type="text"
        ref={inpRef}
        value={value}
        id="search"
        onChange={handleInputChange}
        onKeyPress={handlePressEnter}
      />
      <span className="icon" style={{ color: iconColor }}>
        <EngineIcon keyword={curKeyword} />
      </span>
    </div>
  );
}
