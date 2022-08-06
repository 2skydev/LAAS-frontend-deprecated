import { atom } from "recoil";

export const globalAtom = atom({
  key: "global",
  default: {
    initState: false,
    initBrowser: false,
    version: null,
    notificationStatus: {
      id: "loadConfig",
      status: "warning",
      desc: "설정을 불러오고 있어요 기다려주세요 :)",
    },
  },
});
