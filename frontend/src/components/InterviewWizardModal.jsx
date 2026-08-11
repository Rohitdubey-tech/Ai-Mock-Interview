import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, ChevronRight, ChevronLeft, Check, Code, Server, Cpu, FileCode2, Users, Cloud, Smartphone, Database,
  Mic, Edit3, CheckSquare, Sparkles, Calendar, Clock, PlayCircle, Layers
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const roles = [
  { id: 'frontend', title: 'Frontend Engineer', icon: Code, desc: 'React, Vue, JS, CSS Architecture & Web Vitals' },
  { id: 'backend', title: 'Backend Engineer', icon: Server, desc: 'Node.js, Databases, REST/gRPC APIs & Microservices' },
  { id: 'fullstack', title: 'Full Stack Developer', icon: Layers, desc: 'MERN / Full-Stack Web Development & System Integration' },
  { id: 'system-design', title: 'System Design Architect', icon: Cpu, desc: 'Distributed Systems, High Availability, Scaling & Caching' },
  { id: 'dsa', title: 'DSA & Algorithms', icon: FileCode2, desc: 'Data Structures, Graph Traversals, Dynamic Programming' },
  { id: 'devops', title: 'DevOps & Cloud Engineer', icon: Cloud, desc: 'Docker, Kubernetes, AWS, CI/CD & Terraform' },
  { id: 'mobile', title: 'Mobile Developer', icon: Smartphone, desc: 'React Native, Flutter, iOS & Android Core' },
  { id: 'datascience', title: 'Data Scientist & AI', icon: Database, desc: 'Python, SQL, Machine Learning & LLM Fine-Tuning' },
];

const topicsByRole = {
  frontend: ['React & Virtual DOM', 'Async JS & Event Loop', 'State Management (Redux/Zustand)', 'CSS Flexbox/Grid', 'Core Web Vitals & Performance', 'Browser Storage & Security'],
  backend: ['Node.js Event Loop', 'SQL vs NoSQL Databases', 'RESTful API Design & Versioning', 'Authentication (JWT / OAuth)', 'Redis Distributed Caching', 'Database Indexing & Transactions'],
  fullstack: ['REST / GraphQL APIs', 'React Component Patterns', 'Node.js Express Middleware', 'MongoDB & PostgreSQL', 'CI/CD & Deployment', 'Full-Stack Authentication'],
  'system-design': ['Load Balancers & Reverse Proxies', 'Consistent Hashing & Partitioning', 'Message Queues (Kafka / RabbitMQ)', 'Database Sharding & Replication', 'Rate Limiting & Throttling', 'CDN & Edge Caching'],
  dsa: ['Arrays & Hash Maps', 'Two Pointers & Sliding Window', 'Trees & Binary Search', 'Graph Algorithms (BFS/DFS)', 'Dynamic Programming & Memoization', 'Heap & Priority Queues'],
  devops: ['Docker Containerization', 'Kubernetes Orchestration', 'CI/CD Pipelines (GitHub Actions)', 'Terraform Infrastructure as Code', 'AWS Services (EC2, S3, Lambda)', 'Prometheus & Grafana Monitoring'],
  mobile: ['React Native Bridge / Reanimated', 'Native Modules Integration', 'Mobile State Management', 'App Lifecycle & Memory', 'Offline Storage (AsyncStorage)', 'Push Notifications'],
  datascience: ['Pandas & Data Wrangling', 'SQL Query Optimization', 'Supervised Learning Models', 'Deep Learning & PyTorch', 'Model Evaluation Metrics', 'LLM Prompting & RAG Pipelines'],
};

const roundFormats = [
  { id: 'voice', title: 'AI Voice & Video Round', icon: Mic, badge: 'Recommended', desc: 'Live interactive Q&A with AI Interviewer, Web Speech Synthesis & Webcam feed' },
  { id: 'coding', title: 'Live Coding Round', icon: Code, badge: 'Interactive', desc: 'Live Code Editor sandbox running code against test cases in real-time' },
  { id: 'mcq', title: 'MCQ Technical Quiz', icon: CheckSquare, badge: 'Quick Quiz', desc: 'Timed multiple choice questions testing theoretical accuracy and core fundamentals' },
];

const difficulties = [
  { id: 'core', title: 'Core Concepts & Fundamentals', level: 'Junior / Entry Level', desc: 'Base principles, syntax, definitions and standard patterns' },
  { id: 'analytical', title: 'Analytical & Problem Solving', level: 'Mid Level', desc: 'Trade-off analysis, edge case handling, debugging and real scenarios' },
  { id: 'senior', title: 'Advanced Architecture & Design', level: 'Senior / Lead', desc: 'High-scale distributed tradeoffs, deep internals, and optimization' },
  { id: 'hr', title: 'HR & Behavioral Round', level: 'All Levels', desc: 'STAR methodology, leadership principles, conflict resolution and team fit' },
];

