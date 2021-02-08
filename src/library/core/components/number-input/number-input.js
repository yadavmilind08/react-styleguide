import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { Input } from "@core/input";
import { NumberInputValidator } from "./number-input-validator";
import "./number-input.scss";

const numberInput = ({
  id,
  type,
  name,
  value,
  defaultValue,
  maxLength,
  placeholder,
  onChange,
  onFocus,
  onBlur,
  disabled,
  endIcon,
  onEndIconClick,
  format,
}) => {
  const [controlValue, setControlValue] = useState(value);
  const { formatNumber } = useIntl();

  const numberInputValidator = new NumberInputValidator(format);

  placeholder = placeholder || numberInputValidator.placeholder;
  const [visiblePlaceholder, setVisiblePlaceholder] = useState(true);

  const handleChange = (event) => {
    const value = event.target.value;
    const numberValue = numberInputValidator.parseNumber(value);
    setControlValue(numberValue);
    if (onChange) {
      onChange(updateEventValue(event, numberValue));
    }
  };

  const handleFocus = (event) => {
    setVisiblePlaceholder(false);
    if (onFocus) {
      onFocus(event);
    }
  };

  const handleBlur = (event) => {
    setVisiblePlaceholder(true);
    let numberValue = numberInputValidator.parseNumber(event.target.value);
    if (isValue(numberValue) && numberValue != "") {
      numberValue = numberInputValidator.formatNumber(
        numberValue,
        formatNumber
      );
      setControlValue(numberValue);

      if (onBlur) {
        onBlur(updateEventValue(event, numberValue));
      }
    } else {
      if (onBlur) {
        onBlur(event);
      }
    }
  };

  const updateEventValue = (event, value) => {
    return {
      ...event,
      target: {
        ...event.target,
        value: value,
        name: name,
      },
      value: value,
    };
  };

  const isValue = (value) => {
    return value != null && value != undefined;
  };

  useEffect(() => {
    setControlValue(value);
  }, [value]);

  useEffect(() => {
    if (isValue(value) && value != "")
      setControlValue(numberInputValidator.formatNumber(value, formatNumber));
  }, []);

  return (
    <div className="number-text-box">
      <Input
        id={id}
        type={type}
        name={name}
        value={controlValue}
        defaultValue={defaultValue}
        maxLength={maxLength}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        placeholder={visiblePlaceholder ? placeholder : ""}
        endIcon={endIcon}
        onEndIconClick={onEndIconClick}
      />
    </div>
  );
};

numberInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  maxLength: PropTypes.number,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyUp: PropTypes.func,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  format: PropTypes.string,
};

export { numberInput as NumberInput };
