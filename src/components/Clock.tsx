import "../style/clock.sass";
import { useEffect, useState } from "react";
import { getFormatCurClock } from "../utils/index.js";
import { useRecoilState } from "recoil";
import { configState } from "../recoilRoot";

export default function Clock() {
  const [config] = useRecoilState(configState);
  const [timeStr, setTimeStr] = useState<string>(getFormatCurClock());
  useEffect(() => {
    let id = setInterval(() => {
      setTimeStr(getFormatCurClock());
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);
  if (!config?.publicObject?.showCurClock) return null;
  return (
    <span data-size={config.publicObject.iconSize} className="cur-clock-container">
      {timeStr}
    </span>
  );
}
