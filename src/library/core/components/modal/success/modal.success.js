import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "antd";
import { faAlert } from "@core/font-awesome-icon/fa-alert";
import { modalDefaultPros } from "../modal.default-props";

export const warning = ({ ...props }) => {
  props = modalDefaultPros(props);

  return Modal.warning({
    icon: (
      <span className="anticon">
        <FontAwesomeIcon icon={faAlert} />
      </span>
    ),
    ...props,
  });
};
