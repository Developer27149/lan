import { saveToStorage } from "../utils/index.js";
import { IAction, IState } from "./types";

export const appReducer = (state: IState, action: IAction) => {
  const { type, payload } = action;
  switch (type) {
    case "iconSize":
      saveToStorage({ icon_size: payload });
      return {
        ...state,
        iconSize: payload,
      };
    case "wallpaper":
      return {
        ...state,
        wallpaper: payload,
      };
    case "clock":
      return {
        ...state,
        showClock: payload,
      };
    case "tomato":
      saveToStorage({ tomato_seconds: payload });
      return {
        ...state,
        tomatoSeconds: payload,
      };
    case "openType":
      saveToStorage({ open_type: payload });
      return {
        ...state,
        openType: payload,
      };
    default:
      return state;
  }
};
