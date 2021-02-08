import React from "react";
import Drawer from "@material-ui/core/Drawer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { CrmContext } from "@modules/shared/crm-context-urlConstant";
import "./side-drawer.scss";

export const sideDrawer = ({ isSideDrawerOpen, toggleDrawer }) => {
  return (
    <div className="side-drawer">
      <Drawer
        anchor="right"
        open={isSideDrawerOpen}
        onClose={toggleDrawer(false)}
      >
        <div className="drawer-header">
          <span className="close" onClick={toggleDrawer(false)}>
            <img
              alt="avatar"
              // src="/images/close.png"
              src={`${window.IMAGES_PATH}/close.png`}
            />
          </span>
        </div>
        <div>
          <a href={CrmContext.urls.crm_main}>
            <div
              style={{
                color: "black",
                margin: "2em",
                "font-size": "18px",
              }}
            >
              <span style={{ "margin-right": "1em" }}>
                <img
                  className="forward-to"
                  alt="avatar"
                  // src="/images/forward.png"
                  src={`${window.IMAGES_PATH}/forward.png`}
                />
              </span>
              <span className="text">Return to iClaims Classic</span>
            </div>
          </a>
        </div>
      </Drawer>
    </div>
  );
};
