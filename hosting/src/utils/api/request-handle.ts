import { User } from 'firebase/auth';
import { NextRequest, NextResponse } from 'next/server';

export type NextRequestWithUser = NextRequest & { user: User };

export function withAuth(
  handler: (req: NextRequestWithUser) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    const user = {} as User;
    const newReq = req as NextRequestWithUser;
    newReq.user = user;
    return await handler(newReq); // Pass user to handler
  };
}
