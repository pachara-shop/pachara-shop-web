import { ProductRepository } from '@/Repository/ProductRepository';
import { handleError, handleSuccess } from '@/utils/api/handler';
import { NextRequest } from 'next/server';

const getFrontendProductList = async (req: NextRequest) => {
  try {
    // get value from params
    const categoryName = req.nextUrl.searchParams.get('c');

    const repo = new ProductRepository();
    const product = await repo.searchFrontendProductList({ c: categoryName });
    if (!product) {
      return handleError(404, 'Product not found');
    }
    return handleSuccess({ data: product });
  } catch (err) {
    return handleError(500, err);
  }
};

export const GET = getFrontendProductList;
