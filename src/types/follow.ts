import { Document, Types } from 'mongoose';

interface IFollow extends Document {
  follower_user_id: Types.ObjectId; // кто подписан
  followed_user_id: Types.ObjectId; // на кого подписаны
  created_at: Date;
}

export default IFollow;
