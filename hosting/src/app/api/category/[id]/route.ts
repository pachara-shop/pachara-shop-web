import { CategoryRepository } from '@/repositories/be/be-category-repository';
import { handleError, handleSuccess } from '@/utils/api/response-handler';
import { NextRequest } from 'next/server';

const getCategoryById = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    if (!id) {
      return handleError(400, new Error('The id is required'));
    }

    const category = await CategoryRepository.getById(id);
    if (!category) {
      return handleError(404, 'Category not found');
    }
    return handleSuccess({ data: category });
  } catch (err) {
    return handleError(500, err);
  }
};

const updateCategory = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    if (!id) {
      return handleError(400, new Error('The id is required'));
    }

    const data = await req.json();
    await CategoryRepository.update(id, {
      ...data,
      name: data.name?.trimEnd(),
    });
    return handleSuccess({ data: 'success' });
  } catch (err) {
    return handleError(500, err);
  }
};

const deleteCategory = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    if (!id) {
      return handleError(400, new Error('The id is required'));
    }

    await CategoryRepository.delete(id);
    return handleSuccess({ data: 'success' });
  } catch (err) {
    return handleError(500, err);
  }
};

export const GET = getCategoryById;
export const PUT = updateCategory;
export const DELETE = deleteCategory;
