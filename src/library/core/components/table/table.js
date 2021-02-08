import React, { useState, useEffect } from "react";
import { getHtmlDocumentFontSize, parseNumberFromCssValue } from "@util/css";
import { ScrollBar } from "@core/scrollbar";
import {
  resizeTableColumns,
  resizeTableComponents,
} from "./table.resize-columns";
import { TableComponent } from "./table-component";
import { TableDragColumn } from "./table.drag-columns";
import "./table.scss";

const table = ({
  columns,
  dataSource,
  components,
  dragColumns = true,
  resizeColumns = true,
  defaultColumnWidth = "6em",
  rowSelection,
  height,
  scroll,
  emptyPlaceholderHeight = "8.5em",
  maxHeight = "calc(100vh - 150px)",
  ...props
}) => {
  const [tableColumns, setTableColumns] = useState(columns);
  scroll = scroll || {};
  scroll.y = scroll.y || emptyPlaceholderHeight;

  const handleResizeColumns = () => {
    const htmlDocumentFontSize = getHtmlDocumentFontSize();
    // 1.2 is the table font-size
    const fontSize = parseNumberFromCssValue(htmlDocumentFontSize) * 1.2;
    columns = resizeTableColumns(
      columns,
      tableColumns,
      setTableColumns,
      defaultColumnWidth,
      fontSize
    );
    components = resizeTableComponents(components, fontSize);
  };

  if (resizeColumns) {
    handleResizeColumns();
  }

  /*
    components.table = tableProps => {
        const children = tableProps.children;
        const height = scroll.y;
        return (
            <ScrollBar
                autoHeightMax={height}
                autoHide={!dataSource || !dataSource.length}
            >
                <table {...tableProps}>{children}</table>
            </ScrollBar>
        );
    };
    */

  const selection = rowSelection && rowSelection.type ? true : false;

  useEffect(() => {
    setTableColumns(columns);
  }, []);

  const table = (
    <TableComponent
      {...props}
      dataSource={dataSource}
      columns={tableColumns}
      components={components}
      rowSelection={rowSelection}
      height={height}
      scroll={scroll}
    />
  );

  return (
    <div className="table-wrapper">
      {dragColumns ? (
        <TableDragColumn
          columns={tableColumns}
          setColumns={setTableColumns}
          selection={selection}
        >
          {table}
        </TableDragColumn>
      ) : (
        <React.Fragment>{table}</React.Fragment>
      )}
    </div>
  );
};

export { table as Table };
