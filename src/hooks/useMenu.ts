import { useAppContext } from "../context/index.js";
import { useState } from "react";

export const useMenu = () => {
  const { state, dispatch } = useAppContext();
  const [showSetting, setShowSetting] = useState(true);
  const handleSwitchShowSetting = () => setShowSetting(!showSetting);
  const handleSwitchShowClock = () =>
    dispatch({
      type: "clock",
      payload: !state.showClock,
    });
  return { handleSwitchShowClock, showSetting, handleSwitchShowSetting };
};
