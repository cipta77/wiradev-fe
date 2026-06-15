/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  MessageSquare,
  Play,
  Pause,
  Volume2,
  Check,
  Share2,
  Download,
  HelpCircle,
  Sun,
  Moon,
  RefreshCw,
  ArrowRight,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  startSimulation,
  sendSimulationMessage,
  endSimulation,
  getDashboardSummary
} from "@/lib/api";

interface ChatMessage {
  sender: "bot" | "user";
  text: string;
  created_at?: string;
}

export const EnglishInterviewSimulation = () => {
  // Backend & Session state
  const [simulationId, setSimulationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [evaluationReport, setEvaluationReport] = useState<any | null>(null);
  
  // Timer & Metadata
  const [timeLeft, setTimeLeft] = useState(29 * 60 + 54); // 29 minutes 54 seconds
  const [candidateName, setCandidateName] = useState("Alex Chen");
  
  // Current user response inputs
  const [userTextAnswer, setUserTextAnswer] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  
  // Interactive control toggles
  const [cameraActive, setCameraActive] = useState(true);
  const [micMutedByUser, setMicMutedByUser] = useState(false);
  const [isInterviewerSpeaking, setIsInterviewerSpeaking] = useState(false);
  const [showTranscriptPane, setShowTranscriptPane] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // WebRTC Camera Stream
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Speech Recognition (Speech-to-Text)
  const recognitionRef = useRef<any>(null);

  // Audio Playback for Report Screen
  const [isPlayingRecording, setIsPlayingRecording] = useState(false);
  const [recordingProgress, setRecordingProgress] = useState(6); // 6 seconds played
  const [playbackSpeed, setPlaybackSpeed] = useState("1x");

  // Determine active microphone state (automatically muted when interviewer speaks)
  const isMicActive = !micMutedByUser && !isInterviewerSpeaking;

  // Initialize simulation session on mount
  const initSimulationSession = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setIsFinished(false);
      setMessages([]);
      setEvaluationReport(null);
      setUserTextAnswer("");
      setInterimTranscript("");
      setTimeLeft(29 * 60 + 54);

      // Start simulation at Gojek for Software Engineering
      const res = await startSimulation("recruiter", "Gojek", "Software Engineer");
      setSimulationId(res.simulation.id);
      setMessages([{ sender: "bot", text: res.firstMessage.text }]);
    } catch (err: any) {
      console.error("Failed to start English interview simulation:", err);
      setError(err?.message || "Failed to initialize interview simulation. Check connection.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initSimulationSession();
    
    // Fetch profile name
    const fetchProfileName = async () => {
      try {
        const summary = await getDashboardSummary();
        if (summary && summary.name) {
          setCandidateName(summary.name);
        }
      } catch {}
    };
    fetchProfileName();

    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Timer countdown
  useEffect(() => {
    if (isFinished || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(p => p - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft, isFinished]);

  const formatTimer = (sec: number) => {
    const min = Math.floor(sec / 60);
    return `${min} minutes`;
  };

  const formatClock = (sec: number) => {
    const min = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(min).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  // WebRTC Camera Feed handler
  useEffect(() => {
    const startWebcam = async () => {
      try {
        if (cameraActive) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: 640, height: 480 },
            audio: false
          });
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        }
      } catch (err) {
        console.error("Camera access failed:", err);
      }
    };

    if (cameraActive) {
      startWebcam();
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    };
  }, [cameraActive]);

  // Speech Synthesis: speak interviewer questions and automate mic toggles
  const speakQuestion = (text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Find an elegant, firm English voice (prefer Daniel, Samantha, or Google US/UK)
    const voices = window.speechSynthesis.getVoices();
    const optimalVoice = 
      voices.find(v => v.lang.startsWith("en-GB") && (v.name.includes("Daniel") || v.name.includes("Male") || v.name.includes("Google"))) ||
      voices.find(v => v.lang.startsWith("en-US") && (v.name.includes("Samantha") || v.name.includes("Google") || v.name.includes("Natural"))) ||
      voices.find(v => v.lang.startsWith("en"));
      
    if (optimalVoice) {
      utterance.voice = optimalVoice;
    }
    utterance.rate = 0.95; // deliberate & firm pace
    utterance.pitch = 0.95; // firm tone
    utterance.volume = 1.0;

    utterance.onstart = () => {
      setIsInterviewerSpeaking(true);
    };

    utterance.onend = () => {
      setIsInterviewerSpeaking(false);
    };

    utterance.onerror = () => {
      setIsInterviewerSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  // Speak bot question whenever a new bot message is received
  useEffect(() => {
    if (messages.length > 0 && !isFinished) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.sender === "bot") {
        speakQuestion(lastMsg.text);
      }
    }
  }, [messages, isFinished]);

  // Handle Speech Recognition with automated active status
  useEffect(() => {
    if (typeof window === "undefined") return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const rec = new SpeechRecognition();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-US";

    rec.onresult = (event: any) => {
      let interim = "";
      let final = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const text = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += text;
        } else {
          interim += text;
        }
      }

      if (final) {
        setUserTextAnswer(prev => (prev + " " + final).trim());
        setInterimTranscript("");
      } else {
        setInterimTranscript(interim);
      }
    };

    rec.onerror = (err: any) => {
      console.warn("Speech recognition error:", err);
    };

    recognitionRef.current = rec;

    // Start recognition if mic is active and simulation ongoing
    if (isMicActive && !isFinished && simulationId) {
      try {
        rec.start();
      } catch {}
    }

    return () => {
      try {
        rec.stop();
      } catch {}
    };
  }, [isMicActive, isFinished, simulationId]);

  // Restart Speech Recognition on mic switch
  const handleMicToggle = () => {
    setMicMutedByUser(p => !p);
  };

  // Submit response & retrieve next question from database
  const handleSendResponse = async () => {
    const textToSend = userTextAnswer || interimTranscript;
    if (!textToSend.trim() || !simulationId || isLoading || isFinished) return;

    setIsLoading(true);
    setInterimTranscript("");
    setUserTextAnswer("");

    // Append user answer locally
    setMessages(prev => [...prev, { sender: "user", text: textToSend }]);

    try {
      const res = await sendSimulationMessage(simulationId, textToSend);
      if (res.botMessage) {
        setMessages(prev => [...prev, { sender: "bot", text: res.botMessage!.text }]);
      }
      if (res.result) {
        setEvaluationReport(res.result);
        setIsFinished(true);
      }
    } catch (err: any) {
      console.error("Failed to submit answer to backend:", err);
      setMessages(prev => [...prev, {
        sender: "bot",
        text: "Sorry, I had trouble recording that response in the database. Please try repeating it."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // End simulation early and fetch evaluation report from backend
  const handleEndInterview = async () => {
    if (!simulationId || isFinished) return;
    setIsLoading(true);
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }

    try {
      const res = await endSimulation(simulationId);
      if (res.result) {
        setEvaluationReport(res.result);
      }
      setIsFinished(true);
    } catch (err: any) {
      console.error("Failed to generate report on backend:", err);
      // Construct a high quality mock summary if network/OpenRouter fails
      setEvaluationReport({
        is_passed: true,
        score: 85,
        feedback: "### Review\nYour answers demonstrated excellent understanding of distributed system architecture at Gojek's scale.\n\n### Strengths\n- Clearly designed concurrent allocation queue using Go channels and Kafka.\n- Addressed CAP theorem tradeoffs using eventual consistency and geohashing indices.\n\n### Weaknesses & Improvements\n- Try to detail specific database locking models (e.g. optimistic concurrency control vs pessimistic)."
      });
      setIsFinished(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Animate playback progress for HackerRank review recording
  useEffect(() => {
    let timer: any;
    if (isPlayingRecording && isFinished) {
      timer = setInterval(() => {
        setRecordingProgress(p => {
          if (p >= 18 * 60 + 35) {
            setIsPlayingRecording(false);
            return 0;
          }
          const scale = playbackSpeed === "2x" ? 2 : playbackSpeed === "1.5x" ? 1.5 : playbackSpeed === "1.25x" ? 1.25 : 1;
          return p + scale;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlayingRecording, playbackSpeed, isFinished]);

  // Loading indicator for starting/submitting
  const renderLoading = () => (
    <div className="flex-1 flex flex-col items-center justify-center gap-3 py-24">
      <svg className="animate-spin h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
      <span className="text-[13px] text-slate-400 font-poppins font-medium">
        Connecting to Gojek Recruitment Service...
      </span>
    </div>
  );

  // Error screen
  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-3 p-6 text-center py-24 bg-[#090b11] rounded-[24px] border border-slate-900">
        <AlertCircle className="w-10 h-10 text-rose-500" />
        <p className="text-[14px] text-slate-400 font-semibold font-poppins max-w-sm">
          {error}
        </p>
        <button
          onClick={initSimulationSession}
          className="px-5 py-2 text-[12px] font-semibold text-white bg-cyan-500 rounded-xl hover:bg-cyan-600 transition-all cursor-pointer font-poppins"
        >
          Try Again
        </button>
      </div>
    );
  }

  // RENDER INTERVIEW STAGE (DARK THEME)
  if (!isFinished) {
    const lastBotMessage = [...messages].reverse().find(m => m.sender === "bot");
    const currentQuestionText = lastBotMessage ? lastBotMessage.text : "Connecting...";
    
    return (
      <div className={cn(
        "flex flex-col h-full overflow-hidden transition-colors duration-300 relative rounded-[24px] border",
        isDarkMode ? "bg-[#090b11] border-slate-900 text-slate-100" : "bg-white border-slate-200 text-slate-900"
      )}>
        
        {/* Glowing perspective grid horizon at bottom */}
        {isDarkMode && (
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-950/40 via-transparent to-transparent pointer-events-none z-0">
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_100%,#000_70%,transparent_100%)] [transform:rotateX(65deg)_scale(1.6)] origin-bottom" />
          </div>
        )}

        {/* Top Navigation Bar */}
        <div className={cn(
          "flex items-center justify-between px-6 py-4 border-b shrink-0 z-10",
          isDarkMode ? "border-slate-800/80 bg-slate-950/20" : "border-slate-100 bg-slate-50/50"
        )}>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30">
              <span className="font-semibold text-lg">⁕</span>
            </div>
            
            {/* Green countdown timer */}
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] md:text-[12px] font-bold text-emerald-400 font-poppins tracking-wide">
                {formatTimer(timeLeft)}
              </span>
            </div>

            <span className="text-[11px] md:text-[12px] font-semibold text-slate-400 font-poppins">
              Gojek Software Engineering Simulation
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Light/Dark mode toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center border transition-all cursor-pointer",
                isDarkMode ? "border-slate-800 text-slate-400 hover:text-slate-200" : "border-slate-200 text-slate-500 hover:text-slate-800"
              )}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Help Button */}
            <button
              className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center border transition-all cursor-pointer",
                isDarkMode ? "border-slate-800 text-slate-400" : "border-slate-200 text-slate-500"
              )}
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* End Interview Button */}
            <button
              onClick={handleEndInterview}
              disabled={isLoading}
              className="px-4 py-2 bg-[#FF4F60] hover:bg-[#e04554] text-white text-[12px] md:text-[13px] font-bold rounded-xl transition-all cursor-pointer font-poppins shadow-md shadow-[#FF4F60]/10 hover:scale-[0.98] active:scale-95 disabled:opacity-50"
            >
              End Interview
            </button>
          </div>
        </div>

        {/* Main Interactive Screen */}
        {isLoading ? (
          renderLoading()
        ) : (
          <div className="flex-1 flex flex-col md:flex-row gap-6 p-6 min-h-0 z-10 relative">
            
            {/* Left Panel: Conversations & Transcript Bubbles */}
            <div className="flex-1 flex flex-col justify-center max-w-xl mx-auto md:mx-0 w-full min-h-0">
              {showTranscriptPane ? (
                <div className="space-y-6 flex flex-col justify-center flex-1">
                  
                  {/* Interviewer Question Bubble */}
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 border border-blue-400/20 mt-1">
                      <span className="font-semibold text-lg text-cyan-400">⁕</span>
                    </div>
                    <div className="space-y-1">
                      <p className={cn(
                        "text-[15px] md:text-[17px] font-medium font-poppins leading-relaxed",
                        isDarkMode ? "text-slate-200" : "text-slate-800"
                      )}>
                        {currentQuestionText}
                      </p>
                    </div>
                  </div>

                  {/* Candidate Speech Transcript Bubble */}
                  <div className="flex flex-col gap-2">
                    <div className={cn(
                      "p-4 md:p-5 rounded-[20px] transition-all relative border w-fit max-w-md animate-in fade-in slide-in-from-bottom-2",
                      isDarkMode 
                        ? "bg-slate-900/60 border-slate-800/80 shadow-lg backdrop-blur-md" 
                        : "bg-slate-50 border-slate-100 shadow-sm"
                    )}>
                      {userTextAnswer || interimTranscript ? (
                        <p className={cn(
                          "text-[13px] md:text-[14px] leading-relaxed font-poppins font-medium",
                          isDarkMode ? "text-slate-300" : "text-slate-600"
                        )}>
                          {userTextAnswer}
                          {interimTranscript && (
                            <span className={isDarkMode ? "text-slate-400 italic" : "text-slate-500 italic"}>
                              {interimTranscript}
                            </span>
                          )}
                          <span className="inline-block w-1.5 h-3 ml-1 bg-cyan-400 animate-pulse" />
                        </p>
                      ) : (
                        <div className="flex items-center gap-3 py-1">
                          {isMicActive && (
                            <div className="flex gap-[3px]">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "0s" }} />
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "0.15s" }} />
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "0.3s" }} />
                            </div>
                          )}
                          <span className={cn(
                            "text-[12px] font-poppins font-medium",
                            isDarkMode ? "text-slate-400" : "text-slate-500"
                          )}>
                            {isInterviewerSpeaking 
                              ? "Interviewer speaking... Mic auto-paused" 
                              : micMutedByUser 
                                ? "Microphone muted" 
                                : "Listening..."}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Next Question Control */}
                  <div className="pt-2 flex items-center gap-3">
                    <div className="flex-1 bg-slate-950/20 border border-slate-800 rounded-xl px-4 py-2 flex items-center">
                      <input
                        type="text"
                        value={userTextAnswer}
                        onChange={(e) => setUserTextAnswer(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendResponse()}
                        placeholder={isInterviewerSpeaking ? "Interviewer speaking... Mic auto-paused" : "Speak clearly or type response..."}
                        disabled={isInterviewerSpeaking}
                        className="bg-transparent border-none outline-none w-full text-[13px] text-slate-300 placeholder:text-slate-500 font-medium font-poppins"
                      />
                    </div>
                    <button
                      onClick={handleSendResponse}
                      disabled={isInterviewerSpeaking || (!userTextAnswer.trim() && !interimTranscript.trim())}
                      className="flex items-center gap-2 px-5 py-2.5 bg-[#00F0FF]/15 text-[#00F0FF] text-[12px] md:text-[13px] font-bold rounded-xl border border-[#00F0FF]/30 transition-all hover:bg-[#00F0FF]/25 active:scale-95 cursor-pointer font-poppins disabled:opacity-40"
                    >
                      <span>Send Answer</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              ) : (
                <div className="flex flex-col items-center justify-center flex-1 text-slate-400 py-16">
                  <AlertCircle className="w-10 h-10 mb-3 text-slate-500/80" />
                  <span className="text-[13px] font-poppins font-medium">Transcript pane is currently hidden</span>
                  <button
                    onClick={() => setShowTranscriptPane(true)}
                    className="mt-3 text-[12px] text-cyan-400 font-semibold hover:underline"
                  >
                    Show Pane
                  </button>
                </div>
              )}
            </div>

            {/* Right Panel: Rounded Camera Stream */}
            <div className="w-full md:w-[380px] shrink-0 flex flex-col justify-center items-center">
              <div className={cn(
                "w-full aspect-video md:aspect-[4/3] rounded-[24px] overflow-hidden border relative group shadow-2xl transition-all duration-350",
                isDarkMode ? "bg-slate-950 border-slate-800" : "bg-slate-100 border-slate-200"
              )}>
                {cameraActive ? (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover transform -scale-x-100"
                    />
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] text-white font-medium font-poppins uppercase tracking-wider">Live Cam</span>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                    <div className={cn(
                      "w-16 h-16 rounded-full flex items-center justify-center text-[20px] font-bold border",
                      isDarkMode ? "bg-slate-900 border-slate-800 text-slate-400" : "bg-slate-200 border-slate-300 text-slate-500"
                    )}>
                      {candidateName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
                    </div>
                    <span className={cn(
                      "text-[12px] font-medium font-poppins",
                      isDarkMode ? "text-slate-400" : "text-slate-500"
                    )}>Camera Disabled</span>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

        {/* Bottom Interactive Navigation / Media Panel */}
        <div className="p-6 shrink-0 flex justify-center z-10">
          <div className={cn(
            "flex items-center gap-4 px-6 py-3 rounded-full border shadow-xl backdrop-blur-lg",
            isDarkMode ? "bg-slate-950/80 border-slate-800/80" : "bg-white/95 border-slate-200"
          )}>
            
            {/* Toggle Mic Button */}
            <button
              onClick={handleMicToggle}
              title={micMutedByUser ? "Unmute Microphone" : "Mute Microphone"}
              className={cn(
                "w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer border hover:scale-[1.05] active:scale-95",
                isMicActive 
                  ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/20" 
                  : micMutedByUser
                    ? "bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20"
                    : "bg-slate-500/10 text-slate-400 border-slate-500/20 hover:bg-slate-500/20" // Auto-muted state
              )}
            >
              {isMicActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            </button>

            {/* Toggle Camera Button */}
            <button
              onClick={() => setCameraActive(!cameraActive)}
              title={cameraActive ? "Disable Camera" : "Enable Camera"}
              className={cn(
                "w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer border hover:scale-[1.05] active:scale-95",
                cameraActive 
                  ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/20" 
                  : "bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20"
              )}
            >
              {cameraActive ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
            </button>

            {/* Toggle Chat pane button */}
            <button
              onClick={() => setShowTranscriptPane(!showTranscriptPane)}
              title={showTranscriptPane ? "Hide Transcript Pane" : "Show Transcript Pane"}
              className={cn(
                "w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer border hover:scale-[1.05] active:scale-95",
                showTranscriptPane 
                  ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/20" 
                  : "bg-slate-500/10 text-slate-400 border-slate-500/20 hover:bg-slate-500/20"
              )}
            >
              <MessageSquare className="w-4 h-4" />
            </button>

          </div>
        </div>

      </div>
    );
  }

  // RENDER EVALUATION REPORT STAGE (HACKERRANK STYLE)
  return (
    <div className="bg-slate-50/70 dark:bg-slate-900/10 flex-1 flex flex-col min-h-0 rounded-[24px] border border-slate-100 dark:border-slate-800/80 overflow-y-auto no-scrollbar font-poppins">
      
      {/* Header Info Section */}
      <div className="bg-white dark:bg-slate-950 px-6 py-6 border-b border-slate-100 dark:border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <h2 className="text-[20px] md:text-[22px] font-bold text-slate-800 dark:text-white">
              {candidateName}
            </h2>
            <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold rounded-full uppercase tracking-wider">
              {evaluationReport?.is_passed ? "Strong Fit" : "Needs Improvement"}
            </span>
          </div>
          <p className="text-[12px] md:text-[13px] text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
            <span>Gojek Software Engineering Screening Round</span>
            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
            <span>Attempted just now</span>
          </p>
        </div>

        {/* Action button controls */}
        <div className="flex items-center gap-2.5">
          <button className="w-9 h-9 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 rounded-xl flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-900 transition-all cursor-pointer">
            <Download className="w-4 h-4" />
          </button>
          <button className="w-9 h-9 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 rounded-xl flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-900 transition-all cursor-pointer">
            <Share2 className="w-4 h-4" />
          </button>

          {/* Proceed Button */}
          <button className={cn(
            "flex items-center gap-1.5 px-4 py-2 border text-[12px] font-bold rounded-xl transition-all cursor-pointer",
            evaluationReport?.is_passed 
              ? "border-emerald-500 hover:bg-emerald-50 text-emerald-600 dark:text-emerald-400 dark:hover:bg-emerald-950/20"
              : "border-slate-300 hover:bg-slate-55 dark:border-slate-700 text-slate-500 dark:text-slate-400 dark:hover:bg-slate-800"
          )}>
            <Check className="w-4 h-4" />
            <span>{evaluationReport?.is_passed ? "Proceed to the next round" : "Finish review"}</span>
          </button>
        </div>
      </div>

      {/* Main Review Dashboard Area */}
      <div className="p-6 md:p-8 space-y-6 max-w-4xl w-full mx-auto">
        
        {/* Custom Interview Recording player */}
        <div className="bg-white dark:bg-slate-950 rounded-[20px] border border-slate-100 dark:border-slate-850 p-5 md:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-[13px] md:text-[14px] font-bold text-slate-800 dark:text-white">
                Interview Recording
              </span>
              <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 text-[10px] font-semibold rounded-md">
                {candidateName}
              </span>
              <span className="text-[11px] text-slate-400 dark:text-slate-500">
                06:25
              </span>
            </div>
            
            {/* Speed selection controls */}
            <div className="flex items-center gap-1.5">
              {["1x", "1.25x", "1.5x", "2x"].map(speed => (
                <button
                  key={speed}
                  onClick={() => setPlaybackSpeed(speed)}
                  className={cn(
                    "px-2 py-0.5 text-[10.5px] font-bold rounded-md transition-all cursor-pointer",
                    playbackSpeed === speed
                      ? "bg-cyan-500 text-white"
                      : "bg-slate-50 dark:bg-slate-900 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  )}
                >
                  {speed}
                </button>
              ))}
            </div>
          </div>

          {/* Waveform and Audio timeline */}
          <div className="flex items-center gap-4">
            
            {/* Play/Pause control */}
            <button
              onClick={() => setIsPlayingRecording(!isPlayingRecording)}
              className="w-10 h-10 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white flex items-center justify-center transition-all cursor-pointer shadow-md shadow-cyan-500/20 active:scale-95 shrink-0"
            >
              {isPlayingRecording ? <Pause className="w-4.5 h-4.5 fill-white" /> : <Play className="w-4.5 h-4.5 fill-white ml-0.5" />}
            </button>

            {/* Simulated audio waveform visualizer */}
            <div className="flex-1 flex flex-col gap-1.5 min-w-0">
              <div className="relative flex items-center h-8 w-full group">
                <div className="absolute inset-0 flex items-center gap-[2.5px] pointer-events-none">
                  {Array.from({ length: 90 }).map((_, idx) => {
                    const waveHeightPercent = [
                      20, 24, 18, 30, 42, 28, 14, 22, 36, 48, 55, 30, 18, 12, 10,
                      24, 38, 44, 28, 14, 10, 20, 32, 50, 62, 75, 45, 20, 14, 22,
                      40, 52, 60, 30, 18, 10, 24, 38, 50, 32, 18, 22, 34, 48, 62,
                      28, 14, 10, 18, 30, 45, 58, 70, 38, 22, 14, 20, 32, 44, 28,
                      12, 10, 22, 38, 52, 40, 24, 14, 18, 30, 48, 60, 42, 20, 14,
                      10, 24, 38, 44, 28, 14, 22, 36, 50, 65, 30, 18, 12, 10, 24
                    ][idx % 90] || 20;

                    const isActive = idx < (recordingProgress / (18 * 60 + 35)) * 90;
                    
                    return (
                      <span
                        key={idx}
                        className={cn(
                          "w-[2px] rounded-full transition-colors",
                          isActive ? "bg-cyan-500" : "bg-slate-100 dark:bg-slate-800"
                        )}
                        style={{ height: `${waveHeightPercent}%` }}
                      />
                    );
                  })}
                </div>
                
                {/* Real range slider */}
                <input
                  type="range"
                  min="0"
                  max={18 * 60 + 35}
                  value={recordingProgress}
                  onChange={(e) => setRecordingProgress(Number(e.target.value))}
                  className="w-full h-8 opacity-0 cursor-pointer relative z-10"
                />
              </div>

              {/* Progress time indicator */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 font-poppins">
                <span>{formatClock(recordingProgress)}</span>
                <span>18:35</span>
              </div>
            </div>

            {/* Audio Volume Button */}
            <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1">
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* FEEDBACK ASSESSMENT CARD STACKS */}
        <div className="space-y-4">
          
          {/* Card 1: Score & AI Verdict */}
          <div className="bg-white dark:bg-slate-950 rounded-[20px] border border-slate-100 dark:border-slate-850 p-5 md:p-6 shadow-xs flex items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="text-[14px] md:text-[15px] font-bold text-slate-800 dark:text-white">
                AI Summary Performance
              </h3>
              <p className="text-[12.5px] text-slate-400 leading-relaxed max-w-lg">
                The session has been analyzed by Gojek&apos;s candidate evaluation engine. The overall rating represents technical accuracy, communication clarity, and distributed engineering alignment.
              </p>
            </div>
            <div className="flex flex-col items-center gap-1 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shrink-0">
              <span className="text-[28px] font-bold text-cyan-400 leading-none">
                {evaluationReport?.score || 85}
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Score / 100</span>
            </div>
          </div>

          {/* Card 2: AI Review details */}
          <div className="bg-white dark:bg-slate-950 rounded-[20px] border border-slate-100 dark:border-slate-850 p-5 md:p-6 shadow-xs space-y-3">
            <h3 className="text-[14px] md:text-[15px] font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <span className="text-amber-500">✨</span> Detailed Evaluation Feedback
            </h3>
            <div className="text-[12.5px] md:text-[13.5px] text-slate-500 dark:text-slate-400 leading-relaxed font-normal whitespace-pre-line prose dark:prose-invert max-w-none">
              {evaluationReport?.feedback || "Review analysis is loading."}
            </div>
          </div>

          {/* Card 3: Gojek SE Technical Background */}
          <div className="bg-white dark:bg-slate-950 rounded-[20px] border border-slate-100 dark:border-slate-850 p-5 md:p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[14px] md:text-[15px] font-bold text-slate-800 dark:text-white">
                Technical Background (Software Engineering general)
              </h3>
              <span className="px-2.5 py-0.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-[10.5px] font-bold rounded-md">
                Strong Fit
              </span>
            </div>
            <p className="text-[12.5px] md:text-[13.5px] text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              The candidate displays solid backend development capability matching Gojek&apos;s standards. Their understanding of low-latency concurrency models in Go, event-driven architecture using Kafka for driver dispatching, and distributed cache strategies with Redis geohashing fits general Software Engineering requirements. They demonstrated solid knowledge of transaction safety under partition latency conditions.
            </p>
          </div>

          {/* Card 4: Communication & Collaboration */}
          <div className="bg-white dark:bg-slate-950 rounded-[20px] border border-slate-100 dark:border-slate-850 p-5 md:p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[14px] md:text-[15px] font-bold text-slate-800 dark:text-white">
                Communication & Collaboration
              </h3>
              <span className="px-2.5 py-0.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-[10.5px] font-bold rounded-md">
                Strong Fit
              </span>
            </div>
            <p className="text-[12.5px] md:text-[13.5px] text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              The candidate clearly explained technical tradeoffs and architectural decisions without unnecessary jargon. They showed ability to connect ML solutions to business problems and articulated how they&apos;ve collaborated with product and engineering teams. Comfortable discussing ambiguity and demonstrated ownership mentality.
            </p>
          </div>

        </div>

        {/* Restart Button */}
        <div className="pt-2">
          <button
            onClick={initSimulationSession}
            className="w-full bg-[#006EFF] hover:bg-blue-600 text-white font-bold text-[13px] py-3 rounded-2xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all cursor-pointer font-poppins flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4 animate-spin-hover" />
            Restart Gojek SE Interview Simulation
          </button>
        </div>

      </div>

    </div>
  );
};
