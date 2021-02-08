import React from "react";
import classNames from "classnames";
import "./form-section-header.scss";

const formSectionHeader = ({ cssClasses, style, padding, children }) => {
  return (
    <div
      className={classNames(
        "form-section-header",
        padding ? `padding` : "",
        cssClasses
      )}
      style={style}
    >
      {children}
    </div>
  );
};

const formSectionHeaderTitle = ({
  startIcon,
  endIcon,
  cssClasses,
  style,
  children,
}) => {
  return (
    <div className={classNames("title", cssClasses)} style={style}>
      {startIcon ? <span className="icon start">{startIcon}</span> : null}
      <span className="text">{children}</span>
      {endIcon ? <span className="icon end">{endIcon}</span> : null}
    </div>
  );
};

export {
  formSectionHeader as FormSectionHeader,
  formSectionHeaderTitle as FormSectionHeaderTitle,
};
