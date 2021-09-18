import Notification from "~/pages/Notification";
import NotificationLog from "~/pages/NotificationLog";
import Setting from "~/pages/Setting";
import SettingNotification from "~/pages/SettingNotification";

const routes = [
  {
    path: "/",
    component: Notification,
    text: "매물 알림 관리",
  },
  {
    path: "/settings",
    component: Setting,
    text: "일반 설정",
  },
  {
    path: "/settings/notification",
    component: SettingNotification,
    text: "알림 설정",
  },
  {
    path: "/logs/notification",
    component: NotificationLog,
    text: "매물 알림 로그",
  },
];

export default routes;
