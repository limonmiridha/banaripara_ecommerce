require('dotenv').config();
import express from 'express';
import cors from 'cors';
import connectDB from './config/connectDB';
import router from './routes';
import cookieParser from 'cookie-parser'

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use('/api', router);

const PORT = process.env.PORT || 8000;

connectDB().then(() =>
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  })
);
