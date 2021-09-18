import { atom } from "recoil";

export const notificationSettingState = atom({
  key: "notificationSetting",
  default: {
    lostarkID: "",
    lostarkPW: "",
    discordUserID: "",
    repeat: false,
    interval: 1,
  },
});
