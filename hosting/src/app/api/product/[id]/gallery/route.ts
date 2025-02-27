import { ProductRepository } from '@/Repository/ProductRepository';
import { handleError, handleSuccess } from '@/utils/api/handler';
import { NextRequest } from 'next/server';

const getProductGalleryById = async (req: NextRequest, query) => {
  try {
    const { id } = (await query?.params) ?? {};
    if (!id) {
      return handleError(400, new Error('The id is require'));
    }
    const repo = new ProductRepository();
    const product = await repo.getById(id);
    if (!product) {
      return handleError(404, 'Product not found');
    }
    return handleSuccess({ data: product });
  } catch (err) {
    return handleError(500, err);
  }
};

const updateProductGallery = async (_req: NextRequest, _query) => {
  try {
    // const { id } = (await query?.params) ?? {};
    // if (!id) {
    //   return handleError(400, new Error('The id is require'));
    // }
    // const formData = await req.formData();
    // let image = formData.get('file') as File;
    // if (typeof image === 'string') {
    //   image = undefined;
    // }

    // const parseObject = parseFormData(formData);

    // const product: IProduct = {
    //   id: parseObject.id as string,
    //   name: parseObject.name as string,
    //   description: parseObject.description as string,
    //   price: parseObject.price as number,
    //   image: '', // This will be updated after image upload
    //   category: parseObject.category as string,
    // };

    // const repo = new ProductRepository();
    // await repo.update(product, image);

    return handleSuccess({ data: 'success' });
  } catch (err) {
    return handleError(500, err);
  }
};

export const GET = getProductGalleryById;
export const PUT = updateProductGallery;
