import Tag from '@/app/models/tag';
import { connectDb } from '@/helpers/db';
import { getResponseMessage } from '@/helpers/responseMessage';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    await connectDb();
    const tags = await Tag.find({});

    return NextResponse.json({
      message: 'Tags found !!!',
      data: tags,
    });
  } catch (err) {
    console.error(err);
    return getResponseMessage('Failed to fetch tags', 401, false);
  }
};
