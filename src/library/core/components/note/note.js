import React from "react";
import classNames from "classnames";
import "./note.scss";

const note = ({ className, style, children }) => {
  return (
    <div className={classNames("note", className)} style={style}>
      <div className="content">{children}</div>
    </div>
  );
};

export { note as Note };
