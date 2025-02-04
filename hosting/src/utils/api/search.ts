import { FetchDataParams } from '@/components/organisms/DataTable';
import { NextURL } from 'next/dist/server/web/next-url';

const getSearchParamsFromRequest = (url: NextURL): FetchDataParams => {
  const searchParams = new URLSearchParams(url.search);
  const pagination = searchParams.get('p');
  const sorting = searchParams.get('s');
  const columnFilters = searchParams.get('f');

  return {
    pagination: pagination ? JSON.parse(pagination) : {},
    sorting: sorting ? JSON.parse(sorting) : [],
    columnFilters: columnFilters ? JSON.parse(columnFilters) : {},
  };
};

export { getSearchParamsFromRequest };
