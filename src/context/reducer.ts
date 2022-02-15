import { IAction, IState } from "./types";

export const appReducer = (state: IState, action: IAction) => {
  const { type, payload } = action;
  switch (type) {
    case "iconSize":
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
    case "curClock":
      return {
        ...state,
        showCurClock: payload,
      };
    case "tomato":
      return {
        ...state,
        tomatoSeconds: payload,
      };
    case "openType":
      return {
        ...state,
        openType: payload,
      };
    case "engine":
      return {
        ...state,
        engine: payload,
      };
    default:
      return state;
  }
};
