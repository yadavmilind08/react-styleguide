export const mapIndexes = (data) => {
  if (data && Array.isArray(data)) {
    data.forEach((x, index) => {
      x.index = index + 1;
    });
  }
  return data;
};
