import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import postRoutes from './routes/post';
import searchRoutes from './routes/search';
import commentRoutes from './routes/comment';
import LikeRoutes from './routes/like';
import FollowRoutes from './routes/follow';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

const port = process.env.PORT || '3333';

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/post', postRoutes);
app.use('/search', searchRoutes);
app.use('/comment', commentRoutes);
app.use('/like', LikeRoutes);
app.use('/follow', FollowRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});
