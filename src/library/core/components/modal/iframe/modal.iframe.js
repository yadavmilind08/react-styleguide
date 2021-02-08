import React from "react";
import classNames from "classnames";
import { info } from "../modal";
import "./modal.iframe.scss";

export const iframe = ({ src, newTab, width, height, onClose, ...props }) => {
  width = width || 800;
  height = height || 600;
  const windowProperties = `toolbar=no,scrollbars=yes,resizable=yes,top=200,left=300,width=${width},height=${height}`;

  src = src.split("#")[0];
  console.log(src);
  var newwindow = newTab
    ? window.open(src, "_blank")
    : window.open(src, "_blank", windowProperties);

  newwindow.focus();

  if (onClose) {
    const checkIfWindowClosed = setInterval(() => {
      if (newwindow && newwindow.closed) {
        clearInterval(checkIfWindowClosed);
        if (onClose) {
          onClose(event);
        }
      }
    }, 1000);
  }

  return newwindow;
};
