import { IAction, IState } from "./types";

export const appReducer = (state: IState, action: IAction) => {
  const { type, payload } = action;
  switch (type) {
    case "history":
      return {
        ...state,
        historyId: [...payload],
      };
    case "clock":
      return {
        ...state,
        showClock: payload,
      };
    case "public":
      return {
        ...state,
        publicObject: payload,
      };
    default:
      return state;
  }
};
