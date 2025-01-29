import { IResponse } from '@/shared/models/Response';
import { NextResponse } from 'next/server';

export const handleSuccess = (data?: IResponse<unknown> ) => {
  const responseData = { ...data };
  return new NextResponse(JSON.stringify(responseData), {
    status: 200
  });
};

export const handleError = (statusCode: number, error: unknown | Error) => {
  let message = 'An unknown error occurred';
  if (error instanceof Error) {
    message = error.message;
  }
  
  return new NextResponse(
    JSON.stringify({
      message
    }),
    {
      status: statusCode
    }
  );
};