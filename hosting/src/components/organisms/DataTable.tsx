/* eslint-disable indent */
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import { useCallback, useEffect } from 'react';
import { Icon } from '../atoms/Icon';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationFirst,
  PaginationPrevious,
  PaginationNext,
  PaginationLast,
} from '../atoms/Pagination';
import { useTableProps } from '@/hooks/use-table-props';
import { Title } from '../atoms/Typography';
import { ComboboxNumber } from '../atoms/ComboboxNumber';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '../atoms/table';

export default function DataTable<T>({
  data,
  columns,
  isLoading,
  total,
  defaultSort,
  fetchData,
  onTableInstanceChange,
  children,
}: DataTableProps<T>) {
  const {
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
    pagination,
    setPagination,
  } = useTableProps({ defaultSort });
  const stableFetchData = useCallback(fetchData, [fetchData]);

  useEffect(() => {
    const endCodePagination = encodeURIComponent(JSON.stringify(pagination));
    const endCodeSorting = encodeURIComponent(JSON.stringify(sorting));
    const endCodeColumnFilters = encodeURIComponent(
      JSON.stringify(columnFilters)
    );

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('pagination', endCodePagination);
      url.searchParams.set('sorting', endCodeSorting);
      url.searchParams.set('columnFilter', endCodeColumnFilters);

      window.history.replaceState({}, '', url.toString());
    }
    stableFetchData({ sorting, columnFilters, pagination });
  }, [sorting, columnFilters, pagination.pageIndex, pagination.pageSize]);

  const table = useReactTable<T>({
    data,
    columns,
    pageCount: Math.ceil(total / pagination.pageSize),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      pagination,
    },
    // autoResetPageIndex: false,
    manualPagination: true,
    manualFiltering: true,
  });

  useEffect(() => {
    // for external use of table instance
    onTableInstanceChange?.(table);
  }, [table, onTableInstanceChange]);

  return (
    <div className='bg-white'>
      {children && <div className='p-4'>{children}</div>}
      <Table className='rounded-lg shadow-lg border border-gray-200'>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(
                (header) =>
                  !(header.column.columnDef.meta as { hideColumn?: boolean })
                    ?.hideColumn && (
                    <TableHead
                      key={header.id}
                      onClick={() => {
                        if (header.column.getCanSort()) {
                          header.column.toggleSorting(
                            header.column.getIsSorted() === 'asc'
                          );
                        }
                      }}
                      className={` text-[#94A3B8] pl-4 ${
                        header.column.getCanSort() ? 'cursor-pointer' : ''
                      } 
                      ${
                        (
                          header.column.columnDef.meta as {
                            headerClassName?: string;
                          }
                        )?.headerClassName
                      }`}
                    >
                      {!header.column.getCanSort() ? (
                        !header.isPlaceholder &&
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                      ) : (
                        <div className='flex items-center'>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}

                          {table.getState().sorting[0]?.id === header.id &&
                            (!table.getState().sorting[0].desc ? (
                              <Icon
                                icon='icon-[lucide--move-up]'
                                className='w-4'
                              />
                            ) : (
                              <Icon
                                icon='icon-[lucide--move-down]'
                                className='w-4'
                              />
                            ))}
                        </div>
                      )}
                    </TableHead>
                  )
              )}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className='h-24 text-center'
              />
            </TableRow>
          )}
          {!isLoading && table.getRowModel().rows?.length === 0 && (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
          {!isLoading &&
            table.getRowModel().rows?.length > 0 &&
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => {
                  const columnMeta = (
                    cell.column.columnDef.meta as { hideColumn?: boolean }
                  )?.hideColumn;
                  if (!columnMeta) {
                    return (
                      <TableCell
                        key={cell.id}
                        className={`pl-4 ${
                          (
                            cell.column.columnDef.meta as {
                              cellClassName?: string;
                            }
                          )?.cellClassName || ''
                        }`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  }
                  return null;
                })}
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={table.getAllColumns().length}>
              <Pagination className='justify-end'>
                <PaginationContent>
                  <PaginationItem className='mr-20 flex items-center'>
                    <Title className='text-[#64748B] mr-4'>Rows per page</Title>
                    {pagination && (
                      <ComboboxNumber
                        items={[
                          { label: '5', value: '5' },
                          { label: '10', value: '10' },
                          { label: '15', value: '15' },
                          { label: '20', value: '20' },
                          { label: '25', value: '25' },
                        ]}
                        defaultSelected={String(pagination?.pageSize)}
                        onSelect={(value) => {
                          table.setPageSize(parseInt(value, 10));
                          table.resetPageIndex();
                        }}
                      />
                    )}
                  </PaginationItem>
                  <PaginationItem className='mr-4'>
                    <Title>
                      Page {table.getState().pagination.pageIndex + 1} of{' '}
                      {table.getPageCount()}
                    </Title>
                  </PaginationItem>
                  <PaginationItem className='border rounded-[4px]'>
                    <PaginationFirst
                      className='h-[28px]'
                      isDisabled={!table.getCanPreviousPage()}
                      onClick={() => {
                        table.firstPage();
                      }}
                    />
                  </PaginationItem>
                  <PaginationItem className='border rounded-[4px]'>
                    <PaginationPrevious
                      className='h-[28px]'
                      isDisabled={!table.getCanPreviousPage()}
                      onClick={() => {
                        table.previousPage();
                      }}
                    />
                  </PaginationItem>
                  <PaginationItem className='border rounded-[4px]'>
                    <PaginationNext
                      className='h-[28px]'
                      isDisabled={!table.getCanNextPage()}
                      onClick={() => {
                        table.nextPage();
                      }}
                    />
                  </PaginationItem>
                  <PaginationItem className='border rounded-[4px]'>
                    <PaginationLast
                      className='h-[28px]'
                      isDisabled={!table.getCanNextPage()}
                      onClick={() => table.lastPage()}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export interface FetchDataParams {
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  pagination: PaginationState;
}

export interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  fetchData: (params: FetchDataParams) => void;
  isLoading?: boolean;
  total: number;
  defaultSort?: SortingState;
  onTableInstanceChange?: (
    tableInstance: ReturnType<typeof useReactTable<T>>
  ) => void;
  children?: React.ReactNode; // Add children prop
}
