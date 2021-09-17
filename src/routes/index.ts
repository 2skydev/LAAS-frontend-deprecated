import Notification from "~/pages/Notification";
import Setting from "~/pages/Setting";

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
    component: Setting,
  },
];

export default routes;
