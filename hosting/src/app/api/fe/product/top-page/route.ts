import { SearchProductRepository } from '@/repositories/fe/SearchProductRepository';
import { handleError, handleSuccess } from '@/utils/api/response-handler';

const getFrontendProductList = async () => {
  try {
    const repo = new SearchProductRepository();
    const product = await repo.getProductForTopPage();
    if (!product) {
      return handleError(404, 'Product not found');
    }
    return handleSuccess({ data: product });
  } catch (err) {
    return handleError(500, err);
  }
};

export const GET = getFrontendProductList;
