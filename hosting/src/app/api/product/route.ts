import { ProductRepository } from '@/Repository/ProductRepository';
import { handleError, handleSuccess } from '@/utils/api/handler';
import { NextRequest } from 'next/server';

const getProductList = async () => {
  try {
    const product = await ProductRepository.getAll();
    if (!product) {
      return handleError(404, 'Product not found');
    }
    return handleSuccess({ data: product });
  } catch (err) {
    return handleError(500, err);
  }
};

const createProduct = async (req: NextRequest) => {
  try {
    const data = await req.json();
    await ProductRepository.add(data);
    return handleSuccess({ data: 'success' });
  } catch (err) {
    return handleError(500, err);
  }
};

export const GET = getProductList;
export const POST = createProduct;
