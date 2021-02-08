import React, { Fragment } from "react";
import classNames from "classnames";
import { Modal } from "antd";
import {
  DraggableModal,
  DraggableModalProvider,
} from "ant-design-draggable-modal";
import { emToPxValue } from "@util/css";
import { ModelSize } from "./modal.model";
import "./modal-draggable.scss";
import "./modal.scss";

const modal = ({
  title,
  visible,
  okText,
  cancelText,
  style,
  centered,
  size = ModelSize.Large,
  className,
  onOk,
  onCancel,
  footer,
  okButtonProps,
  cancelButtonProps,
  closable,
  maskClosable,
  closeIcon,
  zIndex,
  bodyStyle,
  confirmLoading,
  children,
  initialWidth,
  initialHeight = 600,
}) => {
  initialWidth = initialWidth || size;
  initialWidth = emToPxValue(initialWidth);
  style = style || {};
  style = {
    top: 60,
    ...style,
  };

  maskClosable = maskClosable == undefined ? false : maskClosable;
  return (
    <Fragment>
      {visible && (
        // <DraggableModalProvider>
        <Modal
          title={title}
          visible={visible}
          onOk={onOk}
          onCancel={onCancel}
          centered={centered}
          okText={okText}
          cancelText={cancelText}
          okButtonProps={okButtonProps}
          cancelButtonProps={cancelButtonProps}
          closable={closable}
          closeIcon={closeIcon}
          width={initialWidth}
          initialWidth={initialWidth}
          initialHeight={initialHeight}
          zIndex={zIndex}
          bodyStyle={bodyStyle}
          onfirmLoading={confirmLoading}
          footer={footer}
          className={classNames(className, size)}
          // mask={true} // !maskClosable
          maskClosable={maskClosable}
          style={style}
        >
          {children}
        </Modal>
        // </DraggableModalProvider>
      )}
    </Fragment>
  );
};

export { modal as Modal };

export const { info, error, warn } = Modal;
