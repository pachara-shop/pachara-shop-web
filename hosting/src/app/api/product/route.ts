import { ProductRepository } from '@/repositories/ProductRepository';
import { IProduct } from '@/shared/models/Product';
import { handleError, handleSuccess } from '@/utils/api/response-handler';
import { getSearchParamsFromRequest } from '@/utils/api/search';
import { parseFormData } from '@/utils/parseFormData';
import { NextRequest } from 'next/server';

const getProductList = async (req: NextRequest) => {
  try {
    const params = getSearchParamsFromRequest(req.nextUrl);
    const repo = new ProductRepository();
    const product = await repo.getAll(params);
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
    const formData = await req.formData();
    const image = formData.get('file') as File;
    const bannerFile = formData.get('bannerFile') as File;

    const parseObject = parseFormData(formData);

    const product: IProduct = {
      id: parseObject.id as string,
      name: parseObject.name as string,
      description: parseObject.description as string,
      price: parseObject.price as number,
      image: '', // This will be updated after image upload
      category: parseObject.category as string,
      banner: '',
    };

    const repo = new ProductRepository();
    await repo.add(product, image, bannerFile);
    return handleSuccess({ data: 'success' });
  } catch (err) {
    return handleError(500, err);
  }
};

export const GET = getProductList;
export const POST = createProduct;
