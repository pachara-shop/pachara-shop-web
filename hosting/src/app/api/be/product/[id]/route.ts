import { BeProductRepository } from '@/repositories/be/be-product-repository';
import { IProduct } from '@/shared/models/Product';
// import { QueryReq } from '@/shared/types';
import { handleError, handleSuccess } from '@/utils/api/response-handler';
import { parseFormData } from '@/utils/parseFormData';
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

const updateProduct = async (req: NextRequest, query: any) => {
  try {
    const { id } = (await query?.params) ?? {};
    if (!id) {
      return handleError(400, new Error('The id is require'));
    }
    const formData = await req.formData();
    let image: File | undefined = formData.get('file') as File;
    if (typeof image === 'string') {
      image = undefined;
    }
    let bannerFile: File | undefined = formData.get('bannerFile') as File;
    if (typeof bannerFile === 'string') {
      bannerFile = undefined;
    }

    const parseObject = parseFormData(formData);

    const product: IProduct = {
      id: parseObject.id as string,
      name: parseObject.name as string,
      description: (parseObject.description as string) || '',
      price: parseObject.price as number,
      image: '', // This will be updated after image upload
      category: parseObject.category as string,
      banner: '',
      highlight: (parseObject.highlight as boolean) || false,
      isDiscounted: (parseObject.isDiscounted as boolean) || false,
      discountPrice: (parseObject.discountPrice as number) || 0,
    };

    const repo = new BeProductRepository();
    await repo.update(product, image, bannerFile);

    return handleSuccess({ data: product });
  } catch (err) {
    return handleError(500, err);
  }
};

const deleteProduct = async (req: NextRequest, query: any) => {
  try {
    const { id } = (await query?.params) ?? {};
    if (!id) {
      return handleError(400, new Error('The id is require'));
    }
    const repo = new BeProductRepository();
    await repo.delete(id);
    return handleSuccess();
  } catch (err) {
    return handleError(500, err);
  }
};

export const DELETE = deleteProduct;
export const PUT = updateProduct;
export const GET = getProductById;
