import React from "react";

const formAction = ({ children, props }) => {
  return (
    <div className="form-action">
      <div className="form-control">{children}</div>
    </div>
  );
};

export { formAction as FormAction };
