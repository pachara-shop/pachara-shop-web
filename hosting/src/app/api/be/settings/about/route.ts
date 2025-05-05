import { SettingsRepository } from '@/repositories/SettingsRepository';
import { NextRequestWithUser, withAuth } from '@/utils/api/request-handle';
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

const updateAboutUs = async (req: NextRequestWithUser) => {
  try {
    const { data } = await req.json();
    const repo = new SettingsRepository();
    await repo.updateAbout(data);
    return handleSuccess();
  } catch (err) {
    return handleError(500, err);
  }
};

export const GET = withAuth(getAboutUs);
export const PUT = withAuth(updateAboutUs);
