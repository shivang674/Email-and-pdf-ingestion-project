import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const pdfs = await prisma.pDFMetadata.findMany();
    return NextResponse.json(pdfs);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch PDF metadata' }, { status: 500 });
  }
}