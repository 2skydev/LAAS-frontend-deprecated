import { Button, Divider, Input, InputNumber, Modal, Space, Table, Tag, Tooltip } from "antd";
import styled from "styled-components";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import Characteristic from "../components/Select/Characteristic";
import Engrave from "../components/Select/Engrave";
import Accessory from "../components/Select/Accessory";
import Quality from "../components/Select/Quality";
import { useFormik } from "formik";
import gradeNativeValues from "~/assets/json/grade.json";
import accessoryNativeValues from "~/assets/json/accessory.json";
import characteristicNativeValues from "~/assets/json/characteristic.json";
import engraveNativeValues from "~/assets/json/engrave.json";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useRecoilState } from "recoil";
import { notificationItemsState, Item } from "~/stores/notificationItems";
import Grade from "~/components/Select/Grade";

const { ipcRenderer } = window.require("electron");

const NotificationStyled = styled.div`
  .ant-card {
    width: 300px;
  }
`;

const statusLabel = {
  create: {
    text: "생성중",
    color: "transparent",
  },
  save: {
    text: "저장됨",
    color: "#4caf50",
  },
  edit: {
    text: "수정중",
    color: "#ff9800",
  },
};

export default function Notification() {
  const [notificationItems, setNotificationItems] = useRecoilState(
    notificationItemsState
  );
  const [tableData, setTableData] = useState<Item[]>([]);

  const formik = useFormik<Item[]>({
    initialValues: [],
    onSubmit: () => {},
  });

  const changeItemValue = (index: number, changer: (item: Item) => Item) => {
    const items = [...formik.values];

    items[index] = changer(items[index]);

    if (items[index].status === "save") {
      items[index].status = "edit";
    }

    formik.setValues(items);
  };

  const handleSelectAccessory = (index: number, value: string) => {
    changeItemValue(index, (item) => {
      return {
        ...item,
        accessory: value,
      };
    });
  };

  const handleSelectGrade = (index: number, value: string) => {
    changeItemValue(index, (item) => {
      return {
        ...item,
        grade: value,
      };
    });
  };

  const handleSelectCharacteristic = (
    index: number,
    i: number,
    value: string
  ) => {
    changeItemValue(index, (item) => {
      return {
        ...item,
        [`characteristic${i}`]: value,
      };
    });
  };

  const handleSelectEngrave = (index: number, i: number, value: string) => {
    changeItemValue(index, (item) => {
      return {
        ...item,
        [`engrave${i}`]: value,
      };
    });
  };

  const handleSelectEngraveMin = (index: number, i: number, value: string) => {
    changeItemValue(index, (item) => {
      return {
        ...item,
        [`engrave${i}min`]: value,
      };
    });
  };

  const handleSelectQuality = (index: number, value: string) => {
    changeItemValue(index, (item) => {
      return {
        ...item,
        quality: value,
      };
    });
  };

  const handleChangeMemo = (index: number, value: string) => {
    changeItemValue(index, (item) => {
      return {
        ...item,
        memo: value,
      };
    });
  };

  const handleChangeMaxPrice = (index: number, value: string) => {
    changeItemValue(index, (item) => {
      return {
        ...item,
        maxPrice: value,
      };
    });
  };

  const syncData = async (items: Item[]) => {
    await ipcRenderer.invoke("setItems", items);
    setNotificationItems(items);
  };

  const save = (index: number) => {
    const item = formik.values[index];

    if (!item.accessory) {
      item.accessory = "전체";
    }

    if (item.engrave1min && !item.engrave1) {
      item.engrave1min = "";
    }

    if (item.engrave2min && !item.engrave2) {
      item.engrave2min = "";
    }

    const items = [...notificationItems];

    const gradeNativeValue = gradeNativeValues.find(
      (x) => x.label === item.grade
    );
    const accessoryNativeValue = accessoryNativeValues.find(
      (x) => x.label === item.accessory
    );
    const characteristic1NativeValue = characteristicNativeValues.find(
      (x) => x.label === item.characteristic1
    );
    const characteristic2NativeValue = characteristicNativeValues.find(
      (x) => x.label === item.characteristic2
    );
    const engrave1NativeValue = engraveNativeValues.find(
      (x) => x.label === item.engrave1
    );
    const engrave2NativeValue = engraveNativeValues.find(
      (x) => x.label === item.engrave2
    );

    const result: Item = {
      ...item,
      status: "save",
      native: {
        grade: gradeNativeValue?.value || "",
        accessory: accessoryNativeValue?.value || "",
        characteristic1: characteristic1NativeValue?.value || "",
        characteristic2: characteristic2NativeValue?.value || "",
        engrave1: engrave1NativeValue?.value || "",
        engrave2: engrave2NativeValue?.value || "",
        quality: item.quality.replace("이상", ""),
      },
    };

    if (item.status === "create") {
      items.push(result);
    } else {
      items[index] = result;
    }

    syncData(items);
  };

  const deleteItem = (index: number) => {
    const items = [...tableData];

    items.splice(index, 1);
    items.pop();

    syncData(items);
  };

  const getCreateItemInitValue = (): Item => ({
    id: performance.now(),
    grade: '유물',
    accessory: "",
    characteristic1: "",
    characteristic2: "",
    engrave1: "",
    engrave2: "",
    engrave1min: "",
    engrave2min: "",
    quality: "",
    memo: "",
    status: "create",
    maxPrice: "",
    native: {
      grade: "5",
      accessory: "",
      characteristic1: "",
      characteristic2: "",
      engrave1: "",
      engrave2: "",
      quality: "",
    },
  });

  const columns = [
    {
      title: "등급",
      dataIndex: "grade",
      key: "grade",
      width: 70,
      render: (_: any, data: any, index: number) => {
        return (
          <Grade
            className={clsx(data.status !== "create" && "noBorder")}
            key={data.id + data.status}
            defaultValue={formik.values[index].grade}
            onSelect={(value) => handleSelectGrade(index, value)}
          />
        );
      },
    },
    {
      title: "장신구",
      dataIndex: "accessory",
      key: "accessory",
      width: 80,
      render: (_: any, data: any, index: number) => {
        return (
          <Accessory
            className={clsx(data.status !== "create" && "noBorder")}
            key={data.id + data.status}
            defaultValue={formik.values[index].accessory}
            onSelect={(value) => handleSelectAccessory(index, value)}
          />
        );
      },
    },
    {
      title: "특성 1",
      key: "characteristic1",
      width: 60,
      render: (_: any, data: any, index: number) => {
        return (
          <Characteristic
            className={clsx(data.status !== "create" && "noBorder")}
            defaultValue={formik.values[index].characteristic1}
            onSelect={(value) => handleSelectCharacteristic(index, 1, value)}
          />
        );
      },
    },
    {
      title: "특성 2",
      key: "characteristic2",
      width: 60,
      render: (_: any, data: any, index: number) => {
        return (
          <Characteristic
            className={clsx(data.status !== "create" && "noBorder")}
            defaultValue={formik.values[index].characteristic2}
            onSelect={(value) => handleSelectCharacteristic(index, 2, value)}
          />
        );
      },
    },
    {
      title: "각인 1",
      key: "engrave1",
      width: 200,
      render: (_: any, data: any, index: number) => {
        return (
          <Space>
            <Engrave
              className={clsx(data.status !== "create" && "noBorder")}
              defaultValue={formik.values[index].engrave1}
              onChange={(value) => {
                if (value === "") {
                  handleSelectEngrave(index, 1, "");
                }
              }}
              onSelect={(value) => handleSelectEngrave(index, 1, value)}
            />
            <InputNumber
              className={clsx(data.status !== "create" && "noBorder")}
              style={{ width: 65 }}
              placeholder="최소"
              value={formik.values[index].engrave1min}
              onChange={(value) => handleSelectEngraveMin(index, 1, value)}
              min="3"
              max="6"
            />
          </Space>
        );
      },
    },
    {
      title: "각인 2",
      key: "engrave2",
      width: 200,
      render: (_: any, data: any, index: number) => {
        return (
          <Space>
            <Engrave
              className={clsx(data.status !== "create" && "noBorder")}
              defaultValue={formik.values[index].engrave2}
              onChange={(value) => {
                if (value === "") {
                  handleSelectEngrave(index, 2, "");
                }
              }}
              onSelect={(value) => handleSelectEngrave(index, 2, value)}
            />
            <InputNumber
              className={clsx(data.status !== "create" && "noBorder")}
              style={{ width: 65 }}
              placeholder="최소"
              value={formik.values[index].engrave2min}
              onChange={(value) => handleSelectEngraveMin(index, 2, value)}
              min="3"
              max="6"
            />
          </Space>
        );
      },
    },
    {
      title: "품질",
      key: "quality",
      width: 70,
      render: (_: any, data: any, index: number) => {
        return (
          <Quality
            className={clsx(data.status !== "create" && "noBorder")}
            defaultValue={formik.values[index].quality}
            onSelect={(value) => handleSelectQuality(index, value)}
          />
        );
      },
    },
    {
      title: "최대가격",
      key: "maxPrice",
      width: 100,
      render: (_: any, data: any, index: number) => {
        return (
          <InputNumber
            className={clsx(data.status !== "create" && "noBorder")}
            style={{ width: 100 }}
            placeholder="최대가격"
            value={formik.values[index].maxPrice}
            onChange={(value) => handleChangeMaxPrice(index, value)}
            formatter={(value) => `${Number(value).toLocaleString()}`}
          />
        );
      },
    },
    {
      title: "메모",
      key: "memo",
      width: 120,
      render: (_: any, data: any, index: number) => {
        return (
          <Input
            className={clsx(data.status !== "create" && "noBorder")}
            defaultValue={formik.values[index].memo}
            onChange={(e) => handleChangeMemo(index, e.target.value)}
            placeholder="메모"
          />
        );
      },
    },
    {
      title: "상태",
      dataIndex: "status",
      key: "status",
      width: 70,
      render: (_: any, data: any, index: number) => {
        const status = formik.values[index].status;

        return (
          <Tag color={statusLabel[status].color}>
            {statusLabel[status].text}
          </Tag>
        );
      },
    },
    {
      title: "기능",
      key: "action",
      fixed: "right",
      width: 100,
      render: (data: any, row: any, index: number) => {
        return (
          <Space size="middle">
            <Button
              onClick={() => save(index)}
              icon={
                <Tooltip title="저장">
                  <CheckOutlined style={{ fontSize: 13 }} />
                </Tooltip>
              }
            />

            <Button
              onClick={() => deleteItem(index)}
              disabled={data.status === "create"}
              type="primary"
              icon={
                <Tooltip title="삭제">
                  <DeleteOutlined />
                </Tooltip>
              }
              danger
            />
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    const items = [...notificationItems, getCreateItemInitValue()];

    formik.setValues(items);
    setTableData(items);
  }, [notificationItems]);

  return (
    <NotificationStyled>
      <Table
        scroll={{ x: 1400 }}
        // @ts-ignore
        columns={columns}
        dataSource={tableData}
        pagination={false}
        rowKey="id"
      />
    </NotificationStyled>
  );
}
