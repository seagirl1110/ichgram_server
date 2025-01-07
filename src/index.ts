import express from 'express';
import 'dotenv/config';
import connectDB from './config/db';
import authRoutes from './routes/auth';

const app = express();
app.use(express.json());

connectDB();

const port = process.env.PORT || '3333';

app.get('/', (req, res) => {
  res.status(200).send('Server running!');
});

app.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});

app.use('/auth', authRoutes);
