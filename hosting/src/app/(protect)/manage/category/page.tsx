'use client';

import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/input';
import DataTable from '@/components/organisms/DataTable';
import {
  useDeleteCategoryMutation,
  useSearchCategoryMutation,
} from '@/hooks/slices/categoryAPI';
import { ICategory } from '@/shared/models/Category';
import { FetchDataParams } from '@/shared/models/Search';
import { ColumnDef, useReactTable } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function Page(): JSX.Element {
  const route = useRouter();
  const [search, setSearch] = useState('');
  const [productList, setProductList] = React.useState<ICategory[]>([]);
  const [total, setTotal] = React.useState<number>(0);
  const [getProducts] = useSearchCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [tableInstance, setTableInstance] =
    useState<ReturnType<typeof useReactTable<ICategory>>>();
  const handleTableInstanceChange = (
    instance: ReturnType<typeof useReactTable<ICategory>>
  ): void => {
    setTableInstance(instance);
  };

  const fetchProducts = async (params: FetchDataParams): Promise<void> => {
    await getProducts({
      p: JSON.stringify(params.pagination),
      s: JSON.stringify(params.sorting),
      f: JSON.stringify(params.columnFilters),
    })
      .unwrap()
      .then((res) => {
        setProductList(res.data);
        setTotal(res.pagination.total);
      });
  };

  const columnsSetting: ColumnDef<ICategory>[] = [
    {
      header: 'Name',
      accessorKey: 'name',
      sortDescFirst: true,
      enableSorting: false,
      meta: {
        cellClassName: '',
      },
    },
    {
      header: '',
      accessorKey: 'id',
      enableSorting: false,

      cell: ({ row }) => {
        const id = row.original.id;
        return (
          <div className='flex space-x-2 items-end justify-end'>
            <Button
              type='button'
              onClick={() => {
                route.push(`/manage/category/${id}`);
              }}
            >
              Edit
            </Button>
            <Button
              type='button'
              onClick={async () => {
                await deleteCategory({ id })
                  .unwrap()
                  .then(() => {
                    const sorting = tableInstance?.getState().sorting;
                    const columnFilters =
                      tableInstance?.getState().columnFilters;
                    const pagination = tableInstance?.getState().pagination;
                    fetchProducts({ sorting, columnFilters, pagination });
                  });
              }}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <DataTable
      data={productList}
      total={total}
      columns={columnsSetting}
      fetchData={fetchProducts}
      onTableInstanceChange={handleTableInstanceChange}
    >
      <div className='flex justify-between'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            tableInstance?.resetPageIndex();
            tableInstance?.getColumn('name')?.setFilterValue(search);
          }}
        >
          <div className='flex w-full max-w-sm items-center space-x-2'>
            <Input
              type='text'
              placeholder='Search...'
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <Button type='submit'>Search</Button>
          </div>
        </form>
        <div className='flex justify-end'>
          <Button
            type='button'
            onClick={() => {
              route.push('/manage/category/create');
            }}
          >
            Add Category
          </Button>
        </div>
      </div>
    </DataTable>
  );
}
