import {
  SortingState,
  ColumnFiltersState,
  PaginationState,
} from '@tanstack/react-table';

export interface ISearchParams {
  /**
   * pagination
   */
  p: string;
  /**
   * sorting
   */
  s: string;
  /**
   * column filters
   */
  f: string;
}

export interface FetchDataParams {
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  pagination: PaginationState;
}

export interface SearchProductsParams {
  /**
   * category id
   */
  c?: string;
  /**
   * sorting
   */
  s?: string;
  /**
   * pagination
   */
  p?: string;
  /**
   * category name
   */
  c_name?: string;
  /**
   * keyword
   */
  k?: string;
}
