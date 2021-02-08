import React, { useState, useImperativeHandle } from "react";
import { Splitter } from "@progress/kendo-react-layout";
import "./splitter-drawer.scss";

export const SplitterDrawer = React.forwardRef(
  (
    { size, panes, onChange, collapsible, resizable, keepMounted, children },
    ref
  ) => {
    useImperativeHandle(ref, () => ({
      change() {
        onChange();
        return state;
      },
    }));

    return (
      <div className="splitter">
        <Splitter panes={panes} onChange={onChange}>
          {children}
        </Splitter>
      </div>
    );
  }
);
