export interface ISearchResponse<T> {
  data: T;
  pagination?: { pageIndex: number; pageSize: number; total: number };
}

export interface IResponse<T> {
  data: T;
}
