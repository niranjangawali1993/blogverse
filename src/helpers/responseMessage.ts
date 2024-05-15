import { NextResponse } from 'next/server';

export const getResponseMessage = (
  message: string,
  statusCode: number,
  successStatus: boolean
) => {
  return NextResponse.json(
    {
      message: message,
      success: successStatus,
    },
    {
      status: statusCode,
    }
  );
};
