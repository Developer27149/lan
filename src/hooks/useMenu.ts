import { useAppContext } from "../context/index.js";

export const useMenu = () => {
  const { state, dispatch } = useAppContext();
  const handleSwitchShowClock = () =>
    dispatch({
      type: "clock",
      payload: !state.showClock,
    });
  return { handleSwitchShowClock };
};
