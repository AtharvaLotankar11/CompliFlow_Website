# 🛠️ Compliflow Issue Tracking System

A modern, secure **MERN stack** application for tracking complaints and issues with real-time filtering and user management.

*Built with React 18, Node.js, MongoDB, Tailwind CSS & Framer Motion*

## ✨ Key Features

- 🔐 **Secure Authentication**: JWT-based login/registration with rate limiting
- 📝 **Issue Management**: Create, update, delete, and track issues with ownership controls
- 🔍 **Smart Filtering**: Filter by status, priority, category with real-time search
- 🎨 **Modern UI**: Responsive design with dark/light mode and smooth animations
- 🛡️ **Enterprise Security**: Input validation, CORS protection, security headers
- 📱 **Mobile Ready**: Fully responsive across all devices

## 📊 User Flow

1. **Register/Login** - Create account or sign in
2. **Create Issues** - Add complaints with priority levels
3. **Manage/Filter** - Update status and search through issues
4. **Track Progress** - Monitor issue resolutions

## ⚡ Quick Start

### Prerequisites
- Node.js 16+
- MongoDB Atlas account

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd compliflow
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

### Environment Configuration

**Backend .env:**
```env
MONGODB_URI=mongodb+srv://your-connection-string/compliflow
JWT_SECRET=your-super-secure-jwt-secret-key
```

**Frontend .env:**
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## 🛠️ Tech Stack

| Frontend | Backend |
|----------|---------|
| React 18 + Vite | Node.js + Express |
| Tailwind CSS | MongoDB + Mongoose |
| React Query | JWT + Security Middleware |
| Framer Motion | Helmet.js + Rate Limiting |

## 🏗️ Project Structure

```
compliflow/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Business logic
│   │   ├── models/          # DB schemas
│   │   ├── routes/          # API endpoints
│   │   ├── middleware/      # Auth & validation
│   │   └── utils/           # Helper functions
│   ├── scripts/             # Utility scripts
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── features/        # Auth & Issues modules
│   │   ├── api/             # API layer
│   │   └── utils/           # Helper functions
│   └── package.json
└── README.md
```

## 📄 License

**MIT License** - Use, modify, and distribute freely.
