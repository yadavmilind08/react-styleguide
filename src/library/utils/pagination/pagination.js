export class Pagination {
  static getTotalText(data, pagination) {
    if (!data || !data.length) {
      return null;
    }
    if (pagination.page == undefined) {
      pagination.page = 0;
    }
    if (pagination.pageSize == undefined) {
      pagination.pageSize = 0;
    }
    const rangeStart =
      pagination.page == 0
        ? 0
        : pagination.pageSize * (pagination.page - 1) + 1;
    const total = pagination.total || (data || []).length;
    const rangeEnd =
      pagination.pageSize * pagination.page <= total
        ? pagination.pageSize * pagination.page
        : total;
    return total > 0 ? `Showing ${rangeStart}-${rangeEnd} of ${total}` : null;
  }
}
