import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import { notFound, errorHandler } from './middleware/error.middleware.js';
import { connectDB } from './config/db.js';

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'https://frntd-tau.vercel.app',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({
      message: 'Database connection failed',
    });
  }
});

app.get('/api/health', (req, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
