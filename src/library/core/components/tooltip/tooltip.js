import React from "react";
import { Tooltip } from "antd";

export const tooltip = ({ placement, title, arrowPointAtCenter, children }) => {
  return (
    <Tooltip
      placement={placement}
      title={title}
      arrowPointAtCenter={arrowPointAtCenter}
    >
      {children}
    </Tooltip>
  );
};
