import {  NextResponse } from 'next/server';

const getProduct = async () => {
  return NextResponse.json({ message: 'Hello World' });
};

export const GET = getProduct;
