import { User } from '@/app/models/user';
import { connectDb } from '@/helpers/db';
import { NextApiRequest } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { getResponseMessage } from '@/helpers/responseMessage';

export const POST = async (req: NextRequest) => {
  try {
    await connectDb();
    const userBody = await req.json();
    const { email, password } = userBody;

    console.log(userBody);

    const selectedUser = await User.findOne({ email: email });

    if (selectedUser === null) {
      throw new Error('User not found !!!');
    }

    const matched = bcrypt.compareSync(password, selectedUser.password);

    if (!matched) {
      throw new Error('Incorrect password provided !!!');
    }

    // Check that JWT_KEY is not undefined
    if (!process.env.JWT_KEY) {
      throw new Error('JWT_KEY is not defined in the environment');
    }

    const token = jwt.sign(
      { _id: selectedUser._id, name: selectedUser.name },
      process.env.JWT_KEY
    );

    const response = NextResponse.json({
      message: 'User logged in successfully !!!',
      user: selectedUser,
      token: token,
    });

    response.cookies.set('authToken', token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day in milliseconds
      httpOnly: true,
    });

    return response;
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
