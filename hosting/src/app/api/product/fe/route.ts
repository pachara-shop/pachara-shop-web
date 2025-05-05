import { SearchProductRepository } from '@/repositories/fe/SearchProductRepository';
import { handleError, handleSuccess } from '@/utils/api/response-handler';
import { NextRequest } from 'next/server';

const getFrontendProductList = async (req: NextRequest) => {
  try {
    // get value from params
    const category = req.nextUrl.searchParams.get('c') || undefined;
    const sorting = req.nextUrl.searchParams.get('s') || undefined;
    const repo = new SearchProductRepository();
    const product = await repo.searchFrontendProductList({
      c: category,
      s: sorting,
    });
    if (!product) {
      return handleError(404, 'Product not found');
    }
    return handleSuccess({ data: product });
  } catch (err) {
    return handleError(500, err);
  }
};

export const GET = getFrontendProductList;
