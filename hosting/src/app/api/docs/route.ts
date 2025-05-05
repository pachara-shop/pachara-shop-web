import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function GET() {
  const { getApiDocs } = await import('@/lib/swagger');
  return NextResponse.json(getApiDocs());
}
