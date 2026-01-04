<div align="center">

# 🛠️ Compliflow Issue Tracking System

[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

**A modern, secure MERN stack application for tracking complaints and issues**  
*Real-time filtering • User management • Enterprise security*

[🚀 Quick Start](#-quick-start) • [📖 Documentation](#-project-structure) • [🎯 Features](#-key-features) • [🛠️ Tech Stack](#️-tech-stack)

---

</div>

## 🎯 Key Features

<table>
<tr>
<td width="50%">

### 🔐 **Security First**
- JWT-based authentication
- Rate limiting protection  
- Input validation & sanitization
- CORS & security headers
- Role-based access control

</td>
<td width="50%">

### 📱 **Modern Experience**
- Responsive design (mobile-first)
- Dark/light mode toggle
- Smooth animations (Framer Motion)
- Real-time search & filtering
- Intuitive user interface

</td>
</tr>
<tr>
<td width="50%">

### 📝 **Issue Management**
- Create, update, delete issues
- Priority & category assignment
- Status tracking workflow
- Ownership controls
- Bulk operations support

</td>
<td width="50%">

### ⚡ **Performance**
- Optimized React 18 + Vite
- Efficient MongoDB queries
- Client-side caching (React Query)
- Lazy loading components
- Code splitting

</td>
</tr>
</table>

---

## 🚀 Quick Start

> **Prerequisites:** Node.js 16+ • MongoDB Atlas account • Git

### 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/compliflow.git
cd compliflow
```

<details>
<summary><b>🔧 Backend Setup</b></summary>

```bash
cd backend
npm install
cp .env.example .env
```

**Configure your `.env` file:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/compliflow
JWT_SECRET=your-super-secure-jwt-secret-key-min-32-chars
PORT=5000
NODE_ENV=development
```

```bash
# Start the backend server
npm run dev
```
✅ Backend running on `http://localhost:5000`

</details>

<details>
<summary><b>🎨 Frontend Setup</b></summary>

```bash
cd frontend
npm install
```

**Configure your `.env` file:**
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

```bash
# Start the frontend development server
npm run dev
```
✅ Frontend running on `http://localhost:5173`

</details>

### 🎉 You're Ready!
Open your browser and navigate to `http://localhost:5173` to start using Compliflow!

---

## 🛠️ Tech Stack

<div align="center">

### Frontend
![React](https://img.shields.io/badge/React%2018-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![React Query](https://img.shields.io/badge/React%20Query-FF4154?style=flat-square&logo=react-query&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-0055FF?style=flat-square&logo=framer&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat-square&logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=flat-square&logo=JSON%20web%20tokens&logoColor=white)

### Security & Tools
![Helmet.js](https://img.shields.io/badge/Helmet.js-000000?style=flat-square&logo=helmet&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=flat-square&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=black)

</div>

---

## 📊 User Journey

```mermaid
graph LR
    A[🔐 Register/Login] --> B[📝 Create Issues]
    B --> C[🔍 Filter & Search]
    C --> D[📊 Track Progress]
    D --> E[✅ Resolve Issues]
    
    style A fill:#667eea,stroke:#333,stroke-width:2px,color:#fff
    style B fill:#4ecdc4,stroke:#333,stroke-width:2px,color:#fff
    style C fill:#ffe66d,stroke:#333,stroke-width:2px,color:#333
    style D fill:#ff6b6b,stroke:#333,stroke-width:2px,color:#fff
    style E fill:#51cf66,stroke:#333,stroke-width:2px,color:#fff
```

---

## 🏗️ Project Structure

```
📁 compliflow/
├── 📁 backend/
│   ├── 📁 src/
│   │   ├── 📁 controllers/      # 🎮 Business logic & API handlers
│   │   ├── 📁 models/           # 🗃️ MongoDB schemas & models
│   │   ├── 📁 routes/           # 🛣️ API endpoint definitions
│   │   ├── 📁 middleware/       # 🛡️ Auth, validation & security
│   │   ├── 📁 utils/            # 🔧 Helper functions & utilities
│   │   └── 📁 validators/       # ✅ Input validation schemas
│   ├── 📁 scripts/              # 🤖 Utility & maintenance scripts
│   ├── 📄 package.json          # 📦 Dependencies & scripts
│   └── 📄 .env.example          # 🔐 Environment variables template
├── 📁 frontend/
│   ├── 📁 src/
│   │   ├── 📁 components/       # 🧩 Reusable UI components
│   │   ├── 📁 features/         # 🎯 Feature-specific modules
│   │   │   ├── 📁 auth/         # 🔐 Authentication components
│   │   │   └── 📁 issues/       # 📝 Issue management components
│   │   ├── 📁 api/              # 🌐 API service layer
│   │   ├── 📁 hooks/            # 🪝 Custom React hooks
│   │   ├── 📁 utils/            # 🔧 Helper functions
│   │   └── 📁 constants/        # 📋 App constants & configs
│   ├── 📄 package.json          # 📦 Dependencies & scripts
│   └── 📄 .env.example          # 🔐 Environment variables template
└── 📄 README.md                 # 📖 Project documentation
```

---

## 🚦 API Endpoints

<details>
<summary><b>🔐 Authentication Routes</b></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login` | User login |
| `POST` | `/api/auth/logout` | User logout |
| `GET` | `/api/auth/me` | Get current user |

</details>

<details>
<summary><b>📝 Issue Management Routes</b></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/issues` | Get all issues (with filters) |
| `POST` | `/api/issues` | Create new issue |
| `GET` | `/api/issues/:id` | Get specific issue |
| `PUT` | `/api/issues/:id` | Update issue |
| `DELETE` | `/api/issues/:id` | Delete issue |

</details>

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

<div align="center">

### 🌟 Show your support

Give a ⭐️ if this project helped you!

[![GitHub stars](https://img.shields.io/github/stars/your-username/compliflow?style=social)](https://github.com/your-username/compliflow/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/your-username/compliflow?style=social)](https://github.com/your-username/compliflow/network/members)

---

## 📄 License

**Made with ❤️ by [Atharva Lotankar](https://github.com/atharva-lotankar)**

---

© 2026 Atharva Lotankar. All rights reserved.

</div>
