'use client';

import { useParams, useRouter } from 'next/navigation';
import {
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from '@/hooks/slices/categoryAPI';
import { CategoryDetail } from '@/app/(protect)/components/category/CategoryDetail';
import { useEffect, useState } from 'react';
import { ICategory } from '@/shared/models/Category';

export default function Page() {
  const route = useRouter();
  const params = useParams();
  const id = params?.id && Array.isArray(params.id) ? params.id[0] : params?.id;
  const { data, refetch } = useGetCategoryByIdQuery({ id: id as string });
  const [onUpdate] = useUpdateCategoryMutation();
  const [initialValue, setInitialValue] = useState<ICategory>({
    name: '',
    id: '',
  });

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (data !== undefined) {
      setInitialValue(data.data);
    }
  }, [data]);

  const onSubmit = async (data: ICategory) => {
    await onUpdate({ id: id as string, data })
      .unwrap()
      .then(() => {
        route.push('/dashboard/category');
      });
  };

  return <CategoryDetail initialValues={initialValue} onSubmit={onSubmit} />;
}
