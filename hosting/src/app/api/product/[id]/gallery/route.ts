import { ProductGalleryRepository } from '@/repositories/ProductGalleryRepository';
import { handleError, handleSuccess } from '@/utils/api/handler';
import { NextRequest } from 'next/server';

const getProductGalleryById = async (req: NextRequest, query) => {
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

const updateProductGallery = async (req: NextRequest, query) => {
  try {
    const { id } = (await query?.params) ?? {};
    if (!id) {
      return handleError(400, new Error('The id is require'));
    }
    const formData = await req.formData();
    const files = formData.getAll('files') as File[];

    const repo = new ProductGalleryRepository();
    await repo.updateGallery(id, files);

    return handleSuccess({ data: 'success' });
  } catch (err) {
    return handleError(500, err);
  }
};

export const GET = getProductGalleryById;
export const PUT = updateProductGallery;
