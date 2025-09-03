# 🚀 ProfilePro - Professional Dashboard & Profile Management

A comprehensive, interactive, and feature-rich professional dashboard built with React, TypeScript, and modern web technologies. ProfilePro provides a complete solution for managing professional profiles, skills, analytics, and real-time interactions with Telegram integration.

![ProfilePro Dashboard](https://img.shields.io/badge/Status-Production%20Ready-green)
![React](https://img.shields.io/badge/React-18.x-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)

## ✨ Features

### 🎨 **Modern UI/UX**
- **Glassmorphism Design** with backdrop blur effects
- **Dark/Light Mode** with system preference detection
- **Responsive Layout** - mobile-first approach
- **Smooth Animations** using Framer Motion
- **Interactive Components** with hover effects and micro-interactions

### 👤 **Profile Management**
- **Comprehensive User Profiles** with cover photos and avatars
- **Interactive Skills System** with endorsements and progress tracking
- **Activity Feed** showing real-time profile interactions
- **Profile Analytics** with detailed insights and charts
- **Lazy Image Loading** for optimal performance

### 📊 **Analytics Dashboard**
- **Real-time Metrics** with WebSocket updates
- **Interactive Charts** using Recharts
- **Drag-and-Drop Widgets** for customizable dashboards
- **Data Export** (JSON/CSV formats)
- **Engagement Analytics** with trend analysis

### 🔔 **Real-time Features**
- **WebSocket Integration** for live updates
- **Toast Notifications** with custom styling
- **Real-time Skill Endorsements**
- **Live Profile View Tracking**
- **Instant Activity Updates**

### 🤖 **Telegram Integration**
- **Bot Commands** for profile management
- **Real-time Notifications** via Telegram
- **Account Linking** with secure authentication
- **Profile Stats** directly in Telegram
- **Activity Alerts** and endorsement notifications

### 🔐 **Authentication & Security**
- **JWT Authentication** with refresh tokens
- **Protected Routes** with automatic redirects
- **Session Management** with localStorage
- **API Security** with CORS and Helmet
- **Input Validation** and error handling

## 🛠️ Tech Stack

### **Frontend**
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router v6** for navigation
- **Recharts** for data visualization
- **React DnD** for drag-and-drop
- **Socket.io Client** for real-time features
- **React Hot Toast** for notifications

### **Backend**
- **Node.js** with Express
- **TypeScript** for type safety
- **Socket.io** for WebSocket communication
- **JWT** for authentication
- **Node Telegram Bot API** for bot integration
- **CORS & Helmet** for security
- **Morgan** for logging

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Telegram Bot Token (optional, for bot features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd profilepro-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration:
   ```env
   PORT=3001
   JWT_SECRET=your-super-secret-jwt-key
   TELEGRAM_BOT_TOKEN=your-telegram-bot-token
   CLIENT_URL=http://localhost:5173
   ```

4. **Start Development Servers**
   ```bash
   # Start both client and server
   npm run dev
   
   # Or start individually
   npm run dev:client  # Frontend only
   npm run dev:server  # Backend only
   ```

5. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001
   - Health Check: http://localhost:3001/health

### Demo Credentials
```
Email: john.doe@example.com
Password: password
```

## 📁 Project Structure

```
profilepro-dashboard/
├── src/                          # Frontend source code
│   ├── components/               # React components
│   │   ├── ui/                  # Reusable UI components
│   │   ├── layout/              # Layout components
│   │   ├── profile/             # Profile-specific components
│   │   ├── dashboard/           # Dashboard widgets
│   │   └── analytics/           # Analytics components
│   ├── pages/                   # Page components
│   ├── contexts/                # React contexts
│   ├── hooks/                   # Custom hooks
│   ├── services/                # API and WebSocket services
│   ├── types/                   # TypeScript definitions
│   └── data/                    # Mock data
├── server/                      # Backend source code
│   ├── controllers/             # API controllers
│   ├── middleware/              # Express middleware
│   ├── routes/                  # API routes
│   ├── services/                # Business logic
│   ├── models/                  # Data models
│   ├── config/                  # Configuration
│   └── utils/                   # Utility functions
└── public/                      # Static assets
```

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start both client and server
npm run dev:client   # Start frontend only
npm run dev:server   # Start backend only

# Building
npm run build        # Build frontend
npm run build:server # Build backend

# Production
npm run start:server # Start production server

# Linting
npm run lint         # Run ESLint
```

### API Endpoints

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - User logout

#### User Management
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/skills` - Get user skills
- `POST /api/users/skills` - Add new skill
- `POST /api/users/skills/:id/endorse` - Endorse skill
- `DELETE /api/users/skills/:id` - Delete skill

#### Analytics
- `GET /api/analytics/dashboard` - Dashboard summary
- `GET /api/analytics/profile-views` - Profile views analytics
- `GET /api/analytics/skills` - Skills analytics
- `GET /api/analytics/engagement` - Engagement analytics
- `GET /api/analytics/export` - Export user data

#### Telegram
- `GET /api/telegram/status` - Bot status
- `POST /api/telegram/webhook` - Telegram webhook
- `POST /api/telegram/test-notification` - Test notification

### WebSocket Events

#### Client → Server
- `join-user-room` - Join user's notification room
- `skill-endorsed` - Emit skill endorsement
- `profile-viewed` - Emit profile view

#### Server → Client
- `skill-endorsement-received` - Real-time endorsement notification
- `profile-view-received` - Real-time profile view notification
- `notification` - General notifications

## 🤖 Telegram Bot Setup

1. **Create a Telegram Bot**
   - Message @BotFather on Telegram
   - Use `/newbot` command
   - Get your bot token

2. **Configure Environment**
   ```env
   TELEGRAM_BOT_TOKEN=your_bot_token_here
   TELEGRAM_WEBHOOK_URL=your_webhook_url
   ```

3. **Bot Commands**
   - `/start` - Welcome message
   - `/link <email>` - Link ProfilePro account
   - `/profile` - View profile statistics
   - `/unlink` - Unlink account
   - `/help` - Show help message

## 🎨 Customization

### Theme Configuration
Edit `tailwind.config.js` to customize colors, fonts, and design system:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom color palette
      }
    }
  }
}
```

### Component Styling
All components use Tailwind CSS with custom utilities for glassmorphism effects:

```css
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Railway/Heroku)
```bash
npm run build:server
npm run start:server
```

