import "../style/tomatoTime.sass";
import { useState, useEffect } from "react";
import { BsArrowsExpand } from "react-icons/bs";
import { formatTomatoSeconds } from "../utils/index.js";
import { useRecoilState } from "recoil";
import { configState } from "../recoilRoot";

export default function tomatoSeconds() {
  const [config, setConfig] = useRecoilState(configState);
  const { publicObject } = config;
  const { tomatoSeconds, iconSize } = publicObject;
  const [count, setCount] = useState(tomatoSeconds);
  const handleHiddenClock = () => {
    setConfig({
      ...config,
      publicObject: {
        ...publicObject,
        showClock: false,
      },
    });
  };
  useEffect(() => {
    let id = 0;
    if (count > 0) {
      id = setTimeout(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
    } else {
      handleHiddenClock();
    }
    return () => {
      clearTimeout(id);
    };
  }, [count]);

  return (
    <div className="clock-container" data-size={iconSize}>
      <div className="count">{formatTomatoSeconds(count)}</div>
      <div className="info">揉揉眼睛，伸伸懒腰</div>
      <span className="hidden" onClick={handleHiddenClock}>
        <BsArrowsExpand />
      </span>
    </div>
  );
}
