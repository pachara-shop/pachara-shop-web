'use client';

import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/input';
import DataTable, { FetchDataParams } from '@/components/organisms/DataTable';
import { useSearchCategoryMutation } from '@/hooks/slices/CategoryAPI';
import { ICategory } from '@/shared/models/Category';
import { ColumnDef, useReactTable } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function Page(): JSX.Element {
  const route = useRouter();
  const [products, setProduct] = React.useState<ICategory[]>([]);
  const [getProducts] = useSearchCategoryMutation();

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [tableInstance, setTableInstance] =
    useState<ReturnType<typeof useReactTable<ICategory>>>();
  const handleTableInstanceChange = (
    instance: ReturnType<typeof useReactTable<ICategory>>
  ): void => {
    setTableInstance(instance);
  };

  const fetchProducts = async (params: FetchDataParams): Promise<void> => {
    const response = await getProducts({
      p: JSON.stringify(params.pagination),
      s: JSON.stringify(params.sorting),
      f: JSON.stringify(params.columnFilters),
    })
      .unwrap()
      .then((res) => res.data);
    setProduct(response);
  };

  const columnsSetting: ColumnDef<ICategory>[] = [
    {
      header: 'Name',
      accessorKey: 'name',
      meta: {
        cellClassName: '',
      },
    },
    {
      header: '',
      accessorKey: 'id',
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
              onClick={() => {
                route.push(`/manage/category/${id}`);
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
    <div>
      <DataTable
        data={products}
        total={products.length}
        columns={columnsSetting}
        fetchData={fetchProducts}
        onTableInstanceChange={handleTableInstanceChange}
      >
        <div className='flex justify-between'>
          <div className='flex w-full max-w-sm items-center space-x-2'>
            <Input type='text' placeholder='Search...' />
            <Button type='submit'>Search</Button>
          </div>
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
    </div>
  );
}
