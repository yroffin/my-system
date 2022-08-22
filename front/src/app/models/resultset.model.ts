export interface Pagination {
    page: Number,
    pageSize: Number,
    pageCount: Number,
    total: Number
}

export interface PageResultSet<T> {
    results: Array<T>,
    pagination: Pagination
}