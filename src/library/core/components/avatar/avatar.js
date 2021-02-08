import React from "react";
import { Avatar } from "@progress/kendo-react-layout";
import "./avatar.scss";

export const avatar = () => {
  return (
    <div className="avatar">
      <Avatar shape="circle" type="image">
        <img alt="avatar" src={`${window.IMAGES_PATH}/user.png`} />
      </Avatar>
    </div>
  );
};
