import React from "react";
import { Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import "./collapse.scss";

const { Panel } = Collapse;

export const collapse = ({ children, onChange }) => {
  return (
    <div className="collapse">
      <Collapse
        expandIconPosition="right"
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        onChange={onChange}
      >
        <Panel forceRender={true} header="Referral" key="1">
          {children}
        </Panel>
      </Collapse>
    </div>
  );
};
