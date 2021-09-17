import { SidebarStyled } from "./styled";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { AnimateSharedLayout, motion } from "framer-motion";
import { menus } from "~/routes/menus";

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
