import { atom } from "recoil";

export const bingComponentState = atom({
  key: "bing",
  default: {
    show: false,
    data: {} as {
      images: {
        startdate: string;
        fullstartdate: string;
        enddate: string;
        urlbase: string;
        copyright: string;
      }[];
    } & unknown,
  },
});
