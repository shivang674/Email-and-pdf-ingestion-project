import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const configs = await prisma.emailIngestionConfig.findMany();
    return NextResponse.json(configs);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch configurations' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { emailAddress, connectionType, username, password, host } = await request.json();

    const newConfig = await prisma.emailIngestionConfig.create({
      data: {
        emailAddress,
        connectionType,
        username,
        password,
        host,
      },
    });

    return NextResponse.json(newConfig, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to save configuration' }, { status: 500 });
  }
}