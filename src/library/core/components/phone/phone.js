import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { CountrySelectWithIcon } from "./phone-select";
import { EventKeys } from "@util/event-keys";
import "./phone.scss";

const phone = ({
  name,
  value,
  setValue,
  placeholder,
  onChange,
  onBlur,
  defaultCountry = "US",
  selectedCountry = "",
  disabled,
}) => {
  placeholder = placeholder || "(XXX) XXX-XXXX";
  const [inputValue, setInputValue] = useState(value);
  const [visiblePlaceholder, setVisiblePlaceholder] = useState(true);
  const [visibleDropdown, setVisibleDropdown] = useState(false);
  const control = useRef();

  const handleFocus = (event) => {
    setVisiblePlaceholder(false);
  };

  const handleBlur = (event) => {
    setVisiblePlaceholder(true);
    if (onBlur) {
      onBlur(formatEvent(event, inputValue));
    }
  };

  const formatEvent = (event, value) => {
    return {
      ...event,
      name: name,
      target: {
        ...event.target,
        type: "tel",
        name: name,
        value: value,
      },
      value: value,
    };
  };

  const openDropdown = () => {
    setVisibleDropdown(false);
    setVisibleDropdown(true);
  };

  const clear = () => {
    setInputValue("");
    if (setValue) {
      setValue("");
    }
  };

  const handleKeydown = (event) => {
    if (EventKeys.isDelete(event)) {
      clear();
    } else if (EventKeys.isEnter(event)) {
      openDropdown();
    } else if (EventKeys.isUp(event)) {
      openDropdown();
    } else if (EventKeys.isDown(event)) {
      openDropdown();
    }
  };

  useEffect(() => {
    control.current.addEventListener("keydown", handleKeydown);
    return () => {
      control.current.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div>
      <PhoneInput
        ref={control}
        limitMaxLength
        name={name}
        className={classNames(!inputValue ? "no-value" : "", "phone")}
        placeholder={visiblePlaceholder ? placeholder : null}
        value={inputValue}
        onFocus={handleFocus}
        onChange={setInputValue}
        onBlur={handleBlur}
        flags={flags}
        country={defaultCountry}
        defaultCountry={defaultCountry}
        countrySelectComponent={CountrySelectWithIcon}
        addInternationalOption={false}
        // countryOptionsOrder={['US', 'CA', 'AU', 'IN', '...']}
        disabled={disabled}
        onKeyDown={handleKeydown}
        countrySelectProps={{
          selectedCountry: selectedCountry,
          visibleDropdown: visibleDropdown,
          optionsOrder: ["US", "CA", "AU", "IN"],
        }}
      />
    </div>
  );
};

export { phone as Phone };
