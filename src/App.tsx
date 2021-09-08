import { Card, Tabs, Table, InputNumber, Space } from "antd";
import "./app.scss";
import "antd/dist/antd.css";
import Engrave from "./components/select/Engrave";
import Characteristic from "./components/select/Characteristic";

export default function App() {
  const columns = [
    {
      title: "장신구",
      dataIndex: "accessory",
      key: "accessory",
    },
    {
      title: "전투 특성 1",
      key: "characteristic1",
      render: () => {
        return <Characteristic />;
      },
    },
    {
      title: "전투 특성 2",
      key: "characteristic2",
      render: () => {
        return <Characteristic />;
      },
    },
    {
      title: "각인 효과 1",
      key: "engrave1",
      render: () => {
        return (
          <Space>
            <Engrave />
            <InputNumber placeholder="최소값" max={5} />
          </Space>
        );
      },
    },
    {
      title: "각인 효과 2",
      key: "engrave2",
      render: () => {
        return (
          <Space>
            <Engrave />
            <InputNumber placeholder="최소값" max={5} />
          </Space>
        );
      },
    },
  ];

  const dataSource = [
    {
      accessory: "목걸이",
    },
    {
      accessory: "귀걸이1",
    },
    {
      accessory: "귀걸이2",
    },
    {
      accessory: "반지1",
    },
    {
      accessory: "반지2",
    },
  ];

  return (
    <Card title="로스트아크 장신구 검색" style={{ margin: "20px" }}>
      <Tabs defaultActiveKey="1" tabPosition="left">
        <Tabs.TabPane tab="직접 검색" key="1">
          <Table columns={columns} dataSource={dataSource} />
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
}
