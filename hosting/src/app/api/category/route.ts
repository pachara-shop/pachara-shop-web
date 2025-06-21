import { CategoryRepository } from '@/repositories/be/be-category-repository';
import { NextRequestWithUser, withAuth } from '@/utils/api/request-handle';
import { handleError, handleSuccess } from '@/utils/api/response-handler';
import { getSearchParamsFromRequest } from '@/utils/api/search';
import { NextRequest } from 'next/server';
export const runtime = 'nodejs';

const getCategoryList = async (req: NextRequestWithUser) => {
  try {
    const params = getSearchParamsFromRequest(req.nextUrl);
    const result = await CategoryRepository.searchCategory(params);
    if (!result) {
      return handleError(404, 'Category not found');
    }
    return handleSuccess({
      data: result.categories,
      pagination: { ...params.pagination, total: result.totalCount },
    });
  } catch (err) {
    return handleError(500, err);
  }
};

const createCategory = async (req: NextRequest) => {
  try {
    const data = await req.json();
    await CategoryRepository.create({ ...data, name: data.name?.trimEnd() });
    return handleSuccess({ data: 'success' });
  } catch (err) {
    return handleError(500, err);
  }
};

export const GET = withAuth(getCategoryList);
export const POST = createCategory;
