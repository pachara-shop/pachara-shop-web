import { ProductRepository } from '@/Repository/ProductRepository';
import { handleError, handleSuccess } from '@/utils/api/handler';
import { NextRequest } from 'next/server';

const getProductById = async (req: NextRequest, query) => {
  try {
    const { id } = (await query?.params) ?? {};
    if (!id) {
      return handleError(400, new Error('The id is require'));
    }
    const product = await ProductRepository.getById(id);
    if (!product) {
      return handleError(404, 'Product not found');
    }
    return handleSuccess({ data: product });
  } catch (err) {
    return handleError(500, err);
  }
};

export const GET = getProductById;
