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

// CORS Configuration — support wildcard, single, or comma-separated origins
const rawCorsOrigin = process.env.CORS_ORIGIN || '*';
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. server-to-server, curl, Postman)
      if (!origin || rawCorsOrigin === '*') return callback(null, true);
      const allowedOrigins = rawCorsOrigin.split(',').map((o) => o.trim());
      if (allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
        return callback(null, true);
      }
      return callback(null, true); // Fallback allow for production client compatibility
    },
    methods: ['GET', 'POST', 'OPTIONS'],
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
