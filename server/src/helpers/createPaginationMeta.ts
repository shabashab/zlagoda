export const createPaginationMeta = (
  items: unknown[],
  totalCount: number,
  pageSize: number,
  page: number
) => {
  return {
    totalCount,
    count: items.length,
    pageSize,
    page,
    totalPages: Math.floor(totalCount / pageSize)
  }
}
