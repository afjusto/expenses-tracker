import React from "react";
import { notification } from "antd";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";

export const openSuccessNotification = (message: string) => {
  notification.success({
    icon: <CheckCircleFilled style={{ color: "var(--color-success)" }} />,
    message,
    placement: "bottomRight",
    style: {
      backgroundColor: "var(--color-mint)",
      border: "1px solid var(--color-light-green)",
    },
  });
};

export const openErrorNotification = (message: string) => {
  notification.error({
    icon: <CloseCircleFilled style={{ color: "var(--color-error)" }} />,
    message,
    placement: "bottomRight",
    style: {
      backgroundColor: "var(--color-light-pink)",
      border: "1px solid var(--color-lively-light-pink)",
    },
  });
};
