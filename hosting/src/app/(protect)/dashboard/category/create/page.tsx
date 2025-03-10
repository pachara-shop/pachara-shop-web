'use client';

import { useRouter } from 'next/navigation';
import { useCreateCategoryMutation } from '@/hooks/slices/categoryAPI';
import { CategoryDetail } from '@/app/components/category/CategoryDetail';

export default function Page() {
  const route = useRouter();
  const [onCreate] = useCreateCategoryMutation();

  const onSubmit = async (data) => {
    await onCreate(data)
      .unwrap()
      .then(() => {
        route.push('/dashboard/category');
      });
  };
  return (
    <CategoryDetail
      initialValues={{
        name: '',
        id: '',
      }}
      onSubmit={onSubmit}
    />
  );
}
