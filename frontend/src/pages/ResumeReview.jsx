import { useState } from 'react';
import { UploadCloud, FileText, CheckCircle, AlertTriangle, Loader2, BarChart, FileCode, Edit3, ArrowRight } from 'lucide-react';

const roleKeywords = {
  frontend: {
    title: 'Frontend Engineer',
    required: ['JavaScript', 'React', 'HTML5', 'CSS3', 'TypeScript', 'Tailwind', 'REST API', 'Git', 'Webpack', 'Performance'],
    niceToHave: ['Next.js', 'Redux', 'GraphQL', 'Jest', 'Cypress', 'Core Web Vitals']
  },
  fullstack: {
    title: 'Full Stack Developer',
    required: ['JavaScript', 'Node.js', 'React', 'Express', 'MongoDB', 'SQL', 'REST API', 'Git', 'TypeScript', 'Docker'],
    niceToHave: ['PostgreSQL', 'Redis', 'AWS', 'GraphQL', 'CI/CD', 'Microservices']
  },
  backend: {
    title: 'Backend Engineer',
    required: ['Node.js', 'Express', 'Python', 'SQL', 'PostgreSQL', 'MongoDB', 'REST API', 'Docker', 'Git', 'Microservices'],
    niceToHave: ['Redis', 'Kafka', 'Kubernetes', 'gRPC', 'System Design', 'CI/CD']
  },
  devops: {
    title: 'DevOps & Cloud Engineer',
    required: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD', 'Linux', 'Bash', 'Git', 'Python', 'Monitoring'],
    niceToHave: ['Ansible', 'Helm', 'Prometheus', 'Grafana', 'GCP', 'CloudFormation']
  }
};

