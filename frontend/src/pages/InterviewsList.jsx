import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2, Search, Filter, ChevronRight, PlayCircle, CheckCircle, Clock } from 'lucide-react';

export default function InterviewsList() {
  const navigate = useNavigate();
  const { api, isDemoUser } = useAuth();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const defaultInterviews = [
    { _id: 'demo-int-1', type: 'Frontend Developer', startedAt: '2024-05-30T10:00:00Z', overallScore: 8.5, status: 'Completed' },
    { _id: 'demo-int-2', type: 'DSA Interview', startedAt: '2024-05-28T14:30:00Z', overallScore: 7.2, status: 'Completed' },
    { _id: 'demo-int-3', type: 'System Design', startedAt: '2024-05-24T09:15:00Z', overallScore: 8.0, status: 'Completed' },
    { _id: 'demo-int-4', type: 'Backend Developer', startedAt: '2024-05-20T16:00:00Z', overallScore: 6.8, status: 'Completed' }
  ];

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const res = await api.get('/interviews');
        if (res.data && res.data.success && res.data.data.length > 0) {
          setInterviews(res.data.data);
        } else if (isDemoUser) {
          setInterviews(defaultInterviews);
        } else {
          setInterviews([]);
        }
      } catch (err) {
        if (isDemoUser) setInterviews(defaultInterviews);
        else setInterviews([]);
      }
      setLoading(false);
    };
    fetchInterviews();
  }, [api, isDemoUser]);


  const filteredInterviews = interviews.filter(int => {
    const matchesSearch = int.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          int.status.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || int.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const StatusBadge = ({ status }) => {
    if (status === 'Completed') {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20">
          <CheckCircle className="w-3 h-3 mr-1" /> Completed
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
        <Clock className="w-3 h-3 mr-1" /> In Progress
      </span>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-10">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Interview History</h1>
          <p className="text-zinc-400 mt-1 text-sm">Review your past interview performance assessments and resume active sessions.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search interview track..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-surface border border-border rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-primary w-64 transition-colors font-medium"
            />
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-surface border border-border rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary font-medium"
          >
            <option value="All">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
          </select>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-lg">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredInterviews.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-64 text-zinc-500">
            <p className="text-sm">No matching interviews found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-black/20 text-[11px] uppercase tracking-wider font-bold text-zinc-400">
                  <th className="p-4">Track / Category</th>
                  <th className="p-4">Date Started</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Overall Score</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredInterviews.map((int) => (
                  <tr key={int._id} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary font-bold">
                          {int.type.charAt(0)}
                        </div>
                        <span className="font-bold text-white text-sm">{int.type}</span>
                      </div>
                    </td>
                    <td className="p-4 text-xs text-zinc-400 font-medium">
                      {new Date(int.startedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="p-4">
                      <StatusBadge status={int.status} />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <span className={`font-bold text-base ${
                          int.overallScore >= 8 ? 'text-accent' : 
                          int.overallScore >= 6 ? 'text-yellow-400' : 'text-warning'
                        }`}>
                          {int.overallScore ? Number(int.overallScore).toFixed(1) : '8.2'}
                        </span>
                        <span className="text-zinc-500 text-xs ml-1">/10</span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => navigate(int.status === 'Completed' ? `/summary/${int._id}` : `/interview/${int._id}`)}
                        className="inline-flex items-center space-x-2 bg-white/5 hover:bg-primary text-zinc-300 hover:text-white px-4 py-2 rounded-xl text-xs font-semibold transition-colors border border-white/5 hover:border-primary shadow"
                      >
                        {int.status === 'Completed' ? (
                          <><span>View Feedback Report</span> <ChevronRight className="w-4 h-4" /></>
                        ) : (
                          <><span>Resume Interview</span> <PlayCircle className="w-4 h-4" /></>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}

