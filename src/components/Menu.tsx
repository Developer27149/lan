import { FcSettings } from "react-icons/fc";
import { CgMenuGridO } from "react-icons/cg";
import { RiMenuUnfoldLine } from "react-icons/ri";
import { useMenu } from "../hooks/useMenu";
import { useState } from "react";
import { handleDownloadCurWallpaper } from "../utils/index";
import Settings from "./Settings";
import { useRecoilState } from "recoil";
import { configState } from "../recoilRoot";

export default function Menu() {
  const [config, setConfig] = useRecoilState(configState);

  const {
    handleSwitchShowClock,
    handleSwitchShowSetting,
    showSetting,
    iconSize,
    showMenu,
    setShowMenu,
  } = useMenu(config, setConfig);

  return (
    <>
      <div className="menu" data-size={iconSize} data-shrink={`${showMenu}`}>
        {showMenu ? (
          <>
            <div className="download" onClick={() => handleDownloadCurWallpaper(config)}>
              <img src="icons/save.svg" />
            </div>
            <div className="rest" onClick={handleSwitchShowClock}>
              <img src="icons/rest_tomato.svg" />
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
