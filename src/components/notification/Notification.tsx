import { Card } from "antd";
import styled from "styled-components";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const NotificationStyled = styled.div`
  .ant-card {
    width: 300px;
  }
`;

export default function Notification() {
  return (
    <NotificationStyled>
      <div className="list">
        <Card actions={[<EditOutlined />, <DeleteOutlined />]}></Card>
      </div>
    </NotificationStyled>
  );
}
