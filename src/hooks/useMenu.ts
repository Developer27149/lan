import { useState } from "react";
import { storageDataType } from "../types";
import { SetterOrUpdater } from "recoil";
import { updateRootStateWithKeyAndValue } from "../utils/index";

export const useMenu = (
  config: storageDataType,
  setConfig: SetterOrUpdater<storageDataType>
) => {
  const { publicObject } = config;
  const { iconSize, showClock, showAddIconBox } = publicObject;
  const [showMenu, setShowMenu] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  const handleSwitchShowSetting = () => setShowSetting(!showSetting);
  const handleSwitchShowClock = () => {
    updateRootStateWithKeyAndValue(setConfig, "showClock", !showClock);
  };
  const handleSwitchShowAddIconBox = () => {
    updateRootStateWithKeyAndValue(setConfig, "showAddIconBox", !showAddIconBox);
  };

  return {
    handleSwitchShowClock,
    showSetting,
    handleSwitchShowSetting,
    showMenu,
    setShowMenu,
    iconSize,
    handleSwitchShowAddIconBox,
  };
};
