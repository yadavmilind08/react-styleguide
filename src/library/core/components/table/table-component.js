import React from "react";
import classNames from "classnames";
import { Table } from "antd";
import { Pagination } from "@util/pagination";

const tableComponent = ({
  title,
  tableLayout,
  columns,
  dataSource,
  loading,
  pagination,
  scroll,
  bordered,
  expandable,
  rowSelection,
  rowClassName,
  onChange,
  showHeader,
  size,
  summary,
  footer,
  onHeaderRow,
  onHeaderCell,
  onRow,
  sortDirections,
  showSorterTooltip,
  cssClasses,
  height,
  rowKey,
  width,
  components,
  maxHeight,
  // maxHeight = 'calc(100vh - 150px)',
}) => {
  pagination = {
    position: ["none", "bottomCenter"],
    current: pagination == undefined ? 1 : pagination.page,
    showSizeChanger: false,
    hideOnSinglePage: true,
    simple: true,
    ...pagination,
  };
  scroll = scroll || {};
  scroll.y = scroll.y || maxHeight;
  rowSelection = rowSelection
    ? {
        ...rowSelection,
        columnTitle:
          rowSelection.type == "radio"
            ? rowSelection.columnTitle || "Select"
            : rowSelection.columnTitle,
        columnWidth: rowSelection.columnWidth || "5em",
      }
    : rowSelection;
  cssClasses = classNames(
    !dataSource || !dataSource.length ? `empty` : "",
    {
      "no-pagination":
        dataSource &&
        dataSource.length < pagination.pageSize &&
        pagination.page === 1,
    },
    bordered ? `bordered` : ""
  );
  return (
    <div className="table">
      <Table
        title={title}
        tableLayout={tableLayout}
        pagination={pagination}
        components={components}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        scroll={scroll}
        expandable={expandable}
        showHeader={showHeader}
        size={size}
        summary={summary}
        footer={footer}
        rowSelection={rowSelection}
        rowClassName={rowClassName}
        onChange={onChange}
        onHeaderRow={onHeaderRow}
        onHeaderCell={onHeaderCell}
        onRow={onRow}
        sortDirections={sortDirections}
        showSorterTooltip={showSorterTooltip}
        className={cssClasses}
        style={{ height: height, width: width }}
        rowKey={rowKey}
        locale={{ emptyText: "No matching results found" }}
        footer={() => {
          if (pagination.hidePagination) {
            return null;
          } else {
            return (
              <div className="pagination-total-text">
                {Pagination.getTotalText(dataSource, pagination)}
              </div>
            );
          }
        }}
      />
    </div>
  );
};

export { tableComponent as TableComponent };
