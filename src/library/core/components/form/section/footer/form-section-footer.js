import React from "react";
import classNames from "classnames";
import "./form-section-footer.scss";

const formSectionFooter = ({ align, cssClasses, style, id, children }) => {
  return (
    <div
      className={classNames("form-section-footer", cssClasses)}
      style={style}
      id={id}
    >
      {children}
    </div>
  );
};

export { formSectionFooter as FormSectionFooter };
