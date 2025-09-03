import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';

// Import routes
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import analyticsRoutes from './routes/analytics';
import telegramRoutes from './routes/telegram';

// Import services
import { telegramService } from './services/telegramService';

// Load environment variables
dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));

app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Trust proxy for correct IP addresses
app.set('trust proxy', 1);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    services: {
      telegram: telegramService.isReady()
    }
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/telegram', telegramRoutes);

// WebSocket handling for real-time features
io.on('connection', (socket) => {
  console.log('🔌 User connected:', socket.id);

  // Join user to their personal room for notifications
  socket.on('join-user-room', (userId: string) => {
    socket.join(`user-${userId}`);
    console.log(`👤 User ${userId} joined their room`);
  });

  // Handle skill endorsement in real-time
  socket.on('skill-endorsed', (data: { skillId: string, userId: string, skillName: string }) => {
    // Broadcast to the skill owner
    io.to(`user-${data.userId}`).emit('skill-endorsement-received', {
      skillId: data.skillId,
      skillName: data.skillName,
      timestamp: new Date().toISOString()
    });
  });

  // Handle profile view in real-time
  socket.on('profile-viewed', (data: { userId: string, viewerName?: string }) => {
    // Broadcast to the profile owner
    io.to(`user-${data.userId}`).emit('profile-view-received', {
      viewerName: data.viewerName,
      timestamp: new Date().toISOString()
    });
  });

  socket.on('disconnect', () => {
    console.log('🔌 User disconnected:', socket.id);
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('❌ Server error:', err);
  
  res.status(err.status || 500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.originalUrl
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`
🚀 ProfilePro Server Started!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌐 Server running on: http://localhost:${PORT}
🔗 Client URL: ${process.env.CLIENT_URL}
🤖 Telegram Bot: ${telegramService.isReady() ? '✅ Ready' : '❌ Not configured'}
📊 Environment: ${process.env.NODE_ENV}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 Available Endpoints:
   GET  /health
   POST /api/auth/login
   POST /api/auth/register
   GET  /api/users/profile
   PUT  /api/users/profile
   GET  /api/analytics/dashboard
   GET  /api/telegram/status

🔌 WebSocket Events:
   - join-user-room
   - skill-endorsed
   - profile-viewed
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

export default app;