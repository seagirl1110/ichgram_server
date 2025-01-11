import { Document, Types } from 'mongoose';

interface IUser extends Document {
  full_name: string;
  username: string;
  email: string;
  password: string;
  bio: string;
  image: string;
  posts_count: number;
  followers_count: number;
  following_count: number;
  posts: Types.ObjectId[];
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  created_at: Date;
}

export interface IUpdateProfileBody {
  username?: string;
  bio?: string;
}

export interface IGetProfileParams {
  userId: string;
}

export default IUser;
