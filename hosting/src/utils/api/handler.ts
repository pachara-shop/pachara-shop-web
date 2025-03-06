import { ISearchResponse } from '@/shared/models/Response';
import { NextResponse } from 'next/server';

export const handleSuccess = (
  data?: ISearchResponse<unknown>
): NextResponse => {
  const responseData = { ...data };
  return new NextResponse(JSON.stringify(responseData), {
    status: 200,
  });
};

export const handleError = (
  statusCode: number,
  error: unknown | Error | string
): NextResponse => {
  let message = 'An unknown error occurred';
  if (error instanceof Error) {
    message = error.message;
  }
  if (typeof error === 'string') {
    message = error;
  }

  return new NextResponse(
    JSON.stringify({
      message,
    }),
    {
      status: statusCode,
    }
  );
};
