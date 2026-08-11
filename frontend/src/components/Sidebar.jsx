import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, Video, Code2, CheckSquare, FileText, History, BarChart2, Award, Settings, LogOut, Moon, Sun, Rocket, Sparkles
} from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  const { user, logout, themeMode, toggleTheme } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'AI Voice Round', path: '/interview', icon: Video },
    { name: 'Coding Round', path: '/coding', icon: Code2 },
    { name: 'MCQ Quiz Round', path: '/mcq', icon: CheckSquare },
    { name: 'ATS Resume Review', path: '/resume', icon: FileText },
    { name: 'Interview History', path: '/interviews', icon: History },
    { name: 'Analytics', path: '/analytics', icon: BarChart2 },
    { name: 'Leaderboard', path: '/leaderboard', icon: Award },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#0a0b10] border-r border-white/10 h-screen fixed left-0 top-0 flex flex-col justify-between p-5 z-40 transition-colors duration-300">
      <div>
        {/* Brand Logo Header */}
        <div className="flex items-center space-x-3 px-2 py-3 mb-6">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center text-zinc-950 font-black shadow-lg shadow-purple-500/30">
            <Sparkles className="w-4 h-4 fill-zinc-950" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-white leading-none tracking-tight">AI Mock Interview</h1>
            <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider mt-1">Platform Pro</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-primary/10 text-primary border border-primary/20 shadow-inner'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-zinc-500'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Controls & Upgrade Banner */}
      <div className="space-y-4 pt-4 border-t border-white/10">
        
        {/* Theme Mode Toggle Switch */}
        <div className="flex items-center justify-between px-3 py-2 rounded-2xl bg-surface/60 border border-white/5">
          <div className="flex items-center space-x-2 text-xs font-semibold text-zinc-300">
            {themeMode === 'light' ? (
              <Sun className="w-4 h-4 text-amber-500" />
            ) : (
              <Moon className="w-4 h-4 text-primary" />
            )}
            <span>{themeMode === 'light' ? 'Light Mode' : 'Dark Mode'}</span>
          </div>

          <button 
            onClick={() => toggleTheme(themeMode === 'dark' ? 'light' : 'dark')}
            className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors cursor-pointer ${themeMode === 'dark' ? 'bg-primary' : 'bg-amber-400'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-zinc-950 shadow-md transform transition-transform ${themeMode === 'dark' ? 'translate-x-5' : 'translate-x-0'}`}></div>
          </button>
        </div>


        {/* Pro Card */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-purple-950/40 via-surface to-surface border border-purple-500/20 flex items-center space-x-3 shadow-lg">
          <div className="w-8 h-8 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary shrink-0">
            <Rocket className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-white truncate">Activate Pro Tier</h4>
            <p className="text-[10px] text-zinc-400 truncate">Unlock AI voice & live feedback</p>
          </div>
        </div>

        {/* User Sign Out */}
        <button
          onClick={logout}
          className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>

      </div>
    </aside>
  );
}
