import { CategoryRepository } from '@/repositories/be/be-category-repository';
import { handleError, handleSuccess } from '@/utils/api/response-handler';

const getCategoryOptions = async () => {
  try {
    const category = await CategoryRepository.getCategoryOption();
    if (!category) {
      return handleError(404, 'Category not found');
    }
    return handleSuccess({
      data: category,
    });
  } catch (err) {
    return handleError(500, err);
  }
};

export const GET = getCategoryOptions;
