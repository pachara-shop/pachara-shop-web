import { AuthRepository } from '@/repositories/AuthRepository';
import { handleError } from '@/utils/api/handler';
import { NextRequest, NextResponse } from 'next/server';

const login = async (req: NextRequest) => {
  try {
    const data = await req.json();
    const repo = new AuthRepository();
    const userCredential = await repo.login(data.username, data.password);
    const token = await userCredential.getIdToken();
    const response = NextResponse.json({ data: { token } });
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    return response;
  } catch (err) {
    return handleError(500, err);
  }
};

export const POST = login;
