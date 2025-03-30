import { SettingsRepository } from '@/repositories/SettingsRepository';
import { handleError, handleSuccess } from '@/utils/api/response-handler';
import { NextRequest } from 'next/server';

const deleteBannerSettings = async (req: NextRequest, query: any) => {
  try {
    const { id } = (await query?.params) ?? {};
    if (!id) {
      return handleError(400, 'ID is required');
    }
    const repo = new SettingsRepository();
    await repo.deleteBanner(id);
    return handleSuccess({ data: 'Banner deleted successfully' });
  } catch (err) {
    return handleError(500, err);
  }
};

export const DELETE = deleteBannerSettings;
