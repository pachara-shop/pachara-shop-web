import { CategoryRepository } from '@/Repository/CategoryRepository';
import { handleError, handleSuccess } from '@/utils/api/handler';
import { getSearchParamsFromRequest } from '@/utils/api/search';
import { NextRequest } from 'next/server';

const getCategoryList = async (req: NextRequest) => {
  try {
    const params = getSearchParamsFromRequest(req.nextUrl);
    const category = await CategoryRepository.getAll(params);
    if (!category) {
      return handleError(404, 'Category not found');
    }
    return handleSuccess({
      data: category.categories,
      pagination: { ...params.pagination, total: category.totalCount },
    });
  } catch (err) {
    return handleError(500, err);
  }
};

const createCategory = async (req: NextRequest) => {
  try {
    const data = await req.json();
    await CategoryRepository.create(data);
    return handleSuccess({ data: 'success' });
  } catch (err) {
    return handleError(500, err);
  }
};

export const GET = getCategoryList;
export const POST = createCategory;
