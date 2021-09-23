import { AnimatePresence, motion } from "framer-motion";
import { Route, Switch, useLocation } from "react-router";
import routes from "~/routes";
import { ContentStyled } from "./styled";

export default function Content() {
  const location = useLocation();
  const route = routes.find((item) => item.path === location.pathname);

  return (
    <ContentStyled>
      <div className="header">
        <i className="bx bx-hash" />

        <motion.span
          initial={{ opacity: 0, x: 3 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          key={location.pathname}
        >
          {route?.text || "해당 페이지의 이름이 없는거 같네요 :("}
        </motion.span>
      </div>

      <div className="content">
        <AnimatePresence>
          <Switch location={location} key={location.pathname}>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} exact>
                <motion.div
                  key="animate"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <route.component />
                </motion.div>
              </Route>
            ))}
          </Switch>
        </AnimatePresence>
      </div>
    </ContentStyled>
  );
}
