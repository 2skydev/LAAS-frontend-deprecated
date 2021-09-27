import { Button, Popover, Table } from "antd";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import NotificationStatus from "~/components/NotificationStatus";
import { notificationLogsState } from "~/stores/notificationLogs";

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

function SearchItemInfo({ log }: { log: any }) {
  if (!log.test) {
    return null;
  }

  const item = log.test.item;

  return (
    <span style={{ color: "#b0bec5" }}>
      <span style={{ color: "#ffa726" }}>[{item.accessory}]</span>{" "}
      {item.characteristic1}
      {item.characteristic2 ? " / " + item.characteristic2 : ""} -{" "}
      <span style={{ color: "#b0bec5" }}>
        {item.engrave1 + item.engrave1min}
        {item.engrave2 ? " / " + item.engrave2 + item.engrave2min : ""}
      </span>{" "}
      - {item.quality} -{" "}
      <span style={{ color: "#ffca28" }}>
        최대 {Number(item.maxPrice).toLocaleString()} 골드
      </span>
    </span>
  );
}

function Desc({ log }: { log: any }) {
  const popovers: Record<any, any> = {
    overflowMaxPrice: {
      title: "그나마 싼 매물",
      content: <>hi</>,
    },
  };

  if (popovers[log.status]) {
    const popover = popovers[log.status];

    return (
      <Popover title={popover.title} content={popover.content} trigger="hover">
        <Button>{log.desc}</Button>
      </Popover>
    );
  } else {
    return log.desc;
  }
}

export default function NotificationLog() {
  const logs = useRecoilValue(notificationLogsState);

  console.log(logs);

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
      key: "searchItemInfo",
      render: (log: any) => <SearchItemInfo log={log} />,
    },
    {
      title: "시간",
      key: "time",
      render: (data: any) => data.time,
    },
    {
      title: "설명",
      key: "desc",
      render: (data: any) => <Desc log={data} />,
    },
  ];

  return (
    <NotificationLogStyled>
      <NotificationStatus />

      <Table
        // @ts-ignore
        columns={columns}
        dataSource={logs}
        pagination={{
          pageSize: 8,
          pageSizeOptions: [],
        }}
        rowKey="id"
      />
    </NotificationLogStyled>
  );
}
