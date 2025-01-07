import { Schema, model } from 'mongoose';
import IUser from '../types/user';

const userSchema = new Schema<IUser>({
  fullName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
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
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const User = model<IUser>('User', userSchema);

export default User;
