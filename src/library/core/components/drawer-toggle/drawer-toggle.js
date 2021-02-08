import React from "react";
import "./drawer-toggle.scss";

export const drawerToggle = ({ toggleDrawer }) => (
  <div className="drawer-toggle" onClick={toggleDrawer(true)}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);
