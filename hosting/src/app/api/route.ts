import { NextResponse } from 'next/server';

const helloWorld = async () => {
  return NextResponse.json({ message: 'Hello World' });
};

export const GET = helloWorld;
