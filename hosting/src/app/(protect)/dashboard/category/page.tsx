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
import { HeaderWrapper } from '../../components/HeaderWrapper';

export default function Page(): JSX.Element {
  const route = useRouter();
  const [searchTerm, setSearch] = useState('');
  const [productList, setProductList] = React.useState<ICategory[]>([]);
  const [total, setTotal] = React.useState<number>(0);
  const [searchCats, { isLoading }] = useSearchCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [tableInstance, setTableInstance] =
    useState<ReturnType<typeof useReactTable<ICategory>>>();
  const handleTableInstanceChange = (
    instance: ReturnType<typeof useReactTable<ICategory>>
  ): void => {
    setTableInstance(instance);
  };

  const fetchProducts = async (params: FetchDataParams): Promise<void> => {
    await searchCats({
      p: JSON.stringify(params.pagination),
      s: JSON.stringify(params.sorting),
      f: JSON.stringify(params.columnFilters),
    })
      .unwrap()
      .then((res) => {
        setProductList(res.data);
        setTotal(res.pagination ? res.pagination.total : 0);
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
                route.push(`/dashboard/category/${id}`);
              }}
            >
              Edit
            </Button>
            <Button
              type='button'
              onClick={async () => {
                if (
                  !window.confirm('Are you sure you want to delete this item?')
                ) {
                  return;
                }
                await deleteCategory({ id })
                  .unwrap()
                  .then(() => {
                    const sorting = tableInstance?.getState().sorting || [];
                    const columnFilters =
                      tableInstance?.getState().columnFilters || [];
                    const pagination = tableInstance?.getState().pagination || {
                      pageIndex: 0,
                      pageSize: 10,
                    };
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
    <HeaderWrapper title='Category' subTitle='Manage your categories'>
      <DataTable
        data={productList}
        total={total}
        columns={columnsSetting}
        fetchData={fetchProducts}
        onTableInstanceChange={handleTableInstanceChange}
        isLoading={isLoading}
      >
        <div className='flex justify-between'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              tableInstance?.resetPageIndex();
              tableInstance?.getColumn('name')?.setFilterValue(searchTerm);
            }}
          >
            <div className='w-full max-w-sm items-center space-x-2 hidden'>
              <Input
                type='text'
                placeholder='Search...'
                value={searchTerm}
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
                route.push('/dashboard/category/create');
              }}
            >
              Add Category
            </Button>
          </div>
        </div>
      </DataTable>
    </HeaderWrapper>
  );
}
