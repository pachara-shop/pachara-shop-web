import { SettingsRepository } from '@/repositories/SettingsRepository';
import { handleSuccess, handleError } from '@/utils/api/response-handler';
import { NextRequest } from 'next/server';

const updateSocialMedia = async (req: NextRequest, query: any) => {
  try {
    const { id } = (await query?.params) ?? {};
    const data = await req.json();
    const repo = new SettingsRepository();
    await repo.updateSocial(id, data);
    return handleSuccess();
  } catch (err) {
    return handleError(500, err);
  }
};

const deleteSocialMedia = async (req: NextRequest, query: any) => {
  try {
    const { id } = (await query?.params) ?? {};
    if (!id) {
      return handleError(400, 'ID is required');
    }
    const repo = new SettingsRepository();
    await repo.deleteSocial(id);
    return handleSuccess({ data: 'Social media deleted successfully' });
  } catch (err) {
    return handleError(500, err);
  }
};

export const PUT = updateSocialMedia;
export const DELETE = deleteSocialMedia;
