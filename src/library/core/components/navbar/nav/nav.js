import React from "react";
import PropTypes from "prop-types";
import Tab from "@material-ui/core/Tab";

const nav = ({ activeTab, label }) => {
  let className = "tab-list-item";

  if (activeTab === label) {
    className += " tab-list-active";
  }

  return <Tab label={label} />;
};

nav.propTypes = {
  activeTab: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default nav;
