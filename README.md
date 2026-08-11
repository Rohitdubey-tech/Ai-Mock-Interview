# 🚀 AI Mock Interview Platform — Full Stack MERN Engine

[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v18+-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-v5.4+-purple.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v3+-38bdf8.svg)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47a248.svg)](https://www.mongodb.com/)

An enterprise-grade, full-stack **AI-powered Mock Interview Platform** built with **React, Node.js, Express, and MongoDB**. Designed to simulate real-world technical interviews with AI-driven voice evaluation, a LeetCode-style coding sandbox, ATS resume review, timed MCQ quizzes, and performance analytics.

---

## 🎯 Executive Summary for Technical Recruiters

This repository demonstrates modern full-stack software engineering principles, clean component architecture, real-time audio API integration, secure data segregation, and high-performance UI design. 

### 🌟 Key Highlights & Capabilities
- **🎙️ Real-Time AI Voice & Speech Recognition Engine**: Simulates live interviewer Q&A using Web Speech Synthesis and real-time audio Speech Recognition with instant AI benchmark evaluations.
- **💻 LeetCode Practice Sandbox**: Comprehensive coding environment supporting **all 17 DSA topics** across **5 programming languages** (*C, C++, Java, Python 3, JavaScript*) with blank starter signatures and testcase runners.
- **📝 ATS Resume Review & Timed MCQ Quizzes**: Automated resume keyword scanner matching target job descriptions, paired with 30-second timed MCQ technical quizzes.
- **🎨 Obsidian Glassmorphic UI & Dual Theme Engine**: Modern UI matching high-end trading/dashboard standards with instant **Light Mode** and **Dark Mode** toggle.
- **🔒 Secure Data Segregation**: Strict isolation between Demo preview accounts and genuine logged-in user accounts.

---

## 🛠️ Technology Stack

### **Frontend Architecture**
- **Framework**: React 18 (Vite Bundler)
- **Styling**: Vanilla CSS3 + TailwindCSS (Custom Glassmorphism Utilities)
- **State & Auth**: React Context API (`AuthContext`), Persistent `localStorage` token management
- **Analytics & Visuals**: Recharts (Radar Competency Charts, Area Score Trajectories)
- **Icons & Media**: Lucide React, Custom 3D Asset Renders
- **APIs**: Web Speech API (`SpeechSynthesis`, `SpeechRecognition`), Axios HTTP client

### **Backend Architecture**
- **Runtime & Framework**: Node.js, Express.js
- **Database**: MongoDB Atlas (Mongoose ODM) with fallback in-memory store
- **Security**: JSON Web Tokens (JWT), Helmet.js security headers, CORS protection, bcryptjs password hashing
- **Environment**: Dotenv environment variable scoping

---

## 📁 Repository Structure

```
AI-Mock-Interview/
├── backend/
│   ├── src/
│   │   ├── config/          # Database connection (MongoDB Atlas)
│   │   ├── controllers/     # Auth, Interview, Question & Answer business logic
│   │   ├── middlewares/     # Auth verification & Error handlers
│   │   ├── models/          # Mongoose Schemas (User, Interview, Question, Answer)
│   │   ├── routes/          # Express API Endpoints
│   │   ├── services/        # AI Service integrations
│   │   └── app.js           # Express app setup & Static production asset server
│   ├── server.js            # Server entrypoint
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Sidebar, InterviewWizardModal, Header, Navbar
│   │   ├── context/         # AuthContext (User state, Theme toggle, Axios instance)
│   │   ├── data/            # LeetCode problem database (17 DSA topics)
│   │   ├── pages/           # Dashboard, InterviewRoom, CodingRound, MCQRound, ResumeReview, Analytics
│   │   ├── App.jsx          # Application routes & layout
│   │   └── index.css        # Core design system & theme variables
│   ├── public/              # Production graphics & assets
│   └── package.json
│
├── .gitignore               # Strict exclusion of secrets, dependencies, & build artifacts
├── package.json             # Root monorepo build & start scripts
└── README.md
```

---

## 🚀 Getting Started (Local Development)

### **Prerequisites**
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/AI-Mock-Interview.git
cd AI-Mock-Interview
```

### **2. Install Dependencies**
```bash
npm run install-all
```

### **3. Environment Setup**
Create a `.env` file inside the `backend/` directory:
```env
PORT=5001
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_jwt_key
OPENAI_API_KEY=your_openai_key
```

### **4. Start Development Servers**
Run both backend and frontend concurrently:
```bash
npm run dev
```
- **Frontend App**: `http://localhost:3001`
- **Backend API**: `http://localhost:5001`

---

## 📡 API Endpoint Overview

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | Register new candidate account | Public |
| `POST` | `/api/v1/auth/login` | Authenticate user & return JWT token | Public |
| `GET` | `/api/v1/auth/me` | Fetch authenticated user profile | Private |
| `GET` | `/api/v1/interviews` | Fetch candidate interview history | Private |
| `POST` | `/api/v1/interviews` | Initialize new interview session | Private |
| `GET` | `/api/v1/questions` | Load role-specific tailored interview questions | Private |
| `POST` | `/api/v1/answers` | Submit candidate answer & receive AI evaluation | Private |

---

## 🚢 Production Deployment

The platform is configured for single-command production deployment on cloud services like **Render**, **Railway**, **Vercel**, or **Heroku**:

1. **Build Production Bundle**:
   ```bash
   npm run build
   ```
2. **Start Production Server**:
   ```bash
   npm start
   ```

---

## 🛡️ Engineering & Code Quality Standards

- **Zero Lint & Compilation Errors**: Verified clean build via Vite in **2.27s**.
- **Secure File Exclusions**: Root `.gitignore` prevents leaks of `.env` secret keys, `node_modules/`, or build outputs.
- **Robust Exception Handling**: Fallback in-memory state management ensures 100% UI uptime even during offline or database downtime scenarios.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
