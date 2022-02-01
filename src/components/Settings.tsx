import { useAppContext } from "../context/index.js";
import "../style/settings.sass";
import { iconSize } from "../types/index.js";
import Slider from "./Slider";

export default function Settings() {
  const { state, dispatch } = useAppContext();
  const iconSizes: iconSize[] = ["sm", "md", "lg"];
  const handleModifyIconSize = (key: iconSize) => {
    dispatch({ type: "iconSize", payload: key });
  };
  const mapObj = {
    sm: "小",
    md: "中",
    lg: "大",
  };
  return (
    <div className="settings-container">
      <div className="settings">
        <div className="item">
          <span className="text">字体大小</span>
          {iconSizes.map((size) => (
            <span
              className={
                state.iconSize === size ? "size-option active" : "size-option"
              }
              key={size}
              onClick={() => handleModifyIconSize(size)}
            >
              {mapObj[size]}
            </span>
          ))}
        </div>
        <div className="item">
          <span className="text">小憩时间(分钟)</span>
          <Slider value={state.tomatoSeconds} />
        </div>
      </div>
    </div>
  );
}
