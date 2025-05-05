import { SearchProductRepository } from '@/repositories/fe/SearchProductRepository';
import { handleError, handleSuccess } from '@/utils/api/response-handler';
import { NextRequest } from 'next/server';

const getFrontendProductList = async (req: NextRequest) => {
  try {
    const category = req.nextUrl.searchParams.get('c') || undefined;
    const sorting = req.nextUrl.searchParams.get('s') || undefined;
    const keyword = req.nextUrl.searchParams.get('k') || undefined;
    const repo = new SearchProductRepository();
    const product = await repo.searchFrontendProductList({
      c: category,
      s: sorting,
      k: keyword,
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
