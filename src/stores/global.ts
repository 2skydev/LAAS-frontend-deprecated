import { atom } from "recoil";

export const globalAtom = atom({
  key: "global",
  default: {
    initBrowser: false,
    notificationStatus: {
      id: "loadConfig",
      status: "warning",
      desc: "설정을 불러오고 있어요 기다려주세요 :)",
    },
  },
});
