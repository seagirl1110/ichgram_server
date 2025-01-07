import express from 'express';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3333;

app.get('/', (req, res) => {
  res.status(200).send('Server running!');
});

app.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});
