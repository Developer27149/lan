import "../style/settings.sass";
import { iconSize, openTypeStr } from "../types/index.js";
import { handleStopMousemove, updateRootStateWithKeyAndValue } from "../utils/index.js";
import Info from "./Info";
import Slider from "./Slider";
import SwitchOptions from "./SwitchOptions";
import { useRecoilState } from "recoil";
import { configState } from "../recoilRoot";
interface IProps {
  handleSwitchShowSetting: () => void;
}

type IIconSizeOption = "大" | "中" | "小";
enum IconSizeEnum {
  "大" = "lg",
  "中" = "md",
  "小" = "sm",
}

export default function Settings({ handleSwitchShowSetting }: IProps) {
  const [config, setConfig] = useRecoilState(configState);
  const { publicObject } = config;
  const { iconSize, openType, showCurClock, tomatoSeconds } = publicObject;
  // init

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
        <SwitchOptions
          options={["大", "中", "小"]}
          currentOption={iconSize}
          handleSwitch={(option) =>
            setConfig({
              ...config,
              publicObject: {
                ...publicObject,
                iconSize: IconSizeEnum[option as IIconSizeOption],
              },
            })
          }
          title="图标大小"
        />
        <SwitchOptions
          options={["新页面", "当前页"]}
          handleSwitch={(option) => {
            if (option !== openType) {
              console.log("set open type to:", option, openType);
              setConfig({
                ...config,
                publicObject: {
                  ...publicObject,
                  openType: option as openTypeStr,
                },
              });
            }
          }}
          currentOption={openType}
          title="搜索页面打开方式"
        />
        <SwitchOptions
          options={["显示", "隐藏"]}
          currentOption={showCurClock ? "显示" : "隐藏"}
          handleSwitch={(option) => {
            updateRootStateWithKeyAndValue(setConfig, "showCurClock", option === "显示");
          }}
          title="左上角显示当前时间"
        />
        <div className="rest">
          <h4>番茄钟</h4>
          <Slider value={tomatoSeconds} />
        </div>

        <Info />
      </div>
    </div>
  );
}
