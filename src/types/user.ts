import { Document, Types } from 'mongoose';

interface IUser extends Document {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  posts: Types.ObjectId[];
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
}

export default IUser;
