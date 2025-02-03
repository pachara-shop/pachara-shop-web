import { CategoryRepository } from '@/Repository/CategoryRepository';
import { handleError, handleSuccess } from '@/utils/api/handler';
import { NextRequest } from 'next/server';

const getCategoryList = async () => {
  try {
    const category = await CategoryRepository.getAll();
    if (!category) {
      return handleError(404, 'Category not found');
    }
    return handleSuccess({ data: category });
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
