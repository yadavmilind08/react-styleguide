import React, { useState, useEffect, useRef } from "react";
import { EventKeys } from "@util/event-keys";
import "./textarea.scss";

export const textarea = ({
  name,
  value,
  rows,
  placeholder,
  setValue,
  onChange,
  onFocus,
  onBlur,
  disabled,
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
    control.current.addEventListener("keydown", handleKeydown);
    return () => {
      control.current.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return (
    <div className="textarea" ref={control}>
      {disabled ? (
        <textarea
          name={name}
          value={value}
          rows={rows}
          placeholder={visiblePlaceholder ? placeholder : ""}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled
        />
      ) : (
        <textarea
          name={name}
          value={value}
          rows={rows}
          placeholder={visiblePlaceholder ? placeholder : ""}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      )}
    </div>
  );
};
