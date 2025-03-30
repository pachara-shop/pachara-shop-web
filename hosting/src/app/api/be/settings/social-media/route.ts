import { SettingsRepository } from '@/repositories/SettingsRepository';
import { handleError, handleSuccess } from '@/utils/api/response-handler';
import { NextRequest } from 'next/server';

const getAllSocialMedia = async () => {
  try {
    const repo = new SettingsRepository();
    const socialMedia = await repo.getSocialMedia();
    return handleSuccess({ data: socialMedia });
  } catch (err) {
    return handleError(500, err);
  }
};

const addSocialMedia = async (req: NextRequest) => {
  try {
    const data = await req.json();
    const repo = new SettingsRepository();
    await repo.addSocial(data);
    return handleSuccess({ data: 'Social media added successfully' });
  } catch (err) {
    return handleError(500, err);
  }
};

export const GET = getAllSocialMedia;
export const POST = addSocialMedia;
