import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { DatePicker } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@core/input";
import { EventKeys } from "@util/event-keys";
import {
  YYYYMMDDHHmmssFormat,
  dddMMMDDYYYYHHmmssGMTZZ,
  format,
  formatYearToCentury,
} from "./date-picker.validator";
import "./date-picker.scss";
import moment from "moment";

export const datePicker = ({
  name,
  onChange,
  value,
  setValue,
  onFocus,
  onBlur,
  className,
  disabled,
  autoFocus,
  dateOnly = true,
}) => {
  const [visiblePlaceholder, setVisiblePlaceholder] = useState(true);
  const [visibleDatePicker, setVisibleDatePicker] = useState(false);
  const [inputValue, setInputValue] = useState();
  const controlContainer = useRef();

  const handleChange = (event) => {
    setInputValue(event.target.value);
    // handleValueChange(formatEvent(event, event.target.value));
  };

  const handleBlur = (event) => {
    validate(event);
    const value = event.target.value;
    const parsedDate = parseDate(value);
    let newValue = parsedDate ? parsedDate : !value ? null : value;
    if (dateOnly && newValue) {
      newValue = newValue.format(YYYYMMDDHHmmssFormat);
    }
    if (setValue) {
      setValue(newValue);
    }
    setVisiblePlaceholder(true);
    setVisibleDatePicker(false);
    if (onBlur) {
      onBlur(formatEvent(event, newValue));
    }
  };

  const handleFocus = (event) => {
    setVisiblePlaceholder(true);
    //setVisibleDatePicker(true);
    if (onFocus) {
      onFocus(event);
    }
  };

  const handleKeyDown = (event) => {
    if (EventKeys.isDelete(event)) {
      clearValue(event);
    }
    if (EventKeys.isTab(event)) {
      validate(event);
    } else if (EventKeys.isEnter(event)) {
      validate(event);
    }
  };

  const clearValue = (event) => {
    setVisiblePlaceholder(true);
    setInputValue("");
    if (setValue) {
      setValue(null);
    }
    if (event) {
      handleValueChange(formatEvent(event, null));
    }
  };

  const validate = (event) => {
    let value = formatYearToCentury(event.target.value);
    const parsedDate = parseDate(value);
    const newValue = parsedDate ? parsedDate : !value ? null : value;
    if (setValue) {
      setValue(newValue);
    }
    handleValueChange(formatEvent(event, newValue));
  };

  const handleValueChange = (event) => {
    if (onChange) {
      onChange(event);
    }
  };

  const formatEvent = (event, value) => {
    return {
      ...event,
      name: name,
      target: {
        ...event.target,
        name: name,
        item: event.target.value,
        value: value,
      },
      value: value,
    };
  };

  const handleEndIconClick = () => {
    if (visibleDatePicker) {
      setVisibleDatePicker(false);
    } else {
      setVisibleDatePicker(true);
    }
  };

  const handleDatePickerChange = (date, dateString) => {
    const _date =
      date && dateOnly
        ? moment(dateString, format, true).format(YYYYMMDDHHmmssFormat)
        : date;
    if (onChange) {
      onChange({
        target: {
          value: _date,
          name: name,
        },
      });
    }
  };

  const handleDatePickerOpenChange = (open) => {
    setVisibleDatePicker(open);
  };

  const parseDate = (value) => {
    if (value) {
      const date = moment(value, format, true);
      if (date.isValid()) {
        return date;
      }
    }
    return null;
  };

  const formatDate = (value) => {
    const momentDate = parseMoment(value);
    return momentDate ? momentDate.format(format[0]) : null;
  };

  const parseMoment = (value) => {
    return typeof value == "string" &&
      moment(value, YYYYMMDDHHmmssFormat, true).isValid()
      ? moment(value, format)
      : value && (moment.isMoment(value) || moment.isDate(value))
      ? moment(value, format)
      : null;
  };

  const isDate = (value) => {
    return value && (moment.isMoment(value) || moment.isDate(value));
  };

  const datePickerValue = () => {
    return parseMoment(value);
  };

  const isValiddddMMMDDYYYYHHmmssGMTZZDate = () => {
    return moment(value, dddMMMDDYYYYHHmmssGMTZZ, true).isValid();
  };

  useEffect(() => {
    if (value) {
      let updatedValue = value;
      if (isValiddddMMMDDYYYYHHmmssGMTZZDate(value)) {
        updatedValue = moment(value, format, true).format(YYYYMMDDHHmmssFormat);
        if (onChange) {
          onChange({
            target: {
              value: updatedValue,
              name: name,
            },
          });
        }
      }
      const formattedDate = formatDate(updatedValue);
      if (formattedDate) {
        setInputValue(formattedDate);
      } else {
        setInputValue(updatedValue);
      }
    } else {
      if (value === null) {
        clearValue();
      }
    }
  }, [value]);

  return (
    <span
      ref={controlContainer}
      className={classNames(
        "date-picker",
        { invalid: !moment(value, format).isValid() },
        className
      )}
    >
      {/* Uncomment to test */}
      {/* {JSON.stringify(value)} */}
      <Input
        className="date-picker-input"
        value={inputValue}
        onFocus={handleFocus}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder={visiblePlaceholder ? format[0] : ""}
        endIcon={<FontAwesomeIcon icon={faCalendarAlt}></FontAwesomeIcon>}
        onEndIconClick={handleEndIconClick}
        disabled={disabled}
        autoFocus={autoFocus}
      />
      <DatePicker
        format={format}
        open={visibleDatePicker}
        name={name}
        value={datePickerValue()}
        onChange={handleDatePickerChange}
        onOpenChange={handleDatePickerOpenChange}
        inputReadOnly={disabled}
        disabled={disabled}
        showToday={false}
        //getPopupContainer={trigger => trigger.parentElement}
      />
    </span>
  );
};
