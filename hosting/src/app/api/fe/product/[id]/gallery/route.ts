import { ProductGalleryRepository } from '@/repositories/ProductGalleryRepository';
import { handleError, handleSuccess } from '@/utils/api/response-handler';
import { NextRequest } from 'next/server';

const getProductGalleryByProductId = async (req: NextRequest, query: any) => {
  try {
    const { id } = (await query?.params) ?? {};
    if (!id) {
      return handleError(400, new Error('The id is require'));
    }
    const repo = new ProductGalleryRepository();
    const gallery = await repo.getProductGalleryById(id);
    if (!gallery) {
      return handleError(404, 'Product not found');
    }
    return handleSuccess({ data: gallery });
  } catch (err) {
    return handleError(500, err);
  }
};

export const GET = getProductGalleryByProductId;
