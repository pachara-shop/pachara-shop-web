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
      description: (parseObject?.description as string) || '',
      price: parseObject.price as number,
      image: '', // This will be updated after image upload
      category: parseObject.category as string,
      banner: '',
      isDiscounted: (parseObject?.isDiscounted as boolean) || false,
      discountPrice: (parseObject?.discountPrice as number) || 0,
    };

    const repo = new ProductRepository();
    await repo.add(product, image, bannerFile);
    return handleSuccess({ data: 'success' });
  } catch (err) {
    return handleError(500, err);
  }
};
/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: ดึงข้อมูลสินค้าทั้งหมด
 *     description: รับรายการสินค้าทั้งหมดจากระบบ
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: รายการสินค้าทั้งหมด
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   imageUrl:
 *                     type: string
 */
export const GET = getProductList;

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: สร้างสินค้าใหม่
 *     description: เพิ่มสินค้าใหม่เข้าสู่ระบบ
 *     tags:
 *       - Products
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: สินค้าถูกสร้างเรียบร้อย
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 *       400:
 *         description: ข้อมูลไม่ถูกต้อง
 *       401:
 *         description: ยังไม่ได้เข้าสู่ระบบ
 */
export const POST = createProduct;
