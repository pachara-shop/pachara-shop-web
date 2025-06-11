import { BeProductRepository } from '@/repositories/be/be-product-repository';
import { handleError, handleSuccess } from '@/utils/api/response-handler';
import { NextRequest } from 'next/server';

const updateProduct = async (req: NextRequest, query: any) => {
  try {
    const { id } = (await query?.params) ?? {};
    if (!id) {
      return handleError(400, new Error('The id is require'));
    }
    const { highlight } = await req.json();

    const repo = new BeProductRepository();
    await repo.updateStatus(id, highlight);

    return handleSuccess({ data: [] });
  } catch (err) {
    return handleError(500, err);
  }
};

export const PUT = updateProduct;
