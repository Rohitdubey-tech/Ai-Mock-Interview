import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import { Download, TrendingUp, Award, Target, Zap } from 'lucide-react';

const mockTrendData = [
  { name: 'Week 1', score: 6.5 },
  { name: 'Week 2', score: 7.2 },
  { name: 'Week 3', score: 6.8 },
  { name: 'Week 4', score: 8.5 },
  { name: 'Week 5', score: 8.8 },
];

const mockSkillsData = [
  { subject: 'Technical', A: 88, fullMark: 100 },
  { subject: 'Communication', A: 92, fullMark: 100 },
  { subject: 'Confidence', A: 80, fullMark: 100 },
  { subject: 'Problem Solving', A: 90, fullMark: 100 },
  { subject: 'Clarity', A: 85, fullMark: 100 },
];

const mockTopicData = [
  { topic: 'Data Structures & Algorithms', score: 92 },
  { topic: 'Frontend React Architecture', score: 88 },
  { topic: 'System Design & Distributed Caching', score: 82 },
  { topic: 'SQL & Database Optimization', score: 75 },
  { topic: 'Behavioral & HR Round', score: 95 },
];

export default function Analytics() {
  const { user, isDemoUser } = useAuth();

  const trendData = isDemoUser ? mockTrendData : [
    { name: 'Week 1', score: 0 },
    { name: 'Week 2', score: 0 }
  ];

  const skillsData = isDemoUser ? mockSkillsData : [
    { subject: 'Technical', A: 0, fullMark: 100 },
    { subject: 'Communication', A: 0, fullMark: 100 },
    { subject: 'Confidence', A: 0, fullMark: 100 },
    { subject: 'Problem Solving', A: 0, fullMark: 100 },
    { subject: 'Clarity', A: 0, fullMark: 100 },
  ];

  const topicData = isDemoUser ? mockTopicData : [
    { topic: 'Data Structures & Algorithms', score: 0 },
    { topic: 'Frontend React Architecture', score: 0 },
    { topic: 'System Design & Distributed Caching', score: 0 },
    { topic: 'SQL & Database Optimization', score: 0 },
    { topic: 'Behavioral & HR Round', score: 0 },
  ];

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      user: user?.name,
      averageScore: isDemoUser ? 8.4 : 0.0,
      skills: skillsData,
      topics: topicData
    }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "interview_analytics.json");
    downloadAnchor.click();
  };

  const StatCard = ({ title, value, subValue, icon: Icon, color }) => (
    <div className="bg-surface border border-border rounded-2xl p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-zinc-400 font-semibold uppercase">{title}</p>
        {Icon && <Icon className={`w-4 h-4 ${color}`} />}
      </div>
      <div className="flex items-end space-x-2">
        <h3 className="text-3xl font-extrabold text-white">{value}</h3>
        {subValue && <span className="text-xs text-zinc-400 mb-1">{subValue}</span>}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-10">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-3xl font-bold text-white">Performance Analytics</h1>
          <p className="text-zinc-400 text-sm mt-1">Deep-dive technical radar breakdown & response trends over time.</p>
        </div>

        <button 
          onClick={handleExportData}
          className="bg-surface hover:bg-white/5 border border-border text-white px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors flex items-center"
        >
          <Download className="w-4 h-4 mr-2 text-primary" /> Export Data
        </button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Completed" value={isDemoUser ? "12" : "0"} subValue="sessions" icon={Zap} color="text-primary" />
        <StatCard title="Average Score" value={isDemoUser ? "8.4" : "0.0"} subValue="/10" icon={TrendingUp} color="text-accent" />
        <StatCard title="Peak Performance" value={isDemoUser ? "9.6" : "0.0"} subValue="/10" icon={Award} color="text-yellow-400" />
        <StatCard title="Role Match Accuracy" value={isDemoUser ? "89%" : "0%"} subValue="target ready" icon={Target} color="text-secondary" />
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Trend */}
        <div className="bg-surface border border-border rounded-2xl p-6">
          <h2 className="text-sm font-bold text-white mb-6">Historical Score Trend</h2>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorScore2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} domain={[0, 10]} />
                <Tooltip contentStyle={{ backgroundColor: '#10131c', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="score" stroke="#7c3aed" strokeWidth={3} fillOpacity={1} fill="url(#colorScore2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skills Breakdown Radar */}
        <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col">
          <h2 className="text-sm font-bold text-white mb-2">Technical Competency Radar</h2>
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillsData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#a1a1aa', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Skills" dataKey="A" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.35} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Topic Performance Progress */}
        <div className="bg-surface border border-border rounded-2xl p-6">
          <h2 className="text-sm font-bold text-white mb-6">Topic Mastery Breakdown</h2>
          <div className="space-y-5">
            {topicData.map((topic) => (
              <div key={topic.topic}>
                <div className="flex justify-between text-xs mb-2 font-medium">
                  <span className="text-zinc-200">{topic.topic}</span>
                  <span className="text-accent font-bold">{topic.score}%</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full transition-all duration-700" style={{ width: `${topic.score}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Actionable Recommendations */}
        <div className="bg-surface border border-border rounded-2xl p-6">
          <h2 className="text-sm font-bold text-white mb-4">Strategic Improvement Areas</h2>
          <div className="space-y-3">
            <div className="p-4 bg-background border border-border rounded-xl">
              <h4 className="text-xs font-bold text-accent mb-1">System Design Bottlenecking</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">Focus on discussing database partitioning strategies and sliding window rate limiters when tackling architectural questions.</p>
            </div>
            <div className="p-4 bg-background border border-border rounded-xl">
              <h4 className="text-xs font-bold text-yellow-400 mb-1">Confidence & Pace</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">Try reducing pause duration before starting answers. Outlining 3 bullet points upfront improves initial clarity scores.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

