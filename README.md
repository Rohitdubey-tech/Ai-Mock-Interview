# AI Mock Interview Platform

A full-stack MERN application that provides AI-powered mock interviews, resume reviews, and coding challenges.

## Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (Local instance or MongoDB Atlas URI)

## 🚀 Quick Setup (One-Click Install)

Because this is a Node.js project (MERN stack), we use `package.json`. We have configured a master script to install everything at once.

1. **Install Dependencies**
   From the root folder of the project, run:
   ```bash
   npm run install-all
   ```
   *This will automatically install both the backend and frontend dependencies in their respective folders.*

2. **Environment Variables**
   Make sure your `.env` file is set up inside the `backend/` directory:
   ```env
   PORT=5001
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/ai-mock-interview
   JWT_SECRET=your_jwt_secret_here
   JWT_EXPIRES_IN=30d
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Start the Application**
   From the root folder, run:
   ```bash
   npm run dev
   ```
   *This will concurrently start your Express backend (Port 5001) and your Vite React frontend (Port 3000).*

## 📁 Project Structure

- `/backend` - Express server, MongoDB models, Auth & OpenAI logic.
- `/frontend` - React Vite application, Tailwind CSS, Recharts analytics, user interfaces.
