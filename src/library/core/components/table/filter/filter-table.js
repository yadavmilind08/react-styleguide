import React from "react";
import "./filter-table.scss";

const filterTable = ({ children }) => {
  return (
    <div className="filter-table">
      <div className="filter-table-content">{children}</div>
    </div>
  );
};

const filterTableHeader = ({ children }) => {
  return <div className="filter-table-header">{children}</div>;
};

const filterTableBody = ({ children }) => {
  return <div className="filter-table-body">{children}</div>;
};

export {
  filterTable as FilterTable,
  filterTableHeader as FilterTableHeader,
  filterTableBody as FilterTableBody,
};
