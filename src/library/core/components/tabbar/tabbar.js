import React, { useState } from "react";
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";
import "@progress/kendo-react-intl";
import PropTypes from "prop-types";
import { PatientInformationStore } from "@modules/patient/information";
import "./tabbar.scss";

export const Tabbar = ({ children }) => {
  const [selected, setSelected] = useState(0);

  const handleSelect = (e) => {
    setSelected(e.selected);
    PatientInformationStore.setSelectedTabIndex(e.selected);
  };

  return (
    <React.Fragment>
      <TabStrip
        selected={selected}
        keepTabsMounted={true}
        onSelect={handleSelect}
      >
        {children.map((child) => {
          const { label } = child.props;
          return (
            <TabStripTab key={label} title={label}>
              {child.props.children}
            </TabStripTab>
          );
        })}
      </TabStrip>
    </React.Fragment>
  );
};

Tabbar.propTypes = {
  children: PropTypes.instanceOf(Array),
};
