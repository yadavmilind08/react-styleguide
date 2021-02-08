import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { faAlert } from "@core/font-awesome-icon/fa-alert";
// import { CaretRightOutlined } from '@ant-design/icons';
import { Modal } from "antd";
import { modalDefaultPros } from "../modal.default-props";

export const confirm = ({ ...props }) => {
  props = modalDefaultPros(props);

  const cancelButtonProps = props.cancelButtonProps || {};
  cancelButtonProps.icon = <FontAwesomeIcon size={"lg"} icon={faTimes} />;
  cancelButtonProps.className = "ant-btn btn secondary";

  return Modal.confirm({
    okText: "Yes",
    cancelText: "No",
    icon: (
      <span className="anticon">
        <FontAwesomeIcon icon={faAlert} />
      </span>
    ),
    cancelButtonProps: cancelButtonProps,
    ...props,
  });
};
