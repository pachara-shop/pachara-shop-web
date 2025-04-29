import { SearchProductRepository } from '@/repositories/fe/SearchProductRepository';
import { handleError, handleSuccess } from '@/utils/api/response-handler';
import { NextRequest } from 'next/server';

const searchProductByCategory = async (req: NextRequest, query: any) => {
  try {
    const { category } = (await query?.params) ?? {};
    const repo = new SearchProductRepository();
    const products = await repo.searchProductByCategory(category);
    return handleSuccess({ data: products });
  } catch (err) {
    return handleError(500, err);
  }
};

export const GET = searchProductByCategory;
