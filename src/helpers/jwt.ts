import jwt from 'jsonwebtoken';

const getUserFromToken = async (token: string) => {
  const secret = process.env.JWT_KEY;
  if (!secret) {
    throw new Error('JWT_KEY is not defined');
  }

  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    throw new Error('Token verification failed');
  }
};

export default getUserFromToken;
