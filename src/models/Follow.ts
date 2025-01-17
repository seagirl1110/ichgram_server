import { Schema, model } from 'mongoose';
import IFollow from '../types/follow';

const followSchema = new Schema<IFollow>({
  follower_user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  followed_user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  created_at: { type: Date, default: Date.now },
});

const Follow = model('Follow', followSchema);

export default Follow;
