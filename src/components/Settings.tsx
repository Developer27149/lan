import { useAppContext } from "../context/index.js";
import "../style/settings.sass";
import { iconSize, openTypeStr } from "../types/index.js";
import { handleStopMousemove } from "../utils/index.js";
import Info from "./Info";
import Slider from "./Slider";
import SwitchOptions from "./SwitchOptions";
import { useRecoilState } from 'recoil';
import { configState } from '../recoilRoot';
interface IProps {
  handleSwitchShowSetting: () => void;
}

enum IconSizeEnum {
  lg = "大",
  md = "中",
  sm = "小"
}

export default function Settings({ handleSwitchShowSetting }: IProps) {
  const [config, setConfig] = useRecoilState(configState) 
  const {publicObject} = config;
  const {iconSize, openType, showCurClock} = publicObject;
  // init
  const option1 = {
    text: IconSizeEnum[iconSize],
    onClickEvent: () => setConfig({...config, publicObject: {
      ...publicObject,
      iconSize: 
    }})
  }
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
