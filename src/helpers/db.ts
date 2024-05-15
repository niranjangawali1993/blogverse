import mongoose from 'mongoose';

const config = {
  isConnected: false,
};

export const connectDb = async () => {
  if (config.isConnected) {
    console.log('Already connected to DB');
    return;
  }

  if (!process.env.MONGO_DB_URL) {
    throw new Error('MONGO_DB_URL is not defined');
  }

  try {
    const { connection } = await mongoose.connect(process.env.MONGO_DB_URL, {
      dbName: 'blogverse_db',
    });

    console.log('Db Connected !!!!');

    config.isConnected = connection.readyState === 1;
  } catch (error) {
    console.error('Failed with connection', error);
    throw error;
  }
};
