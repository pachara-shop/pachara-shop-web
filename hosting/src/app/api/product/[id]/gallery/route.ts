import { ProductGalleryRepository } from '@/repositories/ProductGalleryRepository';
import { QueryParams } from '@/shared/types';
import { handleError, handleSuccess } from '@/utils/api/handler';
import { NextRequest } from 'next/server';

const getProductGalleryByProductId = async (
  req: NextRequest,
  query: QueryParams
) => {
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

const uploadProductImages = async (req: NextRequest, query: QueryParams) => {
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

const deleteProductImage = async (req: NextRequest, query: QueryParams) => {
  try {
    const { id } = (await query?.params) ?? {};
    if (!id) {
      return handleError(400, new Error('The id is require'));
    }

    const { image } = await req.json();
    if (!image) {
      return handleError(400, new Error('The image is require'));
    }

    const repo = new ProductGalleryRepository();
    await repo.deleteProductImageWithFullPath(image);
    return handleSuccess({ data: 'success' });
  } catch (err) {
    return handleError(500, err);
  }
};

export const GET = getProductGalleryByProductId;
export const POST = uploadProductImages;
export const DELETE = deleteProductImage;
