import { BeProductRepository } from '@/repositories/be/be-product-repository';
import { handleError, handleSuccess } from '@/utils/api/response-handler';
import { NextRequest } from 'next/server';

const getProductById = async (req: NextRequest, query: any) => {
  try {
    const { id } = (await query?.params) ?? {};
    if (!id) {
      return handleError(400, new Error('The id is require'));
    }
    const repo = new BeProductRepository();
    const product = await repo.getById(id);
    if (!product) {
      return handleError(404, 'Product not found');
    }
    return handleSuccess({ data: product });
  } catch (err) {
    return handleError(500, err);
  }
};

export const GET = getProductById;
