import { User } from '@/app/models/user';
import { connectDb } from '@/helpers/db';
import { getResponseMessage } from '@/helpers/responseMessage';
import { NextApiRequest } from 'next';
import Error from 'next/error';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    console.log('SIGNUP API CALLED.......');

    await connectDb();
    const userBody = await req.json();
    console.log(userBody);

    const { name, email, password, profilePicture } = userBody;

    console.log('USER BODY => ', userBody);

    const newUser = new User({
      name,
      email,
      password,
      profilePicture,
    });

    const user = await newUser.save();

    return NextResponse.json(user, {
      status: 201,
    });
  } catch (err: any) {
    console.error(err);
    return getResponseMessage(
      err?.message ? err.message : 'Failed to create user',
      500,
      false
    );
  }
};
