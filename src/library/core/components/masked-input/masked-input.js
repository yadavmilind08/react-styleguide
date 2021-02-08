import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { MaskedTextBox } from "@progress/kendo-react-inputs";
import { EventKeys } from "@util/event-keys";
import "./masked-input.scss";

const maskedInput = ({
  id,
  type,
  name,
  value,
  setValue,
  rawValue,
  defaultValue,
  maxLength,
  placeholder,
  onChange,
  onFocus,
  onBlur,
  prompt,
  mask,
  valid,
  disabled,
  endIcon,
  onEndIconClick,
}) => {
  const [visiblePlaceholder, setVisiblePlaceholder] = useState(true);
  const control = useRef();

  const handleFocus = (event) => {
    setVisiblePlaceholder(false);
    if (onFocus) {
      onFocus(event);
    }
  };

  const handleBlur = (event) => {
    setVisiblePlaceholder(true);
    if (onBlur) {
      onBlur(event);
    }
  };

  const handleKeydown = (event) => {
    if (EventKeys.isDelete(event)) {
      if (setValue) {
        setValue("");
      }
    }
  };

  useEffect(() => {
    control.current.element.addEventListener("keydown", handleKeydown);
    return () => {
      control.current.element.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return (
    <div className={classNames(!value ? "no-value" : "", "masked-text-box")}>
      <MaskedTextBox
        ref={control}
        id={id}
        type={type}
        name={name}
        value={value}
        rawValue={rawValue}
        defaultValue={defaultValue}
        maxLength={maxLength}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        placeholder={visiblePlaceholder ? placeholder : null}
        mask={mask}
        valid={valid}
        prompt={prompt}
        includeLiterals={false}
        maskValidation={false}
      />
      {endIcon ? (
        <span className="input-icon end" onClick={onEndIconClick}>
          {endIcon}
        </span>
      ) : null}
    </div>
  );
};

maskedInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  maxLength: PropTypes.number,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyUp: PropTypes.func,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  mask: PropTypes.string,
};

export { maskedInput as MaskedInput };
