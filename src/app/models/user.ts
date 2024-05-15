import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password')) {
      const saltEnv = process.env.BCRYPT_SALT;
      const saltRounds = saltEnv ? Number(saltEnv) : 10;
      const salt = await bcrypt.genSalt(saltRounds);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } else {
      next();
    }
  } catch (error) {
    next(error as Error);
  }
});

export const User =
  mongoose.models.users || mongoose.model('users', userSchema);
