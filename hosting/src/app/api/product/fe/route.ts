import { ProductRepository } from '@/Repository/ProductRepository';
import { handleError, handleSuccess } from '@/utils/api/handler';

const getFrontendProductList = async () => {
  try {
    const repo = new ProductRepository();
    const product = await repo.getFrontendPRoductList();
    if (!product) {
      return handleError(404, 'Product not found');
    }
    return handleSuccess({ data: product });
  } catch (err) {
    return handleError(500, err);
  }
};

export const GET = getFrontendProductList;
