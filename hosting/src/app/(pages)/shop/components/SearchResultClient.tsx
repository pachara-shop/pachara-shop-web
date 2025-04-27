'use client';
import { ProductFilter } from './ProductFilter';
import { Shop } from './Shop';
interface CategoryOption {
  id: string;
  name: string;
}

export function SearchResultClient({
  categoryOptions,
}: {
  categoryOptions: CategoryOption[];
}) {
  return (
    <div>
      <ProductFilter />
      <Shop />
    </div>
  );
}
