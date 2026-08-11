import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import InterviewRoom from './pages/InterviewRoom';
import ResultSummary from './pages/ResultSummary';
import InterviewsList from './pages/InterviewsList';
import ResumeReview from './pages/ResumeReview';
import CodingRound from './pages/CodingRound';
import MCQRound from './pages/MCQRound';
import Leaderboard from './pages/Leaderboard';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-zinc-400 flex items-center justify-center font-sans">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium">Loading session...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Main Layout Component for authenticated users
const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-background text-white font-sans">
      <Sidebar />
      <main className="flex-1 p-8 ml-64 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

function AppContent() {
  const { themeMode } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes wrapped in MainLayout */}
      <Route path="/" element={<ProtectedRoute><MainLayout><Dashboard /></MainLayout></ProtectedRoute>} />
      <Route path="/interview" element={<ProtectedRoute><MainLayout><InterviewRoom /></MainLayout></ProtectedRoute>} />
      <Route path="/interview/:id" element={<ProtectedRoute><MainLayout><InterviewRoom /></MainLayout></ProtectedRoute>} />
      <Route path="/summary/:id" element={<ProtectedRoute><MainLayout><ResultSummary /></MainLayout></ProtectedRoute>} />
      <Route path="/interviews" element={<ProtectedRoute><MainLayout><InterviewsList /></MainLayout></ProtectedRoute>} />
      <Route path="/resume" element={<ProtectedRoute><MainLayout><ResumeReview /></MainLayout></ProtectedRoute>} />
      <Route path="/coding" element={<ProtectedRoute><MainLayout><CodingRound /></MainLayout></ProtectedRoute>} />
      <Route path="/mcq" element={<ProtectedRoute><MainLayout><MCQRound /></MainLayout></ProtectedRoute>} />
      <Route path="/leaderboard" element={<ProtectedRoute><MainLayout><Leaderboard /></MainLayout></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute><MainLayout><Analytics /></MainLayout></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><MainLayout><Settings /></MainLayout></ProtectedRoute>} />

      {/* Fallback Catch-all Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

