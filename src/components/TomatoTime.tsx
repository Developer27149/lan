import { useAppContext } from "../context/index";
import "../style/tomatoTime.sass";
import { useState, useEffect } from "react";
import { BsArrowsExpand } from "react-icons/bs";
import { formatTomatoSeconds } from "../utils/index.js";

export default function tomatoSeconds() {
  const { state, dispatch } = useAppContext();
  const [count, setCount] = useState(state.tomatoSeconds);
  const handleHiddenClock = () => {
    dispatch({
      type: "clock",
      payload: false,
    });
  };
  useEffect(() => {
    let id = 0;
    if (count > 0) {
      id = setTimeout(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
    } else {
      dispatch({
        type: "clock",
        payload: false,
      });
    }
    return () => {
      clearTimeout(id);
    };
  }, [count]);

  return (
    <div className="clock-container" data-size={state.iconSize}>
      <div className="count">{formatTomatoSeconds(count)}</div>
      <div className="info">揉揉眼睛，伸伸懒腰</div>
      <span className="hidden" onClick={handleHiddenClock}>
        <BsArrowsExpand />
      </span>
    </div>
  );
}
