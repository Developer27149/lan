import { FcSettings } from "react-icons/fc";
import { CgMenuGridO } from "react-icons/cg";
import { RiMenuUnfoldLine } from "react-icons/ri";
import { useMenu } from "../hooks/useMenu";
import ClockContainer from "./ClockContainer";
import { useState } from "react";
import { handleDownloadCurWallpaper } from "../utils/index";
import { useAppContext } from "../context/index.js";

export default function Menu() {
  const { state } = useAppContext();
  const [showMenu, setShowMenu] = useState(false);
  const { showClock, handleSwitchShowClock } = useMenu();
  console.log(state);

  return (
    <>
      <div
        className="menu"
        data-size={state.iconSize}
        data-shrik={`${showMenu}`}
      >
        {showMenu ? (
          <>
            <div className="download" onClick={handleDownloadCurWallpaper}>
              <img src="icons/save.svg" />
            </div>
            <div className="rest" onClick={handleSwitchShowClock}>
              <img src="icons/rest_tomato.svg" />
            </div>
            <div className="setting">
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
      {showClock && <ClockContainer handleSwitch={handleSwitchShowClock} />}
    </>
  );
}
