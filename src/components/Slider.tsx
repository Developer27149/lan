import { sliderProps } from "../types/index.js";
import "../style/slider.sass";
import { CSSProperties, useRef } from "react";
import { useRecoilState } from "recoil";
import { configState } from "../recoilRoot";

export default function Slider(props: sliderProps) {
  let { value, min = 1, max = 40 } = props;
  if (value / 60 > max) {
    value = min;
  }
  const curV = (value / max / 60) * 100;

  const divRef = useRef<HTMLDivElement>(null);
  const [config, setConfig] = useRecoilState(configState);
  const handleModifyValue = (e: React.MouseEvent<HTMLDivElement>) => {
    const curDiv = divRef.current?.getBoundingClientRect();
    const x = curDiv?.left as number;
    const width = curDiv?.width as number;
    const percent = (e.pageX - x) / width;
    const payload = ~~(max * percent) * 60;

    setConfig({
      ...config,
      publicObject: {
        ...config.publicObject,
        tomatoSeconds: payload > 0 ? payload : 60,
      },
    });
  };

  return (
    <div className="slider-container">
      <div
        className="slider"
        onClick={handleModifyValue}
        ref={divRef}
        style={
          {
            "--v": ~~curV + "%",
            "--text": ~~(value / 60) + "分钟",
          } as CSSProperties
        }
      ></div>
      <span className="time-text">{Math.round(value / 60)}分钟</span>
    </div>
  );
}
