export interface IResponse<T> {
  data: T;
  pagination?: { pageIndex: number; pageSize: number; total: number };
}
