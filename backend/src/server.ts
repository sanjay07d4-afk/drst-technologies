import dotenv from 'dotenv';
dotenv.config();

import app from './app';

const PORT = Number(process.env.PORT) || 5000;

const server = app.listen(PORT, () => {
  console.log(`[DRST Server] Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Explicit error handler for port conflicts and system errors
server.on('error', (err: any) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n[DRST Server] Error: Port ${PORT} is already in use.`);
    console.error(`[DRST Server] Stop the existing backend process before starting another instance.\n`);
    process.exit(1);
  } else {
    console.error('[DRST Server] Server unexpected error:', err);
    process.exit(1);
  }
});

// Graceful shutdown handling for clean signal releases
const gracefulShutdown = (signal: string) => {
  console.log(`\n[DRST Server] ${signal} signal received. Closing HTTP server...`);
  server.close(() => {
    console.log('[DRST Server] HTTP server closed cleanly. Port 5000 released.');
    process.exit(0);
  });

  // Force close after 3 seconds if open sockets hang
  setTimeout(() => {
    console.error('[DRST Server] Force shutting down unclosed connections.');
    process.exit(1);
  }, 3000);
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
