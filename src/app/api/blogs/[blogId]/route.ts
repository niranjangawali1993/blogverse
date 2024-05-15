import { Blog } from '@/app/models/blog';
import { connectDb } from '@/helpers/db';
import { getResponseMessage } from '@/helpers/responseMessage';
import { NextApiRequest } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

interface Params {
  blogId: string;
}

export const GET = async (req: NextRequest, { params }: { params: Params }) => {
  try {
    await connectDb();

    const authToken = req.cookies.get('authToken')?.value;
    if (!authToken) {
      return NextResponse.json({
        message: 'User is not logged in !!!',
      });
    }

    // Check that JWT_KEY is not undefined
    if (!process.env.JWT_KEY) {
      throw new Error('JWT_KEY is not defined in the environment');
    }

    const userInfo: any = jwt.verify(authToken, process.env.JWT_KEY);

    const blog = await Blog.findOne({
      _id: params.blogId,
      // author: userInfo._id,
    });

    if (!blog) {
      return NextResponse.json(
        {
          message: 'No Blog found !!!',
          status: false,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: 'Blog found !!!',
      data: blog,
    });
  } catch (err) {
    console.error(err);
    return getResponseMessage('Failed to create task', 401, false);
  }
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Params }
) => {
  try {
    const blogBody = await req.json();
    const { title, content, tags } = blogBody;
    const blogId = params.blogId;

    const query = { _id: blogId };

    const update = {
      $set: {
        title,
        content,
        tags,
      },
    };

    const options = {
      returnOriginal: false,
    };

    const result = await Blog.findOneAndUpdate(query, update, options);

    return NextResponse.json(
      {
        message: 'Record updated successfully !!!',
        data: result,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error(err);
    return getResponseMessage('Failed to create task', 401, false);
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Params }
) => {
  try {
    await connectDb();

    const authToken = req.cookies.get('authToken')?.value;
    if (!authToken) {
      return NextResponse.json({
        message: 'User is not logged in !!!',
      });
    }

    // Check that JWT_KEY is not undefined
    if (!process.env.JWT_KEY) {
      throw new Error('JWT_KEY is not defined in the environment');
    }

    const userInfo: any = jwt.verify(authToken, process.env.JWT_KEY);

    const blog = await Blog.findOne({
      _id: params.blogId,
      author: userInfo._id,
    });

    if (!blog) {
      return NextResponse.json(
        {
          message: 'No Blog found !!!',
          status: false,
        },
        { status: 400 }
      );
    }

    const result = await Blog.findByIdAndDelete(params.blogId);

    return NextResponse.json({
      message: 'Blog deleted successfully !!!',
      data: result,
    });
  } catch (err) {
    console.error(err);
    return getResponseMessage('Failed to create task', 401, false);
  }
};
