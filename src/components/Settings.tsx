import "../style/settings.sass";
import {
  createReflectMapObject,
  handleStopMousemove,
  updateRootStateWithKeyAndValue,
} from "../utils/index";
import Info from "./Info";
import Slider from "./Slider";
import SwitchOptions from "./SwitchOptions";
import { useRecoilState } from "recoil";
import { configState } from "../recoilRoot";
interface IProps {
  handleSwitchShowSetting: () => void;
}

const iconMap = createReflectMapObject(["大", "中", "小"], ["lg", "md", "sm"]);
const imgQualityMap = createReflectMapObject(
  ["原画", "高清", "常规"],
  ["raw", "full", "regular"]
);

export default function Settings({ handleSwitchShowSetting }: IProps) {
  const [config, setConfig] = useRecoilState(configState);
  const { publicObject } = config;
  const { iconSize, openType, showCurClock, tomatoSeconds, imgQuality } = publicObject;
  // init switch array
  const switchList = [
    {
      options: ["大", "中", "小"],
      currentOption: iconMap[iconSize],
      handleSwitch: (option: any) =>
        updateRootStateWithKeyAndValue(setConfig, "iconSize", iconMap[option]),
      title: "图标大小",
    },
    {
      options: ["新页面", "当前页"],
      handleSwitch: (option: any) =>
        updateRootStateWithKeyAndValue(setConfig, "openType", option),
      currentOption: openType,
      title: "搜索页面打开方式",
    },
    {
      options: ["显示", "隐藏"],
      currentOption: showCurClock ? "显示" : "隐藏",
      handleSwitch: (option: any) =>
        updateRootStateWithKeyAndValue(setConfig, "showCurClock", option === "显示"),
      title: "左上角显示当前时间",
    },
    {
      title: "画质设置",
      options: ["原画", "高清", "常规"],
      currentOption: imgQualityMap[imgQuality],
      handleSwitch: (option: any) =>
        updateRootStateWithKeyAndValue(setConfig, "imgQuality", imgQualityMap[option]),
    },
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
        {switchList.map((properties, idx) => (
          <SwitchOptions {...properties} key={idx} />
        ))}
        <div className="rest">
          <h4>番茄钟</h4>
          <Slider value={tomatoSeconds} />
        </div>

        <Info />
      </div>
    </div>
  );
}
