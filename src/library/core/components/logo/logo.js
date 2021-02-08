import React from "react";
import "./logo.scss";

export const logo = (height) => (
  <div className="logo">
    <a href={`/${window.location.pathname.split("/")[1]}/main.aspx`}>
      <div className="logo-img" style={{ height: height }}>
        <img src={`${window.IMAGES_PATH}/logo.png`} alt="Logo" />
      </div>
    </a>
  </div>
);
