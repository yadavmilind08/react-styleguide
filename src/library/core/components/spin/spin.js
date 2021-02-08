import React from "react";
import { Spin } from "antd";

const spin = ({ spinning, size, delay, tip, children }) => {
  return (
    <Spin spinning={spinning} size={size} delay={delay} tip={tip}>
      {children}
    </Spin>
  );
};

export { spin as Spin };
