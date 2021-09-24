import { Badge, Button, Tooltip } from "antd";
import { useRecoilValue } from "recoil";
import { globalAtom } from "~/stores/global";
import { NotificationStatusStyled } from "./styled";

const { ipcRenderer } = window.require("electron");

export default function NotificationStatus() {
  const { notificationStatus } = useRecoilValue(globalAtom);

  const requestNowSearch = () => {
    ipcRenderer.send("requestNowSearch");
  };

  return (
    <NotificationStatusStyled>
      <Badge status={notificationStatus.status as any} />
      <span className="desc">{notificationStatus.desc}</span>
      {notificationStatus.id === "nextSearchSec" && (
        <Button
          icon={
            <Tooltip title="대기시간 무시하고 바로 검색 시작하기">
              <i className="bx bx-skip-next" />
            </Tooltip>
          }
          onClick={requestNowSearch}
        />
      )}
    </NotificationStatusStyled>
  );
}
