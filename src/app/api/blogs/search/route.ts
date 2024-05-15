import { Blog } from '@/app/models/blog';
import { getResponseMessage } from '@/helpers/responseMessage';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  let searchField = null;
  try {
    if (req.nextUrl.searchParams.get('q')) {
      searchField = req.nextUrl.searchParams.get('q');
    }

    const blogs = await Blog.find({
      title: { $regex: searchField, $options: 'i' },
    });

    if (blogs.length == 0) {
      return NextResponse.json(
        {
          message: 'No Blog found !!!',
          status: false,
        },
        { status: 200 }
      );
    }

    return NextResponse.json({
      message: 'Blog found !!!',
      data: blogs,
    });
  } catch (err) {
    console.error(err);
    return getResponseMessage('Failed to fetch task', 401, false);
  }
};
