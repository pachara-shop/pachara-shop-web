import { SettingsRepository } from '@/repositories/SettingsRepository';
import { handleError, handleSuccess } from '@/utils/api/response-handler';

const getAboutUs = async () => {
  try {
    const repo = new SettingsRepository();
    const aboutUsText = await repo.getAbout();
    return handleSuccess({ data: aboutUsText });
  } catch (err) {
    return handleError(500, err);
  }
};

export const GET = getAboutUs;