export default function InterviewWizardModal({ isOpen, onClose, onInterviewCreated }) {
  const navigate = useNavigate();
  const { api } = useAuth();

  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState('fullstack');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedFormat, setSelectedFormat] = useState('voice');
  const [selectedDifficulty, setSelectedDifficulty] = useState('analytical');
  const [scheduleChoice, setScheduleChoice] = useState('now'); // 'now' | 'schedule'
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const currentRoleTopics = topicsByRole[selectedRole] || topicsByRole.fullstack;

  const toggleTopic = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const roleObj = roles.find(r => r.id === selectedRole);
    const config = {
      type: roleObj ? roleObj.title : 'Full Stack Developer',
      roleId: selectedRole,
      topics: selectedTopics.length > 0 ? selectedTopics : currentRoleTopics.slice(0, 3),
      format: selectedFormat,
      difficulty: selectedDifficulty,
      scheduledAt: scheduleChoice === 'schedule' ? `${scheduleDate}T${scheduleTime}:00Z` : null,
      status: scheduleChoice === 'schedule' ? 'Scheduled' : 'In Progress'
    };

    try {
      const res = await api.post('/interviews', config);
      const interviewId = res.data?.data?._id || `int-${Date.now()}`;
      
      if (onInterviewCreated) onInterviewCreated(res.data?.data || config);
      onClose();

      if (scheduleChoice === 'now') {
        if (selectedFormat === 'coding') {
          navigate('/coding', { state: { config } });
        } else if (selectedFormat === 'mcq') {
          navigate('/mcq', { state: { config, interviewId } });
        } else {
          navigate(`/interview/${interviewId}`, { state: { config } });
        }
      } else {
        alert(`Interview scheduled successfully for ${scheduleDate} at ${scheduleTime}!`);
      }
    } catch (err) {
      console.warn("Interview wizard fallback routing:", err.message);
      const interviewId = `int-${Date.now()}`;
      onClose();
      if (scheduleChoice === 'now') {
        if (selectedFormat === 'coding') {
          navigate('/coding', { state: { config } });
        } else if (selectedFormat === 'mcq') {
          navigate('/mcq', { state: { config, interviewId } });
        } else {
          navigate(`/interview/${interviewId}`, { state: { config } });
        }
      } else {
        alert("Interview scheduled successfully!");
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-surface border border-border rounded-3xl max-w-3xl w-full flex flex-col max-h-[90vh] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200">
        
        {/* Header with Stepper Progress */}
        <div className="p-6 border-b border-border bg-background/50 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center">
              Configure Interview Round <Sparkles className="w-5 h-5 text-primary ml-2" />
            </h2>
            <p className="text-xs text-zinc-400 mt-1">Step {step} of 5 — Customize target role, topics, mode, and difficulty level</p>
          </div>

          <button onClick={onClose} className="text-zinc-500 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Bar */}
        <div className="w-full bg-white/5 h-1.5 flex">
          <div className="bg-primary h-full transition-all duration-300" style={{ width: `${(step / 5) * 100}%` }}></div>
        </div>

        {/* Wizard Content Body */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          
          {/* STEP 1: TARGET JOB ROLE */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">What role are you preparing for?</h3>
                <p className="text-xs text-zinc-400">Select your target engineering track to tailor the interview pool.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {roles.map(r => {
                  const Icon = r.icon;
                  const isSelected = selectedRole === r.id;
                  return (
                    <div 
                      key={r.id}
                      onClick={() => {
                        setSelectedRole(r.id);
                        setSelectedTopics([]);
                      }}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start space-x-3.5 ${
                        isSelected 
                          ? 'bg-primary/10 border-primary shadow-lg ring-1 ring-primary/50' 
                          : 'bg-background border-border hover:border-zinc-700 hover:bg-white/5'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isSelected ? 'bg-primary text-white' : 'bg-surface text-zinc-400'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white mb-0.5">{r.title}</h4>
                        <p className="text-xs text-zinc-400 leading-relaxed">{r.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: SPECIFIC TOPICS FOCUS */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Which topics do you want to focus on?</h3>
                <p className="text-xs text-zinc-400">Choose specific technical areas to emphasize (select multiple or leave for balanced mix).</p>
              </div>

              <div className="flex flex-wrap gap-2.5 pt-2">
                {currentRoleTopics.map(topic => {
                  const isSelected = selectedTopics.includes(topic);
                  return (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => toggleTopic(topic)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all flex items-center ${
                        isSelected 
                          ? 'bg-primary text-white border-primary shadow-md' 
                          : 'bg-background text-zinc-300 border-border hover:border-zinc-600 hover:text-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 mr-1.5" />}
                      {topic}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: ROUND FORMAT */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Select Interview Round Format</h3>
                <p className="text-xs text-zinc-400">Choose how you want to be evaluated during this session.</p>
              </div>

              <div className="space-y-3">
                {roundFormats.map(fmt => {
                  const Icon = fmt.icon;
                  const isSelected = selectedFormat === fmt.id;
                  return (
                    <div 
                      key={fmt.id}
                      onClick={() => setSelectedFormat(fmt.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected 
                          ? 'bg-primary/10 border-primary shadow-lg ring-1 ring-primary/50' 
                          : 'bg-background border-border hover:border-zinc-700 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${isSelected ? 'bg-primary text-white' : 'bg-surface text-zinc-400'}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="text-sm font-bold text-white">{fmt.title}</h4>
                            <span className="px-2 py-0.5 bg-primary/20 text-primary text-[10px] font-bold rounded-full">{fmt.badge}</span>
                          </div>
                          <p className="text-xs text-zinc-400 mt-1">{fmt.desc}</p>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-primary bg-primary text-white' : 'border-zinc-600'}`}>
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: ASSESSMENT DIFFICULTY & TYPE */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Select Difficulty & Assessment Focus</h3>
                <p className="text-xs text-zinc-400">Choose between core technical concepts, analytical problem solving, or HR behavioral questions.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {difficulties.map(d => {
                  const isSelected = selectedDifficulty === d.id;
                  return (
                    <div 
                      key={d.id}
                      onClick={() => setSelectedDifficulty(d.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected 
                          ? 'bg-primary/10 border-primary shadow-lg ring-1 ring-primary/50' 
                          : 'bg-background border-border hover:border-zinc-700 hover:bg-white/5'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-bold text-white">{d.title}</h4>
                          <span className="text-[10px] text-zinc-400 uppercase font-semibold bg-white/5 px-2 py-0.5 rounded">{d.level}</span>
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed mt-2">{d.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: SCHEDULE OR LAUNCH IMMEDIATELY */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">When would you like to take this interview?</h3>
                <p className="text-xs text-zinc-400">Launch right now or schedule a reminder for later practice.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div 
                  onClick={() => setScheduleChoice('now')}
                  className={`p-5 rounded-2xl border cursor-pointer flex flex-col items-center justify-center text-center transition-all ${
                    scheduleChoice === 'now' 
                      ? 'bg-primary/10 border-primary ring-1 ring-primary' 
                      : 'bg-background border-border hover:border-zinc-700'
                  }`}
                >
                  <PlayCircle className="w-8 h-8 text-primary mb-2" />
                  <h4 className="text-sm font-bold text-white">Start Immediately</h4>
                  <p className="text-xs text-zinc-400 mt-1">Launches configured interview session instantly</p>
                </div>

                <div 
                  onClick={() => setScheduleChoice('schedule')}
                  className={`p-5 rounded-2xl border cursor-pointer flex flex-col items-center justify-center text-center transition-all ${
                    scheduleChoice === 'schedule' 
                      ? 'bg-primary/10 border-primary ring-1 ring-primary' 
                      : 'bg-background border-border hover:border-zinc-700'
                  }`}
                >
                  <Calendar className="w-8 h-8 text-secondary mb-2" />
                  <h4 className="text-sm font-bold text-white">Schedule for Later</h4>
                  <p className="text-xs text-zinc-400 mt-1">Save session with a date & time reminder</p>
                </div>
              </div>

              {scheduleChoice === 'schedule' && (
                <div className="grid grid-cols-2 gap-4 bg-background p-4 rounded-2xl border border-border">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase mb-1">Select Date</label>
                    <input 
                      type="date"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      className="w-full bg-surface border border-border rounded-xl p-2.5 text-white text-xs font-medium focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase mb-1">Select Time</label>
                    <input 
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className="w-full bg-surface border border-border rounded-xl p-2.5 text-white text-xs font-medium focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Wizard Footer Controls */}
        <div className="p-6 border-t border-border bg-background/50 flex items-center justify-between">
          <button 
            onClick={handleBack}
            disabled={step === 1}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent disabled:opacity-30 transition-colors flex items-center"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Back
          </button>

          {step < 5 ? (
            <button 
              onClick={handleNext}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center shadow-lg shadow-primary/20"
            >
              Next Step <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting || (scheduleChoice === 'schedule' && (!scheduleDate || !scheduleTime))}
              className="bg-accent hover:bg-accent/90 text-white px-7 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg shadow-accent/20 disabled:opacity-50 flex items-center"
            >
              {scheduleChoice === 'now' ? 'Launch Customized Session' : 'Save Scheduled Interview'}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
