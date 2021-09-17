import { Route, Switch } from "react-router";
import routes from "~/routes";
import { ContentStyled } from "./styled";

export default function Content() {
  return (
    <ContentStyled>
      <div className="header">
        <i className="bx bx-hash" />
        <span>매물 알림 관리</span>
      </div>

      <div className="content">
        <Switch>
          {routes.map((route) => (
            <Route path={route.path} component={route.component} exact />
          ))}
        </Switch>
      </div>
    </ContentStyled>
  );
}
