export const mapKeys = (data) => {
  if (data && Array.isArray(data)) {
    data.forEach((x, index) => {
      x.key = index;
    });
  }
  return data;
};
