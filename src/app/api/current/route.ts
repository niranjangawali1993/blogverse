import { connectDb } from '@/helpers/db';
import { getResponseMessage } from '@/helpers/responseMessage';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { User } from '@/app/models/user';

export const GET = async (req: NextRequest) => {
  try {
    await connectDb();
    const authToken = req.cookies.get('authToken')?.value;

    if (!authToken) {
      return NextResponse.json({
        message: 'User is not logged in !!!',
      });
    }

    const jwtAuthToken = process.env?.JWT_KEY;

    if (!jwtAuthToken) {
      throw new Error('JWT_KEY is not defined');
    }
    const userInfo: any = jwt.verify(authToken, jwtAuthToken);
    let user = undefined;
    if (userInfo)
      user = await User.findOne({ _id: userInfo?._id }).select('-password');

    return NextResponse.json({
      message: 'Current user details found !!!',
      user: user,
    });
  } catch (err) {
    console.error(err);
    console.error((err as Error).message);

    return getResponseMessage(
      (err as Error)?.message
        ? (err as Error).message
        : 'Failed to create task',
      401,
      false
    );
  }
};
