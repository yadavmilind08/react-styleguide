import React from "react";
import "./collapse-panel.scss";

const collapsePanel = ({ title, icon, style, height }) => {
  style = style || {};
  if (height) {
    style.height = height;
  }
  return (
    <div className="collapse-panel">
      <div className="content" style={style}>
        <span className="icon">{icon}</span>
        <div className="divider"></div>
        <span className="title">{title}</span>
      </div>
    </div>
  );
};

export { collapsePanel as CollapsePanel };
