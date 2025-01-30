'use client';

import {
  ColumnFiltersState,
  PaginationState,
  SortingState
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { useSearchParams } from 'next/navigation';
  
  type Props = {
    defaultSort?: SortingState;
  };
  
export const useTableProps = ({ defaultSort }: Props) => {
  const searchParams = useSearchParams();
  const [sorting, setSorting] = useState<SortingState>(() => {
    if (defaultSort) return defaultSort;
    const paramsString = searchParams.get('sorting');
    return paramsString ? JSON.parse(decodeURIComponent(paramsString)) : [];
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(() => {
    const paramsString = searchParams.get('columnFilter');
    return paramsString ? JSON.parse(decodeURIComponent(paramsString)) : [];
  
  });
  const [pagination, setPagination] = useState<PaginationState>(() => {
    const paramsString = searchParams.get('pagination');
    return paramsString ? JSON.parse(decodeURIComponent(paramsString)) : { pageIndex: 0, pageSize: 10 };
  });
  
  useEffect(() => {
    const sortingQuery = searchParams.get('sorting');
    const sortingData = sortingQuery
      ? JSON.parse(decodeURIComponent(sortingQuery))
      : (defaultSort ?? []);
  
    if (!_.isEqual(sortingData, sorting)) {
      setSorting(sortingData);
    }
  
    const columnFilterQuery = searchParams.get('columnFilter');
    const columnData = columnFilterQuery
      ? JSON.parse(decodeURIComponent(columnFilterQuery))
      : [];
  
    if (!_.isEqual(columnData, columnFilters)) {
      setColumnFilters(columnData);
    }
  
    const paginationQuery = searchParams.get('pagination');
    const paginationData = paginationQuery
      ? JSON.parse(decodeURIComponent(paginationQuery))
      : { pageIndex: 0, pageSize: 10 };
  
    if (!_.isEqual(paginationData, pagination)) {
      setPagination(paginationData);
    }
  }, []);
  
  return {
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
    pagination,
    setPagination
  };
};
  