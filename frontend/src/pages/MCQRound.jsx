import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, Clock, Award, RotateCcw, ChevronRight, HelpCircle, AlertCircle, ArrowLeft } from 'lucide-react';

const mcqPool = [
  {
    id: 'mcq-1',
    category: 'React & Virtual DOM',
    question: 'Why does React use keys when rendering arrays of components?',
    options: [
      'To automatically apply CSS styles to array children',
      'To help React identify which items have changed, been added, or removed for efficient Virtual DOM diffing',
      'To prevent asynchronous state updates from mutating state',
      'To enable strict TypeScript type-checking on mapped JSX elements'
    ],
    correctAnswer: 1,
    explanation: 'Keys give elements a stable identity across renders. React uses keys during the reconciliation diffing algorithm to minimize DOM mutations when lists re-order or update.'
  },
  {
    id: 'mcq-2',
    category: 'JavaScript Event Loop',
    question: 'Which queue in the Node.js Event Loop takes priority over Macrotask callback queues (such as setTimeout)?',
    options: [
      'Task Queue',
      'Microtask Queue (Promise.then & process.nextTick)',
      'IO Polling Phase Queue',
      'Idle Check Queue'
    ],
    correctAnswer: 1,
    explanation: 'The Microtask queue (which holds resolved Promise callbacks and process.nextTick in Node) is executed immediately after the current operation finishes, before moving to the next macrotask phase.'
  },
  {
    id: 'mcq-3',
    category: 'System Design & Caching',
    question: 'What is the main advantage of consistent hashing in distributed caching systems like Memcached or Redis clusters?',
    options: [
      'It reduces database storage size by 50%',
      'It ensures data is always encrypted in-flight',
      'Minimizes key re-mapping across nodes when cache servers are added or removed',
      'Guarantees 100% ACID transaction compliance across microservices'
    ],
    correctAnswer: 2,
    explanation: 'With traditional modulo hashing, adding or removing a node invalidates almost all keys. Consistent hashing maps keys and servers to a virtual ring, so only k/n keys are remapped on node changes.'
  },
  {
    id: 'mcq-4',
    category: 'Databases & Indexing',
    question: 'What type of data structure is most commonly used by B-Tree database indexes in PostgreSQL and MySQL InnoDB?',
    options: [
      'Self-balancing Search Tree (B+ Tree) with linked leaf nodes',
      'Doubly Linked List only',
      'Direct Hash Table without collision handling',
      'Undirected Cyclic Graph'
    ],
    correctAnswer: 0,
    explanation: 'B+ Trees maintain sorted data with logarithmic search complexity and link leaf nodes together, enabling fast sequential range queries on indexed database columns.'
  },
  {
    id: 'mcq-5',
    category: 'System Design',
    question: 'In a distributed rate limiter, which algorithm allows bursts of traffic while enforcing an average rate limit?',
    options: [
      'Token Bucket Algorithm',
      'Strict First-In-First-Out FIFO Queue',
      'Round-Robin DNS Routing',
      'Least Connections Load Balancing'
    ],
    correctAnswer: 0,
    explanation: 'The Token Bucket algorithm accumulates tokens up to a bucket capacity. Bursts of requests consume available tokens immediately, enforcing a sustained average rate as tokens refill.'
  }
];

