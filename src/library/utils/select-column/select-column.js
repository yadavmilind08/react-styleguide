export const selectColumns = (select, columns) => {
  if (!select || !Array.isArray(select)) {
    return columns;
  }
  const updatedColumns = [];
  select.forEach((s) => {
    const isObject = typeof s == "object";
    let column = columns.find((c) =>
      isObject ? c.dataIndex == s.dataIndex : c.dataIndex == s
    );
    if (column) {
      if (isObject) {
        column = {
          ...column,
          ...s,
        };
      }
      updatedColumns.push(column);
    }
  });
  return updatedColumns;
};
