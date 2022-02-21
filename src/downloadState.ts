import { atom } from "recoil";

export const downloadState = atom({
  key: "download",
  default: {
    isDownloading: false,
    progress: 0,
  },
});
