import React from "react";
import ReactDragListView from "react-drag-listview";

const tableDragColumn = ({ columns, setColumns, selection, children }) => {
  const onDragEnd = (fromIndex, toIndex) => {
    if (toIndex != -1) {
      if (selection) {
        if (fromIndex < 1 || toIndex < 1) {
          return;
        }
        fromIndex--;
        toIndex--;
      }
      const columnsCopy = [...columns.slice()];
      const item = columnsCopy.splice(fromIndex, 1)[0];
      columnsCopy.splice(toIndex, 0, item);
      setColumns(columnsCopy);
    }
  };

  return (
    <div className="table-draggable">
      <ReactDragListView.DragColumn
        lineClassName="table-column-drag"
        onDragEnd={onDragEnd}
        nodeSelector="th"
        handleSelector=".column"
      >
        {children}
      </ReactDragListView.DragColumn>
    </div>
  );
};

export { tableDragColumn as TableDragColumn };