### Environment Variables for Production
```env
NODE_ENV=production
JWT_SECRET=your-production-jwt-secret
DATABASE_URL=your-production-database-url
TELEGRAM_BOT_TOKEN=your-production-bot-token
CLIENT_URL=https://your-frontend-domain.com
```

## 🧪 Testing

```bash
# API Health Check
curl http://localhost:3001/health

# WebSocket Connection Test
# Use browser dev tools to test Socket.io connection
```

## 📈 Performance Features

- **Lazy Loading** for images and components
- **React.memo** for component optimization
- **Virtual Scrolling** for large lists
- **Code Splitting** with dynamic imports
- **Debounced Search** for better UX
- **Optimized Bundle Size** with tree shaking

## 🔒 Security Features

- **JWT Authentication** with secure refresh tokens
- **CORS Protection** for API endpoints
- **Helmet.js** for security headers
- **Input Validation** and sanitization
- **XSS Protection** built-in
- **Rate Limiting** ready for implementation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **TailAdmin** for design inspiration
- **Framer Motion** for smooth animations
- **Recharts** for beautiful data visualization
- **React DnD** for drag-and-drop functionality
- **Socket.io** for real-time communication

---

<div align="center">
  <p>Made with ❤️ by the ProfilePro Team</p>
  <p>⬆ <a href="#-profilepro---professional-dashboard--profile-management">Back to Top</a></p>
</div>