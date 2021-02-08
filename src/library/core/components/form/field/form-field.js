import React, { cloneElement, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form/dist/index.ie11";
import classNames from "classnames";
import { Label } from "@core/label";
import { FormFieldHandlers } from "./form-field.handlers";
import { FormFieldError } from "./form-field-error";
import { formFieldExcludeWatchComponents } from "./form-field.watch.config";
import "./form-field.scss";

const formField = ({
  name,
  className,
  label,
  endLabel,
  required,
  children,
  onChange,
  onBlur,
  ...props
}) => {
  const formContext = useFormContext();
  const formFieldHandlers = new FormFieldHandlers(children.props);
  const [touched, setTouched] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const properties = {};

  const setDataProps = () => {
    if (!children.props.data) {
      properties.data = formFieldHandlers.getValues(name);
    }
  };

  setDataProps();

  const isDirty = (value) => {
    return value != null || value != undefined || value != "";
  };

  const reRender = (e) => {
    const isValueChanged = formContext.getValues(name) != e.target.value;
    if (!formContext.errors[name] && !watchField()) {
      formContext.unregister(name);
      formContext.register({ name: name });
      return true;
    }
    return false;
  };

  const watchField = () => {
    return !formFieldExcludeWatchComponents.includes(
      children.props.displayName
    );
  };

  const registerOnChange = () => {
    const existingOnChange = children.props.onChange;
    properties.onChange = (e) => {
      if (!touched) {
        setTouched(true);
      }
      if (existingOnChange) {
        existingOnChange(e);
      }

      const value =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;

      if (!inputValue && !value) {
        return;
      } else if (inputValue !== value) {
        setFormContextValue(value);
      }
    };
  };

  const registerOnBlur = () => {
    const existingOnBlur = children.props.onBlur;
    properties.onBlur = (e) => {
      if (!touched) {
        setTouched(true);
      }
      if (existingOnBlur) {
        existingOnBlur(e);
      }

      const type = e.target.type;
      const value = type === "checkbox" ? e.target.checked : e.target.value;

      formFieldHandlers.setValues(name, value);
      setDataProps();

      if (required || type === "tel") {
        setFormContextValue(value);
      }
    };
  };

  const setFormContextValue = (value) => {
    setInputValue(value);
    formContext.setValue(name, value, {
      shouldValidate: true,
      shouldDirty: typeof value === "boolean" ? value : isDirty(value),
    });
  };

  registerOnChange();
  registerOnBlur();

  props.name = name;
  props.value = inputValue;
  props.setValue = (value) => {
    formContext.setValue(name, value);
  };
  props.form = formContext;
  props.register = formContext.register;

  if (watchField()) {
    props.watch = formContext.watch(name);
  }

  children = cloneElement(children, {
    ...props,
    ...children.props,
    ...properties,
  });

  useEffect(() => {
    formContext.register({ name: name });
  }, [formContext.register]);

  useEffect(() => {
    setInputValue(formContext.getValues(name));
  }, [formContext.getValues(name)]);

  return (
    <div
      name={name}
      className={classNames(
        "form-field" + (touched && formContext.errors[name] ? " invalid" : ""),
        className
      )}
    >
      {!endLabel ? (
        <RenderLabel name={name} label={label} required={required} />
      ) : null}
      {/* <pre>{children.type.name}</pre> */}
      <div className="form-control">
        <div className="form-input">{renderChildren(children)}</div>
      </div>
      <FormFieldError key={name} name={name} error={formContext.errors[name]} />
    </div>
  );
};

const RenderLabel = ({ name, label, required }) => {
  return (
    <div className="form-label">
      <Label htmlFor={name} title={label} required={required} />
    </div>
  );
};

const renderChildren = (children) => {
  return children ? (
    typeof children === "function" ? (
      children(children.props)
    ) : Array.isArray(children) ? (
      children.map((child, index) => {
        return renderChild(child, index);
      })
    ) : (
      renderChild(children)
    )
  ) : (
    <input type="text" {...props.field} placeholder={props.title} />
  );
};

const renderChild = (child, key) => {
  return <React.Fragment key={key}>{child}</React.Fragment>;
};

export { formField as FormField };
