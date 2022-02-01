import { useAppContext } from "../context/index.js";
import "../style/settings.sass";
import { iconSize } from "../types/index.js";
import Info from "./Info";
import Slider from "./Slider";
interface IProps {
  handleSwitchShowSetting: () => void;
}
export default function Settings({ handleSwitchShowSetting }: IProps) {
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
    <div className="settings-container" onClick={handleSwitchShowSetting}>
      <div
        className="settings"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <div className="item">
          <span className="text">图标大小</span>
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
          <span className="text">小憩</span>
          <Slider value={state.tomatoSeconds} />
        </div>
        <Info />
      </div>
    </div>
  );
}
