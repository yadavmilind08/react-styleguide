import React from "react";
import classNames from "classnames";
import { Resizable } from "react-resizable";
import { parseNumberFromCssValue } from "@util/css";

const ResizeableTitle = (props) => {
  const { onResize, width, ...restProps } = props;
  if (!width) {
    return <th {...restProps} />;
  }

  restProps.className = classNames(restProps.className, "column");

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th>
        <div {...restProps}></div>
      </th>
    </Resizable>
  );
};

export const resizeTableColumns = (
  initialColumns,
  columns,
  setColumns,
  defaultColumnWidth,
  fontSize
) => {
  initialColumns = initialColumns.map((col, index) => {
    let width = defaultColumnWidth
      ? col.width || defaultColumnWidth
      : col.width;
    width = width ? parseNumberFromCssValue(width) * fontSize : width;
    if (col.minWidth) {
      col.minWidth = parseNumberFromCssValue(col.minWidth) * fontSize;
    }
    return {
      ...col,
      width: width,
      onHeaderCell: (column) => ({
        width: column.width,
        onResize: handleResize(index, initialColumns, setColumns),
      }),
    };
  });

  return initialColumns;
};

export const resizeTableComponents = (components) => {
  components = components || {};
  components.header = {
    cell: ResizeableTitle,
  };

  return components;
};

const handleResize = (index, columns, setColumns) => (e, { size }) => {
  const nextColumns = [...columns];
  const updatedWidth =
    nextColumns[index].minWidth && nextColumns[index].minWidth > size.width
      ? nextColumns[index].minWidth
      : size.width;
  nextColumns[index] = {
    ...nextColumns[index],
    width: updatedWidth,
  };
  setColumns(nextColumns);
};
