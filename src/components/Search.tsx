import { FormEvent, useState } from "react";
import { useSearch } from "../hooks/useSearch";
import { keyword2site } from "../utils/index";
import { keywordType } from "../types/index";
import EngineIcon from "./EngineIcon";
import { useAppContext } from "../context/index.js";

export default function Search() {
  const { state } = useAppContext();

  const { setCurKeyword, curKeyword, visibility, inpRef, iconColor } =
    useSearch();

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
        `https://www.${keyword2site[curKeyword]}.com/search?q=${value}`,
        state.openType === "当前页" ? "_top" : "_blank"
      );
      setValue("");
    }
  };

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
