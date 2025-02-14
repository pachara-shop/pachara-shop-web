'use client';

import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/input';
import { TableEdit } from '@/components/atoms/TableEdit';
import { TableImage } from '@/components/atoms/TableImage';
import DataTable from '@/components/organisms/DataTable';
import { useSearchProductsMutation } from '@/hooks/slices/productAPI';
import { IProduct } from '@/shared/models/Product';
import { ColumnDef, useReactTable } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Page(): JSX.Element {
  const route = useRouter();
  const [products, setProduct] = React.useState<IProduct[]>([]);
  const [getProducts] = useSearchProductsMutation();

  const [tableInstance, setTableInstance] =
    useState<ReturnType<typeof useReactTable<IProduct>>>();
  const handleTableInstanceChange = (
    instance: ReturnType<typeof useReactTable<IProduct>>
  ) => {
    setTableInstance(instance);
  };

  const fetchProducts = async () => {
    const sorting = tableInstance?.getState().sorting;
    const filtering = tableInstance?.getState().columnFilters;
    const pagination = tableInstance?.getState().pagination;

    const response = await getProducts({
      s: JSON.stringify(sorting),
      p: JSON.stringify(pagination),
      f: JSON.stringify(filtering),
    })
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
      cell: ({ row }) => {
        const category = row.original.category as IProduct['category'];
        if (typeof category === 'object') {
          return <div>{(category as any)?.name}</div>;
        }
        return null;
      },
    },
    {
      header: 'Image',
      accessorKey: 'image',
      enableSorting: false,
      cell: ({ row }) => {
        const image = row.original.image;
        if (image) {
          return <TableImage src={image} alt={row.original.name} />;
        }
      },
    },
    {
      header: 'Action',
      accessorKey: 'id',
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <TableEdit
            isEdit
            isDelete
            onClickEdit={() => {
              route.push(`/manage/product/${row.original.id}`);
            }}
          />
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
