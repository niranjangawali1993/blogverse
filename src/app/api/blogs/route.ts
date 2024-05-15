import { Blog } from '@/app/models/blog';
import { connectDb } from '@/helpers/db';
import { getResponseMessage } from '@/helpers/responseMessage';
import { NextRequest, NextResponse } from 'next/server';
import getUserFromToken from '@/helpers/jwt';

export const POST = async (req: NextRequest) => {
  try {
    await connectDb();

    const authToken = req.cookies.get('authToken')?.value;

    if (!authToken) {
      return NextResponse.json({
        message: 'User is not logged in !!!',
      });
    }
    const userInfo: any = await getUserFromToken(authToken);

    const blogBody = await req.json();
    const { title, content, tags } = blogBody;
    const newBlog = new Blog({
      title,
      content,
      author: userInfo?._id,
      tags,
    });

    const createdBlog = await newBlog.save();

    return NextResponse.json(createdBlog, {
      status: 201,
    });
  } catch (err) {
    console.error(err);
    return getResponseMessage('Failed to create task', 401, false);
  }
};

interface Params {
  userId: string;
}

export const GET = async (req: NextRequest, { params }: { params: Params }) => {
  let blogs: any = [];
  try {
    await connectDb();

    const pageParam = req.nextUrl.searchParams.get('page');

    if (!pageParam) {
      return new NextResponse(
        JSON.stringify({
          message: 'Page parameter is required',
          status: false,
        }),
        {
          status: 400,
        }
      );
    }

    const pageNumber = parseInt(pageParam, 10) || 1;
    const limit = 10;
    const skip = (pageNumber - 1) * limit;

    if (params) {
      blogs = await Blog.find({ author: params.userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    } else {
      blogs = await Blog.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    }

    return NextResponse.json({
      message: 'Blogs found !!!',
      data: blogs,
      count: blogs.length,
      status: true,
    });
  } catch (err) {
    console.error(err);
    return getResponseMessage('Failed to get tasks', 401, false);
  }
};
