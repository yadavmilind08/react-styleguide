import React from "react";
import classNames from "classnames";
import { RadioButton } from "@progress/kendo-react-inputs";
import "./radio.scss";

const radio = ({ name, value, className, label, onChange, bold, checked }) => {
  return (
    <div className={classNames("radio", { bold: bold })}>
      <RadioButton
        name={name}
        value={value}
        className={className}
        label={label}
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
};

export { radio as Radio };
