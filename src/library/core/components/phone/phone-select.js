import React, { useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { DropDown, OldDropDown } from "@core/dropdown";

export default function CountrySelect({
  value,
  onChange,
  options,
  visibleDropdown,
  ...rest
}) {
  const handleChange = useCallback(
    (event) => {
      const value = event.target.value;
      if (value) {
        onChange(value);
      }
    },
    [onChange]
  );

  return (
    <React.Fragment>
      <DropDown
        {...rest}
        value={value}
        textField="label"
        valueField="value"
        data={options}
        onChange={handleChange}
        filterable={true}
        visibleFilterInput={true}
        visibleDropdown={visibleDropdown}
        tabIndex={-1}
      />
    </React.Fragment>
  );
}

CountrySelect.propTypes = {
  /**
   * A two-letter country code.
   * Example: "US", "RU", etc.
   */
  value: PropTypes.string,

  /**
   * Updates the `value`.
   */
  onChange: PropTypes.func.isRequired,

  // `<select/>` options.
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
      divider: PropTypes.bool,
    })
  ).isRequired,
};

let countries = null;

export function CountrySelectWithIcon({
  value,
  options,
  className,
  iconComponent: Icon,
  getIconAspectRatio,
  arrowComponent: Arrow,
  unicodeFlags,
  selectedCountry,
  visibleDropdown,
  optionsOrder,
  ...rest
}) {
  const defaultCountry = "US";
  options = options || [];

  let selectedOption = useMemo(() => {
    // Start
    // keep this as some phone number does showing valid
    // ex. +1 785 456 5456 - does work
    // but +1 456 456 5456 - does not work
    if (selectedCountry) {
      value = selectedCountry;
    }
    if (!value) {
      value = defaultCountry;
    }
    // End
    return options.find((x) => x.value == value);
  }, [options, value, selectedCountry]);

  const getUpdateOptions = () => {
    optionsOrder = optionsOrder || [];
    countries = [
      ...optionsOrder.map((y) => options.find((x) => x.value == y)),
      ...options.filter((x) => !optionsOrder.find((y) => x.value == y)),
    ];
    return countries;
  };

  const setDefaults = () => {
    value = value || defaultCountry;
    selectedOption = selectedOption || options.find((x) => x.value == value);
    options = countries || getUpdateOptions();
  };

  setDefaults();

  return (
    <div className="PhoneInputCountry">
      <CountrySelect
        {...rest}
        value={value}
        options={options}
        visibleDropdown={visibleDropdown}
        className={classNames("PhoneInputCountrySelect", className)}
      />

      {/* Or an SVG flag icon. */}
      {!(unicodeFlags && value) && (
        <Icon
          country={value}
          label={selectedOption && selectedOption.label}
          aspectRatio={unicodeFlags ? 1 : undefined}
        />
      )}
    </div>
  );
}

CountrySelectWithIcon.propTypes = {
  // Country flag component.
  iconComponent: PropTypes.elementType,

  // Select arrow component.
  arrowComponent: PropTypes.elementType.isRequired,

  // Set to `true` to render Unicode flag icons instead of SVG images.
  unicodeFlags: PropTypes.bool,
};

CountrySelectWithIcon.defaultProps = {
  // Is "International" icon square?
  arrowComponent: () => <div className="PhoneInputCountrySelectArrow" />,
};
