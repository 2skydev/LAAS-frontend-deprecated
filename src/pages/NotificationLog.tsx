import { Table } from "antd";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { notificationLogTimeState } from "~/stores/notificationLogs";

const NotificationLogStyled = styled.div`
  .ok,
  .no {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .ok {
    color: ${(props) => props.theme.success};
  }

  .no {
    color: ${(props) => props.theme.error};
  }
`;

export default function NotificationLog() {
  const logTime = useRecoilValue(notificationLogTimeState);
  const logs = [...window.notificationLogs];

  const columns = [
    {
      title: "검색 회차",
      key: "count",
      render: (data: any) => data.count + "회차",
    },
    {
      title: "검색됨",
      key: "isFind",
      align: "center",
      render: (data: any) =>
        data.status === "find" ? (
          <i className="bx bx-circle ok" />
        ) : (
          <i className="bx bx-x no" />
        ),
    },
    {
      title: "검색한 매물 간략 설명",
      key: "item",
      render: (data: any) => {
        if (!data.test) {
          return "";
        }

        const item = data.test.item._origin;

        return (
          <>
            [{item.accessory}]{" "}
            <span style={{ color: "#7e57c2" }}>
              {item.characteristic1}
              {item.characteristic2 ? " / " + item.characteristic2 : ""}
            </span>{" "}
            -{" "}
            <span style={{ color: "#5c6bc0" }}>
              {item.engrave1}
              {item.engrave2 ? " / " + item.engrave2 : ""}
            </span>{" "}
            - {item.quality} -{" "}
            <span style={{ color: "#ffca28" }}>
              최대 ${Number(item.maxPrice).toLocaleString()} 골드
            </span>
          </>
        );
      },
    },
    {
      title: "시간",
      key: "time",
      render: (data: any) => data.time,
    },
    {
      title: "설명",
      key: "desc",
      render: (data: any) => data.desc,
    },
  ];

  return (
    <NotificationLogStyled>
      <Table
        // @ts-ignore
        columns={columns}
        dataSource={logs.reverse()}
        pagination={false}
        rowKey="id"
      />
    </NotificationLogStyled>
  );
}
