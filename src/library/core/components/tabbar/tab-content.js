import React from "react";
import classNames from "classnames";
import { ScrollBar } from "@core/scrollbar";

const tabContent = ({ maxHeight, className, padding, children }) => {
  className = classNames(className, "tab-content", padding ? `padding` : "");
  const content = <div className={className}>{children}</div>;
  return maxHeight ? (
    <ScrollBar autoHeightMax={maxHeight}>{content}</ScrollBar>
  ) : (
    content
  );
};

export { tabContent as TabContent };
