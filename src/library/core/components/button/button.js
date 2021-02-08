import React, { useEffect, useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { ButtonAction } from "./button.model";
import { ButtonService } from "@shared/services/button-service";
import { Button } from "antd";
import "./button.scss";

export const button = ({
  type,
  disabled,
  startIcon,
  endIcon,
  children,
  onClick,
  action,
  loading,
  size,
  danger,
  href,
  style,
  tabIndex,
  command,
  cssClasses,
}) => {
  const [authDisabled, setAuthDisabled] = useState(false);

  useEffect(() => {
    setAuthDisabled(false);
    if (command != undefined) {
      getAuth(command);
    }
  }, []);

  const getAuth = async (command) => {
    const buttonservice = new ButtonService();
    try {
      const authCode = await buttonservice.get(command);
      setAuthDisabled(!authCode);
    } catch (exception) {
      console.error(exception);
    }
  };
  action = action || ButtonAction.Button;
  return (
    <span>
      <Button
        tabIndex={tabIndex}
        htmlType={action}
        className={classNames("btn", type, cssClasses)}
        size={size}
        loading={loading}
        danger={danger}
        disabled={authDisabled ? authDisabled : disabled}
        href={href}
        onClick={onClick}
        style={style}
      >
        {startIcon ? <span className="btn-icon start">{startIcon}</span> : null}
        {children}
        {endIcon ? <span className="btn-icon end">{endIcon}</span> : null}
      </Button>
    </span>
  );
};

button.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onClick: PropTypes.func,
};
