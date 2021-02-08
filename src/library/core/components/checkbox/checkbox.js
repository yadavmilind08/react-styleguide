import React from "react";
import { Checkbox } from "antd";
import "./checkbox.scss";

export const checkbox = ({
  name,
  value,
  onChange,
  onBlur,
  label,
  className,
  defaultChecked,
  disabled,
}) => {
  return (
    <div className="checkbox">
      <Checkbox
        id={name}
        name={name}
        checked={value}
        indeterminate={value}
        onChange={onChange}
        onBlur={onBlur}
        label={label}
        className={className}
        defaultChecked={defaultChecked}
        disabled={disabled}
      />
      <span className="label">{label}</span>
    </div>
  );
};
