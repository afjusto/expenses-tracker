import React from "react";
import { notification } from "antd";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";

export const openSuccessNotification = (message: string) => {
  notification.success({
    icon: <CheckCircleFilled style={{ color: "#52c41a" }} />,
    message,
    placement: "bottomRight",
    style: {
      backgroundColor: "#f6ffed",
      border: "1px solid #b7eb8f",
    },
  });
};

export const openErrorNotification = (message: string) => {
  notification.error({
    icon: <CloseCircleFilled style={{ color: "#ff4d4f" }} />,
    message,
    placement: "bottomRight",
    style: {
      backgroundColor: "#fff2f0",
      border: "1px solid #ffccc7",
    },
  });
};