export default function ResumeReview() {
  const [targetRole, setTargetRole] = useState('fullstack');
  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [activeInputTab, setActiveInputTab] = useState('file'); // 'file' | 'text'
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState(null);

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResults(null);
      // Read file text content if plain text/doc
      const reader = new FileReader();
      reader.onload = (event) => {
        setResumeText(event.target.result || selectedFile.name);
      };
      reader.readAsText(selectedFile);
    }
  };

  const handleScan = () => {
    const content = (resumeText || file?.name || '').toLowerCase();
    if (!content.trim()) return;

    setIsScanning(true);
    
    setTimeout(() => {
      setIsScanning(false);
      const roleConfig = roleKeywords[targetRole] || roleKeywords.fullstack;
      
      const found = roleConfig.required.filter(kw => content.includes(kw.toLowerCase()));
      const missing = roleConfig.required.filter(kw => !content.includes(kw.toLowerCase()));
      const extraFound = roleConfig.niceToHave.filter(kw => content.includes(kw.toLowerCase()));
      
      // Calculate score dynamically
      let score = Math.round((found.length / roleConfig.required.length) * 70 + (extraFound.length > 0 ? 15 : 5));
      if (content.includes('experience') || content.includes('project')) score += 10;
      score = Math.min(98, Math.max(45, score));

      const atsMatch = score >= 80 ? 'High' : score >= 65 ? 'Medium' : 'Needs Optimization';

      const suggestions = [];
      if (missing.length > 0) {
        suggestions.push(`Add essential technical keywords for ${roleConfig.title}: ${missing.slice(0, 4).join(', ')}.`);
      }
      if (!/\d+%|\$\d+|\d+x/.test(content)) {
        suggestions.push("Quantify your project achievements with concrete numerical metrics (e.g., 'Improved API response latency by 35%').");
      }
      suggestions.push("Ensure your work history highlights high-impact responsibilities, architecture design decisions, and leadership accomplishments.");
      suggestions.push("Use standard ATS-friendly single column layout formatting without tables or complex graphics.");

      setResults({
        score,
        atsMatch,
        roleTitle: roleConfig.title,
        keywordsFound: [...found, ...extraFound],
        missingKeywords: missing,
        suggestions
      });
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-10">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">AI Resume Review & ATS Scanner</h1>
          <p className="text-zinc-400 text-sm">Upload your resume to get instant ATS role compatibility analysis and keyword suggestions.</p>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-xs text-zinc-400 font-medium">Target Role:</span>
          <select 
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="bg-surface border border-border text-white text-sm rounded-xl px-4 py-2 focus:outline-none focus:border-primary font-semibold"
          >
            <option value="frontend">Frontend Engineer</option>
            <option value="fullstack">Full Stack Developer</option>
            <option value="backend">Backend Engineer</option>
            <option value="devops">DevOps & Cloud Engineer</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Upload / Input Section */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2 bg-surface p-1 rounded-xl border border-border w-fit">
            <button 
              onClick={() => setActiveInputTab('file')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center ${activeInputTab === 'file' ? 'bg-primary text-white' : 'text-zinc-400 hover:text-white'}`}
            >
              <UploadCloud className="w-3.5 h-3.5 mr-1.5" /> Upload File
            </button>
            <button 
              onClick={() => setActiveInputTab('text')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center ${activeInputTab === 'text' ? 'bg-primary text-white' : 'text-zinc-400 hover:text-white'}`}
            >
              <Edit3 className="w-3.5 h-3.5 mr-1.5" /> Paste Text
            </button>
          </div>

          {activeInputTab === 'file' ? (
            <div className="bg-surface border border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-4 text-primary relative z-10">
                <UploadCloud className="w-8 h-8" />
              </div>
              
              <h3 className="text-lg font-bold text-white mb-1 relative z-10">Upload Resume Document</h3>
              <p className="text-zinc-400 text-xs mb-6 max-w-[280px] relative z-10">Drag and drop your PDF, DOCX or TXT file here, or click to select.</p>
              
              <label htmlFor="resume-upload" className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-colors shadow-lg shadow-primary/20 relative z-10">
                Browse File
              </label>
              <input id="resume-upload" type="file" className="sr-only" accept=".pdf,.doc,.docx,.txt" onChange={handleFileUpload} />
              
              {file && (
                <div className="mt-6 w-full bg-background border border-border rounded-xl p-3 flex items-center justify-between z-10">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium text-white truncate max-w-[200px]">{file.name}</span>
                  </div>
                  <span className="text-xs text-zinc-500">{(file.size / 1024).toFixed(0)} KB</span>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-surface border border-border rounded-2xl p-4 flex flex-col space-y-2">
              <label className="text-xs font-semibold text-zinc-400 uppercase">Paste Resume Text</label>
              <textarea 
                rows={10}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste the plain text of your resume here (experience, skills, summary)..."
                className="w-full bg-background border border-border rounded-xl p-4 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-primary transition-colors resize-none leading-relaxed"
              ></textarea>
            </div>
          )}

          <button 
            onClick={handleScan}
            disabled={isScanning || (!file && !resumeText.trim())}
            className="w-full bg-accent hover:bg-accent/90 text-white py-3 rounded-xl font-bold transition-colors disabled:opacity-50 flex items-center justify-center shadow-lg shadow-accent/20"
          >
            {isScanning ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Analyzing Resume Text...</> : <><BarChart className="w-5 h-5 mr-2" /> Analyze ATS Compatibility</>}
          </button>
        </div>

        {/* Results Section */}
        <div className="bg-surface border border-border rounded-2xl p-8 flex flex-col h-full min-h-[420px]">
          {!isScanning && !results && (
            <div className="flex-1 flex flex-col items-center justify-center text-zinc-500 text-center">
              <FileCode className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-sm font-medium text-zinc-300 mb-1">No Analysis Ready</p>
              <p className="text-xs max-w-[260px]">Select target job role and upload your resume to see ATS score breakdown.</p>
            </div>
          )}

          {isScanning && (
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="relative w-28 h-28 mb-6">
                <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-primary animate-pulse" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Scanning Keywords & Metrics...</h3>
              <p className="text-zinc-400 text-xs">Evaluating against {roleKeywords[targetRole]?.title || 'Target Role'}</p>
            </div>
          )}

          {results && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-border">
                <div>
                  <h3 className="text-xl font-bold text-white">{results.roleTitle}</h3>
                  <p className="text-zinc-400 text-sm mt-1">ATS Match: <span className={`font-bold ${results.score >= 80 ? 'text-accent' : 'text-yellow-400'}`}>{results.atsMatch}</span></p>
                </div>
                <div className="w-18 h-18 rounded-2xl bg-primary/20 border border-primary/30 flex flex-col items-center justify-center px-4 py-2">
                  <span className="text-3xl font-extrabold text-white">{results.score}</span>
                  <span className="text-[10px] text-zinc-400 uppercase font-bold">/100 Score</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase text-zinc-400 tracking-wider mb-3 flex items-center">
                  <AlertTriangle className="w-4 h-4 text-warning mr-2" />
                  Key Enhancement Recommendations
                </h4>
                <ul className="space-y-2.5">
                  {results.suggestions.map((s, i) => (
                    <li key={i} className="text-xs text-zinc-300 bg-background p-3 rounded-xl border border-border leading-relaxed flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2.5 shrink-0"></span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div>
                  <p className="text-xs font-semibold text-zinc-400 uppercase mb-2">Matching Keywords Found</p>
                  <div className="flex flex-wrap gap-1.5">
                    {results.keywordsFound.map(k => (
                      <span key={k} className="px-2.5 py-1 bg-accent/10 border border-accent/20 text-accent rounded-lg text-xs font-medium">{k}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-zinc-400 uppercase mb-2">Missing Priority Keywords</p>
                  <div className="flex flex-wrap gap-1.5">
                    {results.missingKeywords.length > 0 ? results.missingKeywords.map(k => (
                      <span key={k} className="px-2.5 py-1 bg-warning/10 border border-warning/20 text-warning rounded-lg text-xs font-medium">{k}</span>
                    )) : (
                      <span className="text-xs text-zinc-500">None! All priority keywords found.</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

