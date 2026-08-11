import { useState } from 'react';
import { Crown, Search, Trophy, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const mockLeaderboard = [
  { rank: 1, name: 'Alex Johnson', score: 9.8, interviews: 45, isYou: false, badge: 'Pro Master' },
  { rank: 2, name: 'Rohit Dubey', score: 9.6, interviews: 38, isYou: true, badge: 'Top 1%' },
  { rank: 3, name: 'Priya Patel', score: 9.2, interviews: 41, isYou: false, badge: 'Expert' },
  { rank: 4, name: 'Neha Singh', score: 8.9, interviews: 32, isYou: false, badge: 'Rising Star' },
  { rank: 5, name: 'Arjun Verma', score: 8.5, interviews: 28, isYou: false, badge: 'Advanced' },
  { rank: 6, name: 'Sarah Jenkins', score: 8.2, interviews: 24, isYou: false, badge: 'Intermediate' },
  { rank: 7, name: 'Sanya Gupta', score: 7.8, interviews: 18, isYou: false, badge: 'Intermediate' },
  { rank: 8, name: 'Mohit Kumar', score: 7.5, interviews: 22, isYou: false, badge: 'Active Practitioner' },
];

export default function Leaderboard() {
  const [filter, setFilter] = useState('Weekly');
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();
  
  const filteredUsers = mockLeaderboard.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center">
            Platform Leaderboard <Trophy className="w-6 h-6 text-yellow-400 ml-3" />
          </h1>
          <p className="text-zinc-400 text-sm mt-1">See how your interview scores compare against top candidates globally.</p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Find candidate..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-surface border border-border rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-primary w-48 transition-colors font-medium"
            />
          </div>

          <div className="flex space-x-1 bg-surface border border-border rounded-xl p-1">
            {['Weekly', 'Monthly', 'All Time'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  filter === f ? 'bg-primary text-white shadow' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-2xl p-8 pt-16 relative">
        
        {/* Top 3 Podium */}
        <div className="flex justify-center items-end space-x-6 mb-16 relative -mt-24">
          {/* Rank 2 */}
          <div className="flex flex-col items-center">
            <Crown className="w-6 h-6 text-zinc-300 mb-2" />
            <div className="w-18 h-18 rounded-2xl bg-zinc-800 border-4 border-surface shadow-2xl z-10 flex items-center justify-center text-zinc-300 font-bold overflow-hidden">
               <img src={`https://ui-avatars.com/api/?name=Rohit+Dubey&background=7c3aed&color=fff`} alt="avatar" />
            </div>
            <div className="bg-primary/20 border border-primary/40 w-28 pt-10 pb-4 rounded-t-2xl -mt-8 flex flex-col items-center">
              <span className="font-bold text-white text-xs text-center">Rohit Dubey</span>
              <span className="text-accent font-bold mt-1 text-sm">9.6 Score</span>
            </div>
          </div>
          
          {/* Rank 1 */}
          <div className="flex flex-col items-center -translate-y-6">
            <Crown className="w-8 h-8 text-yellow-400 mb-2 drop-shadow-[0_0_15px_rgba(250,204,21,0.6)]" />
            <div className="w-22 h-22 rounded-2xl bg-zinc-800 border-4 border-surface shadow-2xl z-10 flex items-center justify-center text-yellow-400 font-bold overflow-hidden">
               <img src={`https://ui-avatars.com/api/?name=Alex+Johnson&background=facc15&color=000`} alt="avatar" />
            </div>
            <div className="bg-primary/30 border border-primary/50 w-32 pt-12 pb-6 rounded-t-2xl -mt-10 flex flex-col items-center shadow-lg">
              <span className="font-bold text-white text-sm text-center">Alex Johnson</span>
              <span className="text-accent font-bold mt-1 text-base">9.8 Score</span>
            </div>
          </div>

          {/* Rank 3 */}
          <div className="flex flex-col items-center">
            <Crown className="w-6 h-6 text-amber-700 mb-2" />
            <div className="w-18 h-18 rounded-2xl bg-zinc-800 border-4 border-surface shadow-2xl z-10 flex items-center justify-center text-amber-700 font-bold overflow-hidden">
               <img src={`https://ui-avatars.com/api/?name=Priya+Patel&background=b45309&color=fff`} alt="avatar" />
            </div>
            <div className="bg-white/5 border border-white/10 w-28 pt-10 pb-4 rounded-t-2xl -mt-8 flex flex-col items-center">
              <span className="font-bold text-white text-xs text-center">Priya Patel</span>
              <span className="text-accent font-bold mt-1 text-sm">9.2 Score</span>
            </div>
          </div>
        </div>

        {/* Candidate List Table */}
        <div className="w-full">
          <div className="grid grid-cols-[50px_1fr_120px_100px] text-xs font-bold text-zinc-400 uppercase tracking-wider px-4 pb-4 border-b border-border">
            <div>Rank</div>
            <div>Candidate Name</div>
            <div className="text-right">Score / 10</div>
            <div className="text-right">Interviews</div>
          </div>
          
          <div className="pt-2 space-y-1">
            {filteredUsers.map((candidate) => (
              <div 
                key={candidate.rank} 
                className={`grid grid-cols-[50px_1fr_120px_100px] items-center px-4 py-3.5 rounded-xl transition-all ${
                  candidate.isYou ? 'bg-primary/20 border border-primary/40 shadow-lg' : 'hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className="text-sm font-bold text-zinc-300">#{candidate.rank}</div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-xl overflow-hidden bg-surface border border-white/10 shrink-0">
                    <img src={`https://ui-avatars.com/api/?name=${candidate.name.replace(' ', '+')}&background=random`} alt="avatar" />
                  </div>
                  <div>
                    <span className={`text-sm font-semibold ${candidate.isYou ? 'text-white font-bold' : 'text-zinc-200'}`}>
                      {candidate.name} {candidate.isYou && <span className="text-primary font-bold text-xs ml-1.5">(You)</span>}
                    </span>
                    <span className="ml-3 px-2 py-0.5 bg-white/5 text-zinc-400 rounded text-[10px]">{candidate.badge}</span>
                  </div>
                </div>
                <div className="text-right text-sm font-extrabold text-accent">{candidate.score.toFixed(1)}</div>
                <div className="text-right text-xs text-zinc-400 font-semibold">{candidate.interviews} taken</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

