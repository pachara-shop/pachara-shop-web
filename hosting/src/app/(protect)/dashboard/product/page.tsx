'use client';

import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/input';
import { TableEdit } from '@/components/atoms/TableEdit';
import { TableImage } from '@/components/atoms/TableImage';
import DataTable from '@/components/organisms/DataTable';
import {
  useDeleteProductMutation,
  useSearchProductsMutation,
  useUpdateProductStatusMutation,
} from '@/hooks/slices/be/product/productAPI';
import { IProduct } from '@/shared/models/Product';
import { ColumnDef, useReactTable } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { HeaderWrapper } from '../../components/HeaderWrapper';
import { FetchDataParams } from '@/shared/models/Search';
import { Checkbox } from '@/components/ui/checkbox';

export default function Page(): JSX.Element {
  const route = useRouter();
  const [total, setTotal] = useState(0);
  const [products, setProduct] = React.useState<IProduct[]>([]);
  const [searchProduct, { isLoading }] = useSearchProductsMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [updateStatus] = useUpdateProductStatusMutation();

  const [tableInstance, setTableInstance] =
    useState<ReturnType<typeof useReactTable<IProduct>>>();
  const handleTableInstanceChange = (
    instance: ReturnType<typeof useReactTable<IProduct>>
  ) => {
    setTableInstance(instance);
  };

  const fetchProducts = async (params: FetchDataParams) => {
    const sorting = params.sorting;
    const filtering = params.columnFilters;
    const pagination = params.pagination;

    await searchProduct({
      s: JSON.stringify(sorting),
      p: JSON.stringify(pagination),
      f: JSON.stringify(filtering),
    })
      .unwrap()
      .then((res) => {
        setProduct(res.data);
        setTotal(res.pagination?.total || 0);
      });
  };

  const onDeleteProduct = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }
    await deleteProduct(id);
    const sorting = tableInstance?.getState().sorting;
    const filtering = tableInstance?.getState().columnFilters;
    const pagination = tableInstance?.getState().pagination;
    fetchProducts({
      sorting: sorting || [],
      columnFilters: filtering || [],
      pagination: pagination || { pageIndex: 0, pageSize: 10 },
    });
  };

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
      header: 'Highlight',
      accessorKey: 'highlight',
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <Checkbox
            checked={row.original.highlight || false}
            onClick={(e) => {
              e.stopPropagation();
              updateStatus({
                id: row.original.id || '',
                data: { highlight: !row.original.highlight },
              });
              const sorting = tableInstance?.getState().sorting;
              const filtering = tableInstance?.getState().columnFilters;
              const pagination = tableInstance?.getState().pagination;
              fetchProducts({
                sorting: sorting || [],
                columnFilters: filtering || [],
                pagination: pagination || { pageIndex: 0, pageSize: 10 },
              });
            }}
          />
        );
      },
    },
    {
      header: '',
      accessorKey: 'id',
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <TableEdit
            isEdit
            isDelete
            onClickEdit={() => {
              route.push(`/dashboard/product/${row.original.id}`);
            }}
            onClickDelete={() => {
              if (row.original.id) {
                onDeleteProduct(row.original.id);
              }
            }}
          />
        );
      },
    },
  ];

  return (
    <HeaderWrapper title='Products' subTitle='Manage your products'>
      <DataTable
        data={products}
        total={total}
        columns={columnsSetting}
        fetchData={fetchProducts}
        onTableInstanceChange={handleTableInstanceChange}
        isLoading={isLoading}
      >
        <div className='flex justify-between'>
          <div className=' w-full max-w-sm items-center space-x-2 hidden'>
            <Input type='text' placeholder='Search...' />
            <Button type='submit'>Search</Button>
          </div>
          <div className='flex justify-end'>
            <Button
              type='button'
              onClick={() => {
                route.push('/dashboard/product/create');
              }}
            >
              Add Product
            </Button>
          </div>
        </div>
      </DataTable>
    </HeaderWrapper>
  );
}
