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
    default:
      return state;
  }
};
