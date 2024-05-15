import { NextRequest, NextResponse } from 'next/server';

export const GET = async () => {
  const response = NextResponse.json({
    message: 'User logged out successfully !!!',
    status: true,
  });
  response.cookies.set('authToken', '', {
    expires: new Date(0), // 1 day in milliseconds
    httpOnly: true,
  });
  return response;
};
