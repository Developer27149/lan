import "../style/clock.sass";
import React, { useEffect, useState } from "react";
import { getFormatCurClock } from "../utils/index.js";
import { IconType } from "react-icons/lib";

export default React.memo(function Clock(props: { size: IconType }) {
  const { size } = props;
  const [timeStr, setTimeStr] = useState<string>(getFormatCurClock());
  useEffect(() => {
    let id = setInterval(() => {
      setTimeStr(getFormatCurClock());
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);
  return (
    <span data-size={size} className="cur-clock-container">
      {timeStr}
    </span>
  );
});
