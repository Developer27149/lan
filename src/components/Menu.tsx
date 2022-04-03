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

export default function Menu() {
  const [config, setConfig] = useRecoilState(configState);
  const [_, setBingState] = useRecoilState(bingComponentState);
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
            <div
              onClick={() =>
                setBingState((oldState) => ({
                  ...oldState,
                  show: !oldState.show,
                }))
              }
            >
              <MdWallpaper />
            </div>
            <div className="download" onClick={() => handleDownloadCurWallpaper(config)}>
              <img src="icons/save.svg" />
            </div>
            <div className="rest" onClick={handleSwitchShowClock}>
              <img src="icons/rest_tomato.svg" />
            </div>
            <div onClick={handleSwitchShowAddIconBox}>
              <AiOutlinePushpin />
            </div>
            <div className="setting" onClick={handleSwitchShowSetting}>
              <FcSettings />
            </div>
            <div onClick={() => setShowMenu(!showMenu)}>
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
