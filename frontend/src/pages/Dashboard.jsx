import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import InterviewWizardModal from '../components/InterviewWizardModal';
import { 
  Search, Bell, User, ChevronDown, Star, Code2, Trophy, Check, Calendar, ArrowRight, Play, CheckCircle2, Clock
} from 'lucide-react';

export default function Dashboard() {
  const { user, isDemoUser, api } = useAuth();
  const navigate = useNavigate();

  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [userInterviews, setUserInterviews] = useState([]);
  const [filterTab, setFilterTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const defaultDemoInterviews = [
    { _id: '#10055', type: 'Frontend Engineer', startedAt: '2025-01-09', overallScore: 8.5, format: 'AI Voice', mode: 'Voice Speech', status: 'Completed' },
    { _id: '#10056', type: 'System Design Architect', startedAt: '2025-01-08', overallScore: 9.2, format: 'AI Voice', mode: 'Voice Speech', status: 'Completed' },
    { _id: '#10057', type: 'LeetCode DSA Round', startedAt: '2025-01-05', overallScore: 7.8, format: 'Coding', mode: 'Code Editor', status: 'Completed' },
  ];

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const res = await api.get('/interviews');
        if (res.data && res.data.success && res.data.data.length > 0) {
          setUserInterviews(res.data.data);
        } else if (isDemoUser) {
          setUserInterviews(defaultDemoInterviews);
        } else {
          setUserInterviews([]);
        }
      } catch (err) {
        if (isDemoUser) setUserInterviews(defaultDemoInterviews);
        else setUserInterviews([]);
      }
    };
    fetchInterviews();
  }, [api, isDemoUser]);

  const handleInterviewCreated = (newInterview) => {
    setUserInterviews([newInterview, ...userInterviews]);
  };

  const filteredHistory = userInterviews.filter(item => {
    const matchesSearch = item.type?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item._id?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = filterTab === 'All' || item.status === filterTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 font-sans">
      
      {/* Interview Setup Wizard Modal */}
      <InterviewWizardModal 
        isOpen={isWizardOpen} 
        onClose={() => setIsWizardOpen(false)}
        onInterviewCreated={handleInterviewCreated}
      />

      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-2">
        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          Welcome Back, <span className="text-gradient">{user?.name?.split(' ')[0] || 'Candidate'}</span>
        </h2>

        {/* Right Header Controls: Search, Notifications, Profile */}
        <div className="flex items-center space-x-4 w-full sm:w-auto">
          
          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#11121a] border border-white/10 rounded-2xl pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-primary transition-all shadow-inner font-medium"
            />
          </div>

          {/* Notification Bell */}
          <button className="p-2.5 rounded-2xl bg-[#11121a] border border-white/10 text-zinc-400 hover:text-white transition-colors relative">
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-primary absolute top-2 right-2"></span>
          </button>

          {/* Profile Badge */}
          <div className="flex items-center space-x-2.5 bg-[#11121a] border border-white/10 px-3 py-1.5 rounded-2xl cursor-pointer hover:border-white/20 transition-all">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center text-zinc-950 font-bold text-xs">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-bold text-white leading-none">{user?.name || 'Rohit Dubey'}</p>
              <p className="text-[10px] text-zinc-500 mt-0.5">@{user?.name?.toLowerCase().replace(/\s+/g, '') || 'rohitdubey'}</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
          </div>

        </div>
      </div>

      {/* Top Wide Hero Feature Banner */}
      <div className="p-8 rounded-[32px] bg-gradient-to-r from-[#17142b] via-[#12131d] to-[#0f1017] border border-purple-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col md:flex-row md:items-center justify-between relative overflow-hidden group">
        <div className="max-w-xl space-y-4 relative z-10">
          <h1 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
            Built on Trust and Standards
          </h1>
          <p className="text-xs text-zinc-400 leading-relaxed max-w-lg font-normal">
            Our AI mock interview framework ensures all practice rounds are evaluated accurately, candidate performance metrics meet top tier industry expectations, and candidates enjoy reliable, respectful feedback.
          </p>
          
          <button 
            onClick={() => setIsWizardOpen(true)}
            className="lavender-btn px-7 py-3 rounded-2xl text-xs font-extrabold flex items-center tracking-wide"
          >
            Start Now <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>

        {/* Floating 3D Graphic Asset */}
        <div className="mt-6 md:mt-0 relative z-10 shrink-0 flex items-center justify-center">
          <img 
            src="/hero-diamond.png" 
            alt="3D Diamond Hero Graphic" 
            className="w-48 h-48 md:w-56 md:h-56 object-contain drop-shadow-[0_0_35px_rgba(167,139,250,0.4)] transform group-hover:scale-105 transition-transform duration-700"
          />
        </div>

        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* 3 Main Feature Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Orange Badge */}
        <div className="p-6 rounded-[28px] bg-gradient-to-b from-[#19152b]/50 to-[#10111a] border border-white/10 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden group hover:border-purple-500/30 transition-all">
          <div className="space-y-4">
            {/* Orange Star Badge */}
            <div className="w-10 h-10 rounded-2xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 shadow-md">
              <Star className="w-5 h-5 fill-orange-400" />
            </div>

            <div>
              <h3 className="text-base font-bold text-white mb-2">AI Voice & Video Round</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Interactive voice-based Q&A with real-time speech synthesis, live transcription, and webcam evaluation.
              </p>

              <div className="space-y-2 text-xs text-zinc-300">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Speech Synthesis & Live Transcript</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>AI Evaluator Feedback & Benchmarks</span>
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setIsWizardOpen(true)}
            className="w-full lavender-btn py-3 rounded-2xl text-xs font-extrabold flex items-center justify-center"
          >
            Start Voice Round
          </button>
        </div>

        {/* Card 2: Purple Badge */}
        <div className="p-6 rounded-[28px] bg-gradient-to-b from-[#19152b]/50 to-[#10111a] border border-white/10 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden group hover:border-purple-500/30 transition-all">
          <div className="space-y-4">
            {/* Purple Badge */}
            <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-md">
              <Code2 className="w-5 h-5" />
            </div>

            <div>
              <h3 className="text-base font-bold text-white mb-2">LeetCode Coding Sandbox</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Solve top coding challenges across 17 DSA topics in C, C++, Java, Python 3, or JavaScript.
              </p>

              <div className="space-y-2 text-xs text-zinc-300">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>17 DSA Topics & 5 Languages (C, C++, Java, Py, JS)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Blank Starter Signatures & Testcase Runner</span>
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={() => navigate('/coding')}
            className="w-full lavender-btn py-3 rounded-2xl text-xs font-extrabold flex items-center justify-center"
          >
            Open Code Editor
          </button>
        </div>

        {/* Card 3: Yellow Trophy Badge */}
        <div className="p-6 rounded-[28px] bg-gradient-to-b from-[#19152b]/50 to-[#10111a] border border-white/10 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden group hover:border-purple-500/30 transition-all">
          <div className="space-y-4">
            {/* Yellow Trophy Badge */}
            <div className="w-10 h-10 rounded-2xl bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-400 shadow-md">
              <Trophy className="w-5 h-5 fill-yellow-400" />
            </div>

            <div>
              <h3 className="text-base font-bold text-white mb-2">ATS Resume & MCQ Quiz</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Scan your resume against target job roles or test core technical knowledge with timed MCQ quizzes.
              </p>

              <div className="space-y-2 text-xs text-zinc-300">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Role Match Keyword Scanner & Advice</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Timed MCQ Quizzes & Explanations</span>
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={() => navigate('/mcq')}
            className="w-full lavender-btn py-3 rounded-2xl text-xs font-extrabold flex items-center justify-center"
          >
            Review Resume / MCQ
          </button>
        </div>

      </div>

      {/* Bottom Practice History Section */}
      <div className="p-8 rounded-[32px] bg-[#10111a] border border-white/10 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-primary">
              <Clock className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-white">Interview Practice History</h3>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-1 bg-surface p-1 rounded-2xl border border-white/5">
            {['All', 'Completed', 'In Progress'].map((f) => (
              <button
                key={f}
                onClick={() => setFilterTab(f)}
                className={`px-4 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                  filterTab === f ? 'bg-primary text-zinc-950 shadow' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* History Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[11px] uppercase tracking-wider font-bold text-zinc-500">
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Track / Category</th>
                <th className="py-3 px-4">Date Started</th>
                <th className="py-3 px-4">Score / 10</th>
                <th className="py-3 px-4">Format</th>
                <th className="py-3 px-4">Mode</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs font-semibold text-zinc-300">
              {filteredHistory.length > 0 ? (
                filteredHistory.map((item) => (
                  <tr key={item._id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 font-mono text-zinc-400">{item._id}</td>
                    <td className="py-4 px-4 font-bold text-white">{item.type}</td>
                    <td className="py-4 px-4 text-zinc-400">{item.startedAt}</td>
                    <td className="py-4 px-4">
                      <span className="font-extrabold text-accent">{item.overallScore || '8.5'}</span> / 10
                    </td>
                    <td className="py-4 px-4 text-zinc-400">{item.format || 'AI Voice'}</td>
                    <td className="py-4 px-4 text-zinc-400">{item.mode || 'Voice Speech'}</td>
                    <td className="py-4 px-4 text-right">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Active / Completed
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-zinc-500 text-xs font-normal">
                    No matching practice sessions found. Click <strong>Start Now</strong> above to begin!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
