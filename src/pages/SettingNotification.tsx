import { Input, InputNumber, Space, Switch } from "antd";
import { useFormik } from "formik";
import { useRecoilState } from "recoil";
import SaveButton from "~/components/SaveButton";
import Section from "~/components/Section";
import { notificationSettingState } from "~/stores/notificationSetting";

const { ipcRenderer } = window.require("electron");

const initialValues = {
  lostarkID: "",
  lostarkPW: "",
  discordUserID: "",
  interval: 1,
  repeat: false,
};

type InitialValues = typeof initialValues;

export default function SettingNotification() {
  const [notificationSetting, setNotificationSetting] = useRecoilState(
    notificationSettingState
  );

  const formik = useFormik({
    initialValues: notificationSetting as InitialValues,
    onSubmit: (values) => {
      ipcRenderer.invoke("setConfig", "notification", values);
      setNotificationSetting(values);
    },
  });

  return (
    <div>
      <Section
        title="로스트아크 계정 *"
        desc={
          <>
            경매장을 검색하기 위해 로스트아크 계정이 필요합니다.
            <br />
            지정 PC, 소셜 로그인 같은 계정이 아닌 이메일 계정이 필요합니다.
            <br />
            <a
              href="https://member.onstove.com/v2.0/register"
              target="_blank"
              rel="noreferrer"
            >
              로스트아크 이메일로 회원가입하기
            </a>
          </>
        }
      >
        <Space className="inputs" size="middle" direction="vertical">
          <Input
            name="lostarkID"
            value={formik.values.lostarkID}
            onChange={formik.handleChange}
            placeholder="로스트아크 ID"
          />

          <Input
            type="password"
            name="lostarkPW"
            value={formik.values.lostarkPW}
            onChange={formik.handleChange}
            placeholder="로스트아크 비밀번호"
          />
        </Space>
      </Section>

      <Section
        title="Discord 사용자 ID *"
        desc={
          <>
            알림을 받을 때 멘션을 하기 위해 Discord 사용자 ID를 수집하고
            있습니다.
            <br />
            Discord 사용자 ID는 아래 링크를 참고해서 복사하면 됩니다.
            <br />
            <a
              href="https://support.discord.com/hc/ko/articles/206346498-%EC%82%AC%EC%9A%A9%EC%9E%90-%EC%84%9C%EB%B2%84-%EB%A9%94%EC%8B%9C%EC%A7%80-ID%EB%8A%94-%EC%96%B4%EB%94%94%EC%84%9C-%ED%99%95%EC%9D%B8%ED%95%98%EB%82%98%EC%9A%94-"
              target="_blank"
              rel="noreferrer"
            >
              사용자/서버/메시지 ID는 어디서 확인하나요?
            </a>
          </>
        }
      >
        <Space className="inputs" size="middle">
          <Input
            name="discordUserID"
            value={formik.values.discordUserID}
            onChange={formik.handleChange}
            placeholder="Discord 사용자 ID"
          />
        </Space>
      </Section>

      <Section
        title="매물 검색 주기"
        desc={
          <>
            장신구 매물 검색하는 주기를 설정합니다.
            <br />
            단위는 "분" 단위입니다.
          </>
        }
      >
        <Space className="inputs" size="middle">
          <InputNumber
            style={{ width: 200 }}
            placeholder="검색 주기"
            value={formik.values.interval}
            onChange={(value) => formik.setFieldValue("interval", value)}
            min={1}
            formatter={(value) => `${value}분`}
          />
        </Space>
      </Section>

      <Section
        title="알림 반복"
        desc={
          <>
            매물을 찾아서 알림이 보낸 후 다시 같은 매물이 검색되었을 때 알림을
            보낼지 설정합니다.
            <br />
            해당 옵션이 꺼져있다면 알림을 반복해서 보내지 않습니다.
          </>
        }
      >
        <Switch
          checked={formik.values.repeat}
          onChange={(value) => formik.setFieldValue("repeat", value)}
          checkedChildren={<i className="bx bx-check" />}
          unCheckedChildren={<i className="bx bx-x" />}
        />
      </Section>

      <SaveButton
        defaultValues={notificationSetting}
        formikValues={formik.values}
        onSubmit={formik.submitForm}
      />
    </div>
  );
}
