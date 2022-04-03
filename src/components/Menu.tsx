import { FcSettings } from "react-icons/fc";
import { CgMenuGridO } from "react-icons/cg";
import { RiMenuUnfoldLine } from "react-icons/ri";
import { useMenu } from "../hooks/useMenu";
import { handleDownloadCurWallpaper } from "../utils/index";
import Settings from "./Settings";
import { useRecoilState } from "recoil";
import { configState } from "../recoilRoot";
import { AiOutlinePushpin } from "react-icons/ai";
import { MdWallpaper } from "react-icons/md";
import { bingComponentState } from "../bingWallpaperState";
import ReactTooltip from "react-tooltip";

export default function Menu() {
  const [config, setConfig] = useRecoilState(configState);
  const setBingState = useRecoilState(bingComponentState)[1];
  const {
    handleSwitchShowClock,
    handleSwitchShowSetting,
    showSetting,
    iconSize,
    showMenu,
    setShowMenu,
    handleSwitchShowAddIconBox,
  } = useMenu(config, setConfig);

  return (
    <>
      <div className="menu" data-size={iconSize} data-shrink={`${showMenu}`}>
        {showMenu ? (
          <>
            <ReactTooltip id="menuTip" place="bottom" />

            <div
              onClick={() =>
                setBingState((oldState) => ({
                  ...oldState,
                  show: !oldState.show,
                }))
              }
              data-for="menuTip"
              data-tip="去看看必应的风景"
              data-iscapture="true"
            >
              <MdWallpaper />
            </div>
            <div
              className="download"
              onClick={() => handleDownloadCurWallpaper(config)}
              data-for="menuTip"
              data-tip="点我可以下载当前显示的壁纸"
              data-iscapture="true"
            >
              <img src="icons/save.svg" />
            </div>
            <div
              className="rest"
              onClick={handleSwitchShowClock}
              data-for="menuTip"
              data-tip="你也想歇一会吗❤️"
              data-iscapture="true"
            >
              <img src="icons/rest_tomato.svg" />
            </div>
            <div
              onClick={handleSwitchShowAddIconBox}
              data-for="menuTip"
              data-tip="去看看我的书签🔖"
              data-iscapture="true"
            >
              <AiOutlinePushpin />
            </div>
            <div
              className="setting"
              onClick={handleSwitchShowSetting}
              data-for="menuTip"
              data-tip="还有一些设置项可以自定义"
              data-iscapture="true"
            >
              <FcSettings />
            </div>
            <div
              onClick={() => setShowMenu(!showMenu)}
              data-for="menuTip"
              data-tip="藏起来"
              data-iscapture="true"
            >
              <RiMenuUnfoldLine />
            </div>
          </>
        ) : (
          <div onClick={() => setShowMenu(!showMenu)}>
            <CgMenuGridO />
          </div>
        )}
      </div>
      {showSetting && <Settings handleSwitchShowSetting={handleSwitchShowSetting} />}
    </>
  );
}
