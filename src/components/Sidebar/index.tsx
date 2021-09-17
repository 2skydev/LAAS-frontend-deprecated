import { SidebarStyled } from "./styled";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { AnimateSharedLayout, motion } from "framer-motion";

const menus = [
  {
    title: "검색",
    items: [
      {
        icon: "bell",
        link: "/",
        text: "매물 알림 관리",
      },
    ],
  },
  {
    title: "설정",
    items: [
      {
        icon: "cog",
        link: "/settings",
        text: "일반",
      },
      {
        icon: "bell",
        link: "/settings/notification",
        text: "알림 설정",
      },
    ],
  },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <SidebarStyled>
      <div className="logo">LAAS</div>

      <AnimateSharedLayout>
        <div className="menus">
          {menus.map((menuGroup) => (
            <div key={menuGroup.title} className="menuGroup">
              <div className="title">{menuGroup.title}</div>

              <div className="items">
                {menuGroup.items.map((item) => {
                  const isActive = location.pathname === item.link;

                  return (
                    <Link
                      key={item.text}
                      to={item.link}
                      className={clsx("item", isActive && "active")}
                    >
                      {isActive && (
                        <motion.div
                          className="menuActiveBG"
                          layoutId="menuActiveBG"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 35,
                          }}
                        />
                      )}

                      <i className={`bx bx-${item.icon}`} />
                      <span>{item.text}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </AnimateSharedLayout>
    </SidebarStyled>
  );
}
