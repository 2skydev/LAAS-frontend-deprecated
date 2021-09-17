import Notification from "~/pages/Notification";
import Setting from "~/pages/Setting";
import SettingNotification from "~/pages/SettingNotification";

const routes = [
  {
    path: "/",
    component: Notification,
  },
  {
    path: "/settings",
    component: Setting,
  },
  {
    path: "/settings/notification",
    component: SettingNotification,
  },
];

export default routes;
