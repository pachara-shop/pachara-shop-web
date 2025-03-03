import { ProductRepository } from '@/repositories/ProductRepository';
import { IProduct } from '@/shared/models/Product';
import { handleError, handleSuccess } from '@/utils/api/handler';
import { parseFormData } from '@/utils/parseFormData';
import { NextRequest } from 'next/server';

const getProductById = async (req: NextRequest, query) => {
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

const updateProduct = async (req: NextRequest, query) => {
  try {
    const { id } = (await query?.params) ?? {};
    if (!id) {
      return handleError(400, new Error('The id is require'));
    }
    const formData = await req.formData();
    let image = formData.get('file') as File;
    if (typeof image === 'string') {
      image = undefined;
    }

    const parseObject = parseFormData(formData);

    const product: IProduct = {
      id: parseObject.id as string,
      name: parseObject.name as string,
      description: parseObject.description as string,
      price: parseObject.price as number,
      image: '', // This will be updated after image upload
      category: parseObject.category as string,
    };

    const repo = new ProductRepository();
    await repo.update(product, image);

    return handleSuccess({ data: product });
  } catch (err) {
    return handleError(500, err);
  }
};

const deleteProduct = async (req: NextRequest, query) => {
  try {
    const { id } = (await query?.params) ?? {};
    if (!id) {
      return handleError(400, new Error('The id is require'));
    }
    const repo = new ProductRepository();
    await repo.delete(id);
    return handleSuccess();
  } catch (err) {
    return handleError(500, err);
  }
};

export const DELETE = deleteProduct;
export const PUT = updateProduct;
export const GET = getProductById;
