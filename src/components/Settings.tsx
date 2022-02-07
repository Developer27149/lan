import { useAppContext } from "../context/index.js";
import "../style/settings.sass";
import { iconSize, openTypeStr } from "../types/index.js";
import { handleStopMousemove } from "../utils/index.js";
import Info from "./Info";
import Slider from "./Slider";
import SwitchOptions from "./SwitchOptions";
interface IProps {
  handleSwitchShowSetting: () => void;
}
export default function Settings({ handleSwitchShowSetting }: IProps) {
  const { state, dispatch } = useAppContext();
  const initIconSizeEvent = (payload: iconSize) => () => {
    dispatch({ type: "iconSize", payload });
  };
  const initSwitchIconsizeOption = (text: string, size: iconSize) => ({
    text,
    onClickEvent: initIconSizeEvent(size),
    active: size === state.iconSize,
  });
  const initOpenTypeEvent = (payload: openTypeStr) => () => {
    dispatch({ type: "openType", payload });
  };
  const initSwitchOpenPageStyle = (text: string, typeStr: openTypeStr) => ({
    text,
    onClickEvent: initOpenTypeEvent(typeStr),
    active: typeStr === state.openType,
  });
  const initShowCurTimeEvent = (payload: boolean) => () => {
    dispatch({ type: "curClock", payload });
  };
  const initSwitchShowCurTimeOptions = (text: string, isShowCurTime: boolean) => ({
    text,
    onClickEvent: initShowCurTimeEvent(isShowCurTime),
    active: isShowCurTime === state.showCurClock,
  });
  // init options about icon size
  const option1 = [
    initSwitchIconsizeOption("小", "sm"),
    initSwitchIconsizeOption("中", "md"),
    initSwitchIconsizeOption("大", "lg"),
  ];
  // init search open style
  const option2 = [
    initSwitchOpenPageStyle("新页面", "新页面"),
    initSwitchOpenPageStyle("当前页", "当前页"),
  ];
  // init show current time option
  const option3 = [
    initSwitchShowCurTimeOptions("显示", false),
    initSwitchShowCurTimeOptions("隐藏", true),
  ];
  return (
    <div
      className="settings-container"
      onClick={handleSwitchShowSetting}
      onMouseMove={handleStopMousemove}
    >
      <div
        className="settings"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <SwitchOptions options={option1} title="图标大小" />
        <SwitchOptions options={option2} title="搜索页面打开方式" />
        <SwitchOptions options={option3} title="左上角显示当前时间" />
        <div className="rest">
          <h4>番茄钟</h4>
          <Slider value={state.tomatoSeconds} />
        </div>

        <Info />
      </div>
    </div>
  );
}
