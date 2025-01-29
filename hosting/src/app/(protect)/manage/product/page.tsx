'use client';

import DataTable from '@/components/organisms/DataTable';
import { useSearchProductsMutation } from '@/hooks/slices/productAPI';
import { IProduct } from '@/shared/models/Product';
import { ColumnDef, useReactTable } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';

export default function Page() {
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
      <h1>product</h1>
      <DataTable
        data={products}
        total={products.length}
        columns={columnsSetting}
        fetchData={fetchProducts}
        onTableInstanceChange={handleTableInstanceChange}
      />
    </div>
  );
}
