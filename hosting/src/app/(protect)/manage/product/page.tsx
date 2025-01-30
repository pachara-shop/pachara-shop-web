'use client';

import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/input';
import DataTable from '@/components/organisms/DataTable';
import { useSearchProductsMutation } from '@/hooks/slices/productAPI';
import { IProduct } from '@/shared/models/Product';
import { ColumnDef, useReactTable } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Page() {
  const route = useRouter();
  const [products, setProduct] = React.useState<IProduct[]>([]);
  const [getProducts] = useSearchProductsMutation();

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [tableInstance, setTableInstance] =
    useState<ReturnType<typeof useReactTable<IProduct>>>();
  const handleTableInstanceChange = (
    instance: ReturnType<typeof useReactTable<IProduct>>
  ) => {
    setTableInstance(instance);
  };

  const fetchProducts = async () => {
    const response = await getProducts({ filter: 'all' })
      .unwrap()
      .then((res) => res.data);
    setProduct(response);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const columnsSetting: ColumnDef<IProduct>[] = [
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Price',
      accessorKey: 'price',
      cell: ({ row }) => {
        const price = row.original.price;
        const formattedPrice = new Intl.NumberFormat('en-US', {
          style: 'decimal',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(price);
        return <div>{formattedPrice}</div>;
      },
    },
    {
      header: 'Category',
      accessorKey: 'category',
    },
    {
      header: 'Stock',
      accessorKey: 'stock',
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
                route.push('/manage/product/create');
              }}
            >
              Add Product
            </Button>
          </div>
        </div>
      </DataTable>
    </div>
  );
}
