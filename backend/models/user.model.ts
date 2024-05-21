import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    profilePicture: {
      type: String,
    },
    username: {
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
    role: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('user', userSchema);

export default User;
