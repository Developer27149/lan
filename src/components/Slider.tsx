import { sliderProps } from "../types/index.js";
import "../style/slider.sass";
import { CSSProperties, useRef } from "react";
import { useAppContext } from "../context/index.js";

export default function Slider(props: sliderProps) {
  let { value, min = 1, max = 40 } = props;
  if (value > max) {
    value = min;
  }
  const divRef = useRef<HTMLDivElement>(null);
  const { dispatch } = useAppContext();
  const handleModifyValue = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(e.pageX, divRef.current?.getBoundingClientRect());
    const curDiv = divRef.current?.getBoundingClientRect();
    const x = curDiv?.left as number;
    const width = curDiv?.width as number;
    const percent = (e.pageX - x) / width;
    dispatch({
      type: "tomato",
      payload: ~~(max * percent),
    });
  };
  return (
    <div
      className="slider"
      onClick={handleModifyValue}
      ref={divRef}
      style={
        {
          "--v": value / max + "%",
          "--max": max + "%",
          "--min": min + "%",
        } as CSSProperties
      }
    ></div>
  );
}
