import { Card, Tabs } from "antd";
import "./app.scss";
import "antd/dist/antd.css";
import Notification from "./components/notification/Notification";

export default function App() {
  return (
    <Card title="로스트아크 장신구 검색 (LAAS)" style={{ margin: "20px" }}>
      <Tabs defaultActiveKey="1" tabPosition="left">
        <Tabs.TabPane tab="매물 알림 등록" key="1">
          <Notification />
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
}
