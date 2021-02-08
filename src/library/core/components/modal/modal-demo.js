import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "@core/modal1";
import { Button } from "@core/button";

export const modalDemo = () => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = (e) => {
    setVisible(false);
  };

  const handleCancel = (e) => {
    setVisible(false);
  };

  return (
    <div className="modal-demo">
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title={
          <span className="title">
            <FontAwesomeIcon icon={faPlus} />
            &nbsp;Modal
          </span>
        }
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        closable
        footer={[
          <span key="submit" style={{ float: "left" }}>
            <Button type="primary" onClick={handleOk}>
              Submit
            </Button>
          </span>,
          <Button key="back" type="secondary" onClick={handleCancel}>
            Return
          </Button>,
        ]}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};

export { modalDemo as ModalDemo };
