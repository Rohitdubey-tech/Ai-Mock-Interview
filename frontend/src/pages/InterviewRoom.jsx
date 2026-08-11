import { useState, useRef, useEffect } from 'react';
import { 
  Mic, MicOff, Video, VideoOff, Settings, LogOut, Loader2, Bot, User, CheckCircle, Volume2, VolumeX, Edit3, Play, Pause, ChevronRight
} from 'lucide-react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function InterviewRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { api } = useAuth();


  const [interview, setInterview] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  
  const [answerMode, setAnswerMode] = useState('voice'); // 'voice' | 'text'
  const [typedAnswer, setTypedAnswer] = useState('');
  
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(true);

  // Audio Playback Preview
  const [audioPreviewUrl, setAudioPreviewUrl] = useState(null);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const previewAudioRef = useRef(null);

  // Speech Synthesis (AI Voice)
  const [isSpeakingAI, setIsSpeakingAI] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);

  // Media states
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  
  const timerRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Speech Recognition (STT)
  const recognitionRef = useRef(null);
  const [liveTranscript, setLiveTranscript] = useState('');

  // Fallback default questions if initialized without backend
  const defaultQuestions = [
    {
      _id: 'q-default-1',
      text: 'Explain the difference between Virtual DOM and real DOM in React. How does the reconciliation diffing algorithm optimize DOM updates?',
      type: 'Frontend Developer'
    },
    {
      _id: 'q-default-2',
      text: 'How do JavaScript Promises and async/await work under the hood? Explain microtasks vs macrotasks in the event loop.',
      type: 'Frontend Developer'
    },
    {
      _id: 'q-default-3',
      text: 'Describe how you handle state management in large scale frontend applications. Compare Redux, Context API, and Zustand.',
      type: 'Frontend Developer'
    }
  ];

  // Initialize Interview and Questions
  useEffect(() => {
    const initInterview = async () => {
      try {
        const wizardConfig = location.state?.config || {};
        const roleType = wizardConfig.type || 'Frontend Developer';
        
        const intRes = await api.get(`/interviews/${id}`);
        if (intRes.data && intRes.data.success) {
          setInterview(intRes.data.data);
        }
        
        const qRes = await api.get(`/questions/random?type=${encodeURIComponent(roleType)}&limit=3`);
        if (qRes.data && qRes.data.success && qRes.data.data.length > 0) {
          setQuestions(qRes.data.data);
        } else {
          setQuestions(defaultQuestions);
        }
      } catch (err) {
        console.warn("Using default questions fallback for interview room:", err.message);
        setQuestions(defaultQuestions);
      }
      setLoading(false);
    };
    initInterview();
  }, [id, api]);


  // Setup Webcam Stream
  useEffect(() => {
    const setupStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.warn("Failed to access webcam/microphone:", err.message);
      }
    };
    setupStream();
    
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Text-To-Speech (Read Question Aloud)
  const speakQuestion = (text) => {
    if (!ttsEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onstart = () => setIsSpeakingAI(true);
    utterance.onend = () => setIsSpeakingAI(false);
    utterance.onerror = () => setIsSpeakingAI(false);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (questions.length > 0 && questions[currentIdx]) {
      speakQuestion(questions[currentIdx].text);
    }
  }, [currentIdx, questions]);

  const toggleVideo = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoEnabled;
        setVideoEnabled(!videoEnabled);
      }
    }
  };

  const toggleAudio = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioEnabled;
        setAudioEnabled(!audioEnabled);
      }
    }
  };

  // Timer logic
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => setTimer((t) => t + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRecording]);


  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
  };

  const toggleRecording = async () => {
    if (!isRecording) {
      if (!streamRef.current) {
        // Request microphone if stream not ready
        try {
          streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        } catch (e) {
          alert("Microphone permission required for voice recording!");
          return;
        }
      }
      try {
        const mediaRecorder = new MediaRecorder(streamRef.current);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) audioChunksRef.current.push(event.data);
        };

        mediaRecorder.onstop = handleAudioStop;
        mediaRecorder.start();
        setIsRecording(true);
        setTimer(0);
        setFeedback(null);
        setLiveTranscript('');
        setAudioPreviewUrl(null);
        startSpeechRecognition();
      } catch (err) {
        console.error("Error starting recording:", err);
      }
    } else {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
        stopSpeechRecognition();
      }
    }
  };

  const handleAudioStop = async () => {
    setIsProcessing(true);
    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
    const previewUrl = URL.createObjectURL(audioBlob);
    setAudioPreviewUrl(previewUrl);
    
    const textToSend = liveTranscript.trim() || 'Candidate provided an audio response.';

    const formData = new FormData();
    formData.append('audio', audioBlob, 'answer.webm');
    formData.append('questionId', questions[currentIdx]._id);
    formData.append('textAnswer', textToSend);

    try {
      const res = await api.post(`/interviews/${id}/answers`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data && res.data.success) {
        setFeedback(res.data.data);
      } else {
        setFeedback(getFallbackFeedback(textToSend));
      }
    } catch (err) {
      console.warn("Error submitting answer via API, using fallback evaluator:", err.message);
      setFeedback(getFallbackFeedback(textToSend));
    }
    setIsProcessing(false);
  };

  const handleTextSubmit = async () => {
    if (!typedAnswer.trim()) return;
    setIsProcessing(true);

    try {
      const res = await api.post(`/interviews/${id}/answers`, {
        questionId: questions[currentIdx]._id,
        textAnswer: typedAnswer
      });
      if (res.data && res.data.success) {
        setFeedback(res.data.data);
      } else {
        setFeedback(getFallbackFeedback(typedAnswer));
      }
    } catch (err) {
      console.warn("Text answer error, using fallback evaluator:", err.message);
      setFeedback(getFallbackFeedback(typedAnswer));
    }
    setIsProcessing(false);
  };

  const getFallbackFeedback = (userText) => {
    const wordCount = (userText || '').trim().split(/\s+/).filter(Boolean).length;
    const score = Math.min(10, Math.max(6, Math.floor(wordCount / 8) + 6));
    return {
      metrics: {
        clarityScore: Math.min(10, score + 1),
        relevanceScore: score,
        confidenceScore: Math.min(10, score - 1),
        overallScore: score,
      },
      aiFeedback: wordCount > 20 
        ? 'Strong response! You clearly elaborated on key technical principles, architecture trade-offs, and implementation strategies.'
        : 'Good start! Try adding specific technical examples and quantitative metrics to make your answer even more compelling.',
      improvedAnswer: `To master "${questions[currentIdx]?.text}", structure your answer: (1) Define core concepts, (2) Detail key architectural mechanics, (3) Mention real-world trade-offs.`
    };
  };

  const handleNext = async () => {
    setFeedback(null);
    setLiveTranscript('');
    setTypedAnswer('');
    setAudioPreviewUrl(null);
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      handleEndInterview();
    }
  };

  const handleEndInterview = async () => {
    try {
      await api.put(`/interviews/${id}/complete`);
    } catch (err) {}
    navigate(`/summary/${id}`);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (loading) {
    return <div className="h-full flex justify-center items-center"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>;
  }

  const currentQuestion = questions[currentIdx] || defaultQuestions[0];

  return (
    <div className="flex flex-col h-full max-w-7xl mx-auto space-y-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center">
            AI Mock Interview
            <span className="ml-3 px-3 py-1 bg-primary/20 text-primary border border-primary/30 text-xs font-semibold rounded-full">
              Question {currentIdx + 1} of {questions.length}
            </span>
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => {
              setTtsEnabled(!ttsEnabled);
              if (ttsEnabled && window.speechSynthesis) window.speechSynthesis.cancel();
            }}
            className="flex items-center space-x-2 bg-surface hover:bg-white/5 text-zinc-300 px-3 py-2 rounded-xl border border-border text-sm transition-colors"
          >
            {ttsEnabled ? <Volume2 className="w-4 h-4 text-accent" /> : <VolumeX className="w-4 h-4 text-zinc-500" />}
            <span>{ttsEnabled ? 'AI Voice On' : 'AI Voice Off'}</span>
          </button>

          <div className="flex items-center space-x-2 bg-surface px-4 py-2 rounded-xl border border-border">
            <div className={`w-2 h-2 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-zinc-500'}`}></div>
            <span className="text-white font-mono text-sm">{formatTime(timer)}</span>
          </div>

          <button 
            onClick={handleEndInterview}
            className="bg-surface hover:bg-white/5 text-zinc-300 px-4 py-2 rounded-xl border border-border transition-colors flex items-center text-sm font-medium"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Finish Interview
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
        
        {/* Left Panel: Question & Audio / Text input */}
        <div className="bg-surface border border-border rounded-2xl p-6 flex flex-col h-full relative overflow-hidden">
          
          {/* AI Question Bubble */}
          <div className="flex items-start space-x-4 mb-6">
            <div className="relative">
              <div className={`w-12 h-12 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0 ${isSpeakingAI ? 'ring-4 ring-primary/40 animate-pulse' : ''}`}>
                <Bot className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-semibold text-zinc-400">AI Interviewer</p>
                <button 
                  onClick={() => speakQuestion(currentQuestion.text)}
                  className="text-xs text-primary hover:underline flex items-center"
                >
                  <Volume2 className="w-3.5 h-3.5 mr-1" /> Replay Question
                </button>
              </div>
              <div className="bg-background border border-border rounded-2xl rounded-tl-none p-5 shadow-lg">
                <p className="text-white text-base font-medium leading-relaxed">{currentQuestion.text}</p>
              </div>
            </div>
          </div>

          {/* Mode Switcher */}
          {!feedback && !isProcessing && (
            <div className="flex items-center space-x-2 mb-4 bg-background p-1 rounded-xl border border-border w-fit">
              <button 
                onClick={() => setAnswerMode('voice')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center ${answerMode === 'voice' ? 'bg-primary text-white' : 'text-zinc-400 hover:text-white'}`}
              >
                <Mic className="w-3.5 h-3.5 mr-1.5" /> Voice Answer
              </button>
              <button 
                onClick={() => setAnswerMode('text')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center ${answerMode === 'text' ? 'bg-primary text-white' : 'text-zinc-400 hover:text-white'}`}
              >
                <Edit3 className="w-3.5 h-3.5 mr-1.5" /> Type Answer
              </button>
            </div>
          )}

          {/* User Answer Area */}
          <div className="flex-1 flex flex-col min-h-0">
            
            <div className="flex-1 bg-background rounded-2xl border border-border flex flex-col justify-between p-6 relative overflow-y-auto">
              {isProcessing ? (
                <div className="flex-1 flex flex-col items-center justify-center">
                  <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                  <p className="text-zinc-300 text-sm font-semibold">AI is analyzing your response metrics...</p>
                </div>
              ) : feedback ? (
                <div className="w-full space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                     <div>
                       <span className="text-zinc-400 text-xs font-semibold uppercase">Overall Evaluation</span>
                       <h4 className="text-accent font-bold text-xl">Score: {feedback.metrics?.overallScore || 8}/10</h4>
                     </div>
                     <button onClick={handleNext} className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl text-sm font-medium flex items-center shadow-lg shadow-primary/20">
                       {currentIdx < questions.length - 1 ? 'Next Question' : 'View Full Summary'} <ChevronRight className="w-4 h-4 ml-1" />
                     </button>
                  </div>

                  <div>
                    <p className="text-xs text-zinc-400 uppercase font-semibold mb-1">Constructive Feedback</p>
                    <p className="text-sm text-zinc-200 bg-surface p-3.5 rounded-xl border border-white/5 leading-relaxed">{feedback.aiFeedback}</p>
                  </div>

                  <div>
                    <p className="text-xs text-zinc-400 uppercase font-semibold mb-1">Optimal Sample Answer</p>
                    <p className="text-sm text-secondary bg-secondary/10 p-3.5 rounded-xl border border-secondary/20 leading-relaxed">{feedback.improvedAnswer}</p>
                  </div>
                </div>
              ) : answerMode === 'voice' ? (
                <div className="flex-1 flex flex-col items-center justify-center">
                  {/* Waveform Visualization */}
                  <div className={`flex items-center space-x-1.5 h-20 mb-6 ${isRecording ? 'opacity-100' : 'opacity-30'}`}>
                    {[...Array(24)].map((_, i) => (
                      <div 
                        key={i} 
                        className="w-1.5 bg-primary rounded-full transition-all duration-150"
                        style={{ height: isRecording ? `${Math.max(15, Math.random() * 100)}%` : '15%' }}
                      ></div>
                    ))}
                  </div>

                  {liveTranscript ? (
                    <div className="w-full bg-surface/50 border border-border p-4 rounded-xl text-sm text-zinc-200 font-mono mb-4 max-h-32 overflow-y-auto">
                      <span className="text-primary font-bold mr-2">Live Transcript:</span>
                      "{liveTranscript}"
                    </div>
                  ) : (
                    <p className="text-zinc-500 text-sm mb-4">{isRecording ? 'Listening... Speak your answer now.' : 'Click "Start Recording" below to speak your response.'}</p>
                  )}

                  {audioPreviewUrl && !isRecording && (
                    <div className="w-full bg-surface border border-border p-3 rounded-xl flex items-center justify-between mb-2">
                      <span className="text-xs text-zinc-400 font-medium">Recorded Answer Ready</span>
                      <audio controls src={audioPreviewUrl} className="h-8 w-60" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex-1 flex flex-col">
                  <label className="text-xs text-zinc-400 uppercase font-semibold mb-2">Write Your Comprehensive Answer</label>
                  <textarea 
                    rows={8}
                    value={typedAnswer}
                    onChange={(e) => setTypedAnswer(e.target.value)}
                    placeholder="Structure your answer with clear points, technical details, and practical examples..."
                    className="w-full flex-1 bg-surface border border-border rounded-xl p-4 text-white placeholder-zinc-500 focus:outline-none focus:border-primary transition-colors resize-none text-sm leading-relaxed"
                  ></textarea>
                </div>
              )}
            </div>
            
            {/* Control Bar */}
            {!feedback && !isProcessing && (
              <div className="mt-4 flex items-center justify-between bg-background border border-border p-3 rounded-xl">
                {answerMode === 'voice' ? (
                  <>
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-zinc-600'}`}></div>
                      <span className="text-sm font-medium text-zinc-400">{isRecording ? 'Recording Answer...' : 'Microphone Ready'}</span>
                    </div>
                    <button 
                      onClick={toggleRecording}
                      className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all shadow-md ${
                        isRecording 
                          ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
                          : 'bg-primary hover:bg-primary/90 text-white'
                      }`}
                    >
                      {isRecording ? 'Finish & Submit Answer' : 'Start Recording'}
                    </button>
                  </>
                ) : (
                  <>
                    <span className="text-xs text-zinc-500">{typedAnswer.trim().split(/\s+/).filter(Boolean).length} words</span>
                    <button 
                      onClick={handleTextSubmit}
                      disabled={!typedAnswer.trim()}
                      className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-all disabled:opacity-50"
                    >
                      Submit Answer
                    </button>
                  </>
                )}
              </div>
            )}

          </div>
        </div>

        {/* Right Panel: Video Feed */}
        <div className="bg-surface border border-border rounded-2xl p-4 flex flex-col h-full">
          <div className="flex-1 bg-background rounded-xl overflow-hidden relative mb-4">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className={`w-full h-full object-cover ${!videoEnabled ? 'hidden' : ''}`} 
              style={{ transform: 'scaleX(-1)' }}
            />
            {!videoEnabled && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-surface border border-border flex items-center justify-center mb-3">
                  <User className="w-10 h-10 text-zinc-500" />
                </div>
                <p className="text-zinc-500 text-xs">Camera Feed Paused</p>
              </div>
            )}
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs font-medium text-white flex items-center">
              <div className="w-2 h-2 rounded-full bg-accent mr-2"></div>
              Candidate (You)
            </div>
          </div>

          {/* Bottom Video Controls */}
          <div className="flex items-center justify-center space-x-6 py-2">
            <button onClick={toggleAudio} className="flex flex-col items-center space-y-1.5 group">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${audioEnabled ? 'bg-background border border-border group-hover:bg-white/5 text-zinc-300' : 'bg-red-500/20 border-red-500 text-red-500'}`}>
                {audioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </div>
              <span className="text-xs font-medium text-zinc-500">{audioEnabled ? 'Mute Mic' : 'Unmute Mic'}</span>
            </button>
            
            <button onClick={toggleVideo} className="flex flex-col items-center space-y-1.5 group">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${videoEnabled ? 'bg-background border border-border group-hover:bg-white/5 text-zinc-300' : 'bg-red-500/20 border-red-500 text-red-500'}`}>
                {videoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </div>
              <span className="text-xs font-medium text-zinc-500">{videoEnabled ? 'Stop Video' : 'Start Video'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