export default function MCQRound() {
  const location = useLocation();
  const navigate = useNavigate();
  const config = location.state?.config || {};

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [answersHistory, setAnswersHistory] = useState([]);
  const [timer, setTimer] = useState(30);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const currentQ = mcqPool[currentIdx] || mcqPool[0];

  // Question Timer
  useEffect(() => {
    if (isQuizCompleted || isSubmitted) return;
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIdx, isSubmitted, isQuizCompleted]);

  const handleAutoSubmit = () => {
    if (!isSubmitted) {
      submitAnswer(-1);
    }
  };

  const submitAnswer = (optionIdx) => {
    if (isSubmitted) return;
    setSelectedOption(optionIdx);
    setIsSubmitted(true);

    const isCorrect = optionIdx === currentQ.correctAnswer;
    if (isCorrect) setScore((prev) => prev + 1);

    setAnswersHistory((prev) => [
      ...prev,
      {
        questionId: currentQ.id,
        question: currentQ.question,
        selected: optionIdx,
        correct: currentQ.correctAnswer,
        isCorrect
      }
    ]);
  };

  const handleNext = () => {
    setIsSubmitted(false);
    setSelectedOption(null);
    setTimer(30);

    if (currentIdx < mcqPool.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setAnswersHistory([]);
    setTimer(30);
    setIsQuizCompleted(false);
  };

  if (isQuizCompleted) {
    const percentage = Math.round((score / mcqPool.length) * 100);
    return (
      <div className="max-w-4xl mx-auto space-y-6 py-8">
        <div className="bg-surface border border-border rounded-3xl p-8 text-center flex flex-col items-center shadow-2xl relative overflow-hidden">
          <div className="w-20 h-20 rounded-3xl bg-primary/20 border border-primary/30 flex items-center justify-center mb-4 text-primary">
            <Award className="w-10 h-10" />
          </div>

          <h2 className="text-3xl font-extrabold text-white mb-1">MCQ Assessment Completed!</h2>
          <p className="text-zinc-400 text-sm mb-6">Topic Track: {config.type || 'Technical Fundamentals'}</p>

          <div className="flex items-center justify-center space-x-6 bg-background p-6 rounded-2xl border border-border w-full max-w-md mb-8">
            <div>
              <span className="text-4xl font-black text-accent">{score} / {mcqPool.length}</span>
              <p className="text-xs text-zinc-400 font-semibold uppercase mt-1">Correct Answers</p>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div>
              <span className="text-4xl font-black text-primary">{percentage}%</span>
              <p className="text-xs text-zinc-400 font-semibold uppercase mt-1">Accuracy Score</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={resetQuiz}
              className="bg-surface hover:bg-white/5 border border-border text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center"
            >
              <RotateCcw className="w-4 h-4 mr-2" /> Retake Quiz
            </button>
            <button 
              onClick={() => navigate('/')}
              className="bg-primary hover:bg-primary/90 text-white px-7 py-2.5 rounded-xl text-xs font-bold transition-colors shadow-lg shadow-primary/20"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <button onClick={() => navigate('/')} className="text-zinc-400 hover:text-white flex items-center text-xs font-semibold">
          <ArrowLeft className="w-4 h-4 mr-1" /> Exit Quiz
        </button>

        <div className="flex items-center space-x-4">
          <span className="px-3 py-1 bg-primary/20 text-primary border border-primary/30 text-xs font-bold rounded-full">
            Question {currentIdx + 1} of {mcqPool.length}
          </span>
          <div className="flex items-center space-x-2 bg-surface px-3 py-1.5 rounded-xl border border-border">
            <Clock className={`w-4 h-4 ${timer <= 10 ? 'text-red-500 animate-pulse' : 'text-zinc-400'}`} />
            <span className={`font-mono text-sm font-bold ${timer <= 10 ? 'text-red-400' : 'text-white'}`}>{timer}s</span>
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-surface border border-border rounded-3xl p-8 space-y-6 shadow-2xl relative">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <span className="text-xs font-bold text-primary uppercase tracking-wider">{currentQ.category}</span>
          <span className="text-xs text-zinc-500 font-medium">Single Answer MCQ</span>
        </div>

        <h3 className="text-xl font-bold text-white leading-relaxed">{currentQ.question}</h3>

        {/* Option Choices List */}
        <div className="space-y-3 pt-2">
          {currentQ.options.map((optText, optionIdx) => {
            const isSelected = selectedOption === optionIdx;
            const isCorrectOption = optionIdx === currentQ.correctAnswer;
            
            let btnStyle = 'bg-background border-border text-zinc-200 hover:border-zinc-600 hover:bg-white/5';
            if (isSubmitted) {
              if (isCorrectOption) {
                btnStyle = 'bg-accent/20 border-accent text-accent font-bold';
              } else if (isSelected && !isCorrectOption) {
                btnStyle = 'bg-red-500/20 border-red-500 text-red-400 font-bold';
              }
            } else if (isSelected) {
              btnStyle = 'bg-primary/20 border-primary text-white font-bold ring-1 ring-primary';
            }

            return (
              <div 
                key={optionIdx}
                onClick={() => !isSubmitted && submitAnswer(optionIdx)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${btnStyle}`}
              >
                <div className="flex items-center space-x-3.5">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                    isSubmitted && isCorrectOption ? 'bg-accent text-white' : 'bg-surface text-zinc-400 border border-border'
                  }`}>
                    {String.fromCharCode(65 + optionIdx)}
                  </div>
                  <span className="text-sm font-medium leading-relaxed">{optText}</span>
                </div>

                {isSubmitted && isCorrectOption && <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />}
                {isSubmitted && isSelected && !isCorrectOption && <XCircle className="w-5 h-5 text-red-400 shrink-0" />}
              </div>
            );
          })}
        </div>

        {/* Instant Explanation Box */}
        {isSubmitted && (
          <div className="p-4 bg-background border border-border rounded-2xl space-y-2 animate-in fade-in duration-300">
            <h4 className="text-xs font-bold uppercase text-primary tracking-wider flex items-center">
              <HelpCircle className="w-4 h-4 mr-1.5" /> Answer Explanation
            </h4>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">{currentQ.explanation}</p>
          </div>
        )}

        {/* Footer Next Button */}
        {isSubmitted && (
          <div className="pt-4 border-t border-border flex justify-end">
            <button 
              onClick={handleNext}
              className="bg-primary hover:bg-primary/90 text-white px-7 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center shadow-lg shadow-primary/20"
            >
              {currentIdx < mcqPool.length - 1 ? 'Next Question' : 'Complete Quiz & View Score'} <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
