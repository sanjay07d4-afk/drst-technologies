import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { createEnquiry, retryEnquiryIntegrations } from './controllers/enquiry.controller';

dotenv.config();

const app = express();

// Security Middlewares
app.use(helmet());

// CORS Configuration
const allowedOrigin = process.env.CORS_ORIGIN || '*';
app.use(
  cors({
    origin: allowedOrigin === '*' ? true : allowedOrigin,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

// Submission Rate Limiter: max 5 requests per 15 minutes per IP
const submissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: {
    success: false,
    message: 'Too many project enquiries submitted from this IP address. Please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// API Routes
app.post('/api/enquiries', submissionLimiter, createEnquiry);
app.post('/api/enquiries/:id/retry', retryEnquiryIntegrations);

export default app;
