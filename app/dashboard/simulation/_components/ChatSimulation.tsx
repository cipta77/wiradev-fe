/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Bot,
  User,
  Send,
  Mic,
  X,
  Sparkles,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  startSimulation,
  sendSimulationMessage,
  SimulationMessage,
  SimulationResultReport,
} from "@/lib/api";

const BotMessage = ({ text }: { text: string }) => (
  <div className="flex items-start gap-2 max-w-[90%] md:max-w-[85%] animate-in fade-in slide-in-from-left-2 duration-350">
    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0 border-[0.8px] border-slate-200/50">
      <Bot className="w-3.5 h-3.5" />
    </div>
    <div className="bg-slate-50 p-3 rounded-[16px] rounded-tl-none border border-[#F1F5F9] shadow-xs">
      <p className="text-[13px] text-slate-700 leading-relaxed font-poppins font-medium whitespace-pre-line">
        {text}
      </p>
    </div>
  </div>
);

const UserMessage = ({ text }: { text: string }) => (
  <div className="flex items-start gap-2 max-w-[90%] md:max-w-[85%] ml-auto justify-end animate-in fade-in slide-in-from-right-2 duration-350">
    <div className="bg-[#066EFF] p-3 rounded-[16px] rounded-tr-none text-white max-w-full shadow-sm shadow-blue-500/10">
      <p className="text-[13px] leading-relaxed font-poppins font-medium whitespace-pre-line">
        {text}
      </p>
    </div>
    <div className="w-7 h-7 rounded-full bg-[#066EFF]/10 flex items-center justify-center text-[#066EFF] shrink-0 border-[0.8px] border-blue-500/10">
      <User className="w-3.5 h-3.5" />
    </div>
  </div>
);

const TypingIndicator = () => (
  <div className="flex items-start gap-2 max-w-[90%] md:max-w-[85%] animate-in fade-in duration-300">
    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0 border-[0.8px] border-slate-200/50">
      <Bot className="w-3.5 h-3.5" />
    </div>
    <div className="bg-slate-50 p-3 rounded-[16px] rounded-tl-none border border-[#F1F5F9] flex items-center gap-1">
      <div
        className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"
        style={{ animationDelay: "0.15s" }}
      />
      <div
        className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"
        style={{ animationDelay: "0.3s" }}
      />
    </div>
  </div>
);

export const ChatSimulation = ({
  companyName,
  type = "recruiter",
}: {
  companyName: string;
  type?: "recruiter" | "salary";
}) => {
  const [simulationId, setSimulationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<SimulationMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isWaitingForBot, setIsWaitingForBot] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [resultReport, setResultReport] =
    useState<SimulationResultReport | null>(null);

  const [isListening, setIsListening] = useState(false);
  const [listeningTime, setListeningTime] = useState(0);
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const [showVoiceResult, setShowVoiceResult] = useState(false);
  const recognitionRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize a fresh simulation session (called manually via event handlers)
  const initSession = async () => {
    try {
      setLoading(true);
      setError(null);
      setIsFinished(false);
      setResultReport(null);
      setMessages([]);

      const comp = type === "recruiter" ? companyName : undefined;
      const res = await startSimulation(type, comp);

      setSimulationId(res.simulation.id);
      setMessages([res.firstMessage]);
    } catch (err) {
      console.error("Failed to start simulation session:", err);
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to load simulation. Please check connection.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    const start = async () => {
      // Defer all state transitions to microtask queue to avoid synchronous render path triggers
      await Promise.resolve();
      if (ignore) return;

      setLoading(true);
      setError(null);
      setIsFinished(false);
      setResultReport(null);
      setMessages([]);

      try {
        const comp = type === "recruiter" ? companyName : undefined;
        const res = await startSimulation(type, comp);
        if (ignore) return;
        setSimulationId(res.simulation.id);
        setMessages([res.firstMessage]);
      } catch (err) {
        if (ignore) return;
        console.error(
          "Failed to start simulation session on mount/prop-change:",
          err,
        );
        const msg =
          err instanceof Error
            ? err.message
            : "Failed to load simulation. Please check connection.";
        setError(msg);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    start();
    return () => {
      ignore = true;
    };
  }, [type, companyName]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isListening, isWaitingForBot]);

  useEffect(() => {
    let timer: any;
    if (isListening) {
      timer = setInterval(() => setListeningTime((p) => p + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isListening]);

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    try {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert(
          "Speech Recognition is not supported in this browser. Please use standard text input.",
        );
        return;
      }

      setVoiceTranscript("");
      setShowVoiceResult(false);
      setListeningTime(0);

      setShowVoiceResult(false);

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join("");

        setVoiceTranscript(transcript);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error("Speech recognition error:", err);
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    if (voiceTranscript.trim()) {
      setShowVoiceResult(true);
    }
  };

  const handleSend = async (overrideText?: string) => {
    const textToSend = overrideText || inputText;
    if (!textToSend.trim() || !simulationId || isWaitingForBot || isFinished)
      return;

    if (isListening) stopListening();
    setShowVoiceResult(false);
    setInputText("");

    // 1. Render user message locally
    const userMsg: SimulationMessage = {
      id: Date.now().toString(),
      simulation_id: simulationId,
      sender: "user",
      text: textToSend,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsWaitingForBot(true);

    try {
      // 2. Post to backend
      const res = await sendSimulationMessage(simulationId, textToSend);

      if (res.botMessage) {
        setMessages((prev) => [...prev, res.botMessage!]);
      }

      if (res.result) {
        setResultReport(res.result);
        setIsFinished(true);
      }
    } catch (err) {
      console.error("Failed to send simulation response:", err);
      const botErr: SimulationMessage = {
        id: (Date.now() + 1).toString(),
        simulation_id: simulationId,
        sender: "bot",
        text: "Sorry, I had trouble processing that response. Please try sending again.",
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botErr]);
    } finally {
      setIsWaitingForBot(false);
    }
  };

  // Helper to render markdown-like feedback clean and styled
  const renderFeedbackText = (feedback: string) => {
    if (!feedback) return null;

    // Split text by section markers
    const lines = feedback.split("\n");
    return (
      <div className="space-y-4">
        {lines.map((line, idx) => {
          const cleanLine = line.trim();
          if (!cleanLine) return null;

          if (cleanLine.startsWith("###")) {
            return (
              <h4
                key={idx}
                className="text-[13px] font-bold text-slate-800 font-poppins pt-2 border-b border-slate-100 pb-1 flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                {cleanLine.replace("###", "").trim()}
              </h4>
            );
          }

          if (cleanLine.startsWith("-")) {
            return (
              <div
                key={idx}
                className="flex items-start gap-2 text-[12px] text-slate-600 font-poppins pl-1"
              >
                <span className="w-1.5 h-1.5 bg-[#066EFF] rounded-full shrink-0 mt-1.5" />
                <span className="leading-relaxed">
                  {cleanLine.replace("-", "").trim()}
                </span>
              </div>
            );
          }

          return (
            <p
              key={idx}
              className="text-[12.5px] text-slate-600 font-poppins leading-relaxed"
            >
              {cleanLine}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-white flex flex-col h-full rounded-[24px] overflow-hidden border border-[#F1F5F9] shadow-sm">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#F1F5F9] flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#066EFF] border border-blue-100">
            <Bot className="w-4 h-4 md:w-4.5 md:h-4.5" />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-[14px] font-semibold text-slate-800 font-poppins leading-tight">
              {type === "recruiter"
                ? `Interview at ${companyName}`
                : "Salary Negotiation Coach"}
            </h3>
            <div className="flex items-center gap-1 text-emerald-500">
              <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-medium font-poppins">
                Active AI Simulation
              </span>
            </div>
          </div>
        </div>

        {isFinished && (
          <button
            onClick={initSession}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-[#066EFF] text-[11px] font-bold rounded-xl border border-blue-100 transition-all hover:bg-blue-100/50 active:scale-95 cursor-pointer font-poppins"
          >
            <RefreshCw className="w-3 h-3 animate-spin-hover" />
            Restart
          </button>
        )}
      </div>

      {/* Main Area */}
      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-[#066EFF] animate-spin" />
          <span className="text-[12.5px] text-slate-400 font-poppins font-medium">
            Initializing AI agent...
          </span>
        </div>
      ) : error ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 p-6 text-center">
          <AlertCircle className="w-10 h-10 text-rose-500" />
          <p className="text-[13px] text-slate-600 font-medium font-poppins max-w-sm">
            {error}
          </p>
          <button
            onClick={initSession}
            className="px-5 py-2 text-[12px] font-semibold text-white bg-[#066EFF] rounded-xl hover:bg-blue-600 transition-all cursor-pointer font-poppins"
          >
            Try Again
          </button>
        </div>
      ) : isFinished && resultReport ? (
        /* Sleek Simulation Final Evaluation Card */
        <div className="flex-1 p-5 md:p-6 overflow-y-auto no-scrollbar bg-slate-50/10 space-y-6">
          <div className="bg-white rounded-[24px] border border-slate-100 p-5 md:p-6 shadow-xs flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 space-y-3.5">
              <div className="flex items-center gap-2">
                {type === "recruiter" ? (
                  resultReport.is_passed ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-600 text-[11px] font-bold rounded-full border border-emerald-100">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Lulus (Passed)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-rose-50 text-rose-600 text-[11px] font-bold rounded-full border border-rose-100">
                      <XCircle className="w-3.5 h-3.5" />
                      Belum Lulus (Needs Improvement)
                    </span>
                  )
                ) : (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-[#066EFF] text-[11px] font-bold rounded-full border border-blue-100">
                    Negotiation Completed
                  </span>
                )}

                {resultReport.negotiated_salary && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 text-[11px] font-bold rounded-full border border-amber-100">
                    Salary: {resultReport.negotiated_salary}
                  </span>
                )}
              </div>

              <h3 className="text-[17px] font-bold text-slate-800 font-poppins">
                {type === "recruiter"
                  ? "Interview Simulation Report"
                  : "Salary Negotiation Performance"}
              </h3>
              <p className="text-[12.5px] text-slate-500 leading-relaxed font-poppins">
                You have completed the 3-question AI simulation. Here is the
                evaluation and feedback generated by the HR coaching engine to
                improve your response style.
              </p>
            </div>

            {/* Score Ring */}
            <div className="shrink-0 flex flex-col items-center gap-1 bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50 w-full md:w-auto">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="transparent"
                    className="text-slate-100"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="transparent"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 * (1 - resultReport.score / 100)}
                    strokeLinecap="round"
                    className={cn(
                      "transition-all duration-1000",
                      resultReport.score >= 80
                        ? "text-emerald-500"
                        : resultReport.score >= 60
                          ? "text-[#066EFF]"
                          : "text-amber-500",
                    )}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[20px] font-bold text-slate-800 font-poppins">
                    {resultReport.score}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium font-poppins">
                    /100
                  </span>
                </div>
              </div>
              <span className="text-[11.5px] text-slate-400 font-bold font-poppins tracking-tight uppercase">
                Overall Score
              </span>
            </div>
          </div>

          <div className="bg-white rounded-[24px] border border-slate-100 p-5 md:p-6 shadow-xs">
            {renderFeedbackText(resultReport.feedback)}
          </div>

          <button
            onClick={initSession}
            className="w-full bg-[#066EFF] hover:bg-blue-600 text-white font-bold text-[13px] py-3 rounded-2xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all cursor-pointer font-poppins flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try Another Simulation
          </button>
        </div>
      ) : (
        /* Chat Messages Container */
        <>
          <div
            ref={scrollRef}
            className="flex-1 px-4 py-4 space-y-3.5 overflow-y-auto no-scrollbar scroll-smooth bg-slate-50/20"
          >
            {messages.map((msg) =>
              msg.sender === "bot" ? (
                <BotMessage key={msg.id} text={msg.text} />
              ) : (
                <UserMessage key={msg.id} text={msg.text} />
              ),
            )}

            {isWaitingForBot && <TypingIndicator />}
          </div>

          {/* Chat Inputs Footer */}
          <div className="px-4 py-4 bg-white border-t border-[#F1F5F9] shrink-0">
            {isListening && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 mb-3">
                <div className="bg-[#F0F7FF] border border-[#E1EFFE] rounded-[20px] p-3.5 relative shadow-sm">
                  <button
                    onClick={() => {
                      stopListening();
                      setShowVoiceResult(false);
                    }}
                    className="absolute top-3 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2 mb-2">
                    <Mic className="w-3.5 h-3.5 text-[#066EFF]" />
                    <span className="text-[#066EFF] text-[13px] font-semibold font-poppins">
                      Listening...
                    </span>
                    <span className="text-[#066EFF]/40 text-[12px] font-semibold font-poppins ml-2">
                      {formatTime(listeningTime)}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    <div className="bg-white/60 rounded-[14px] p-2.5 border border-white/40">
                      <p className="text-[13px] text-slate-600 font-poppins min-h-[18px]">
                        {voiceTranscript || "Listening to your voice..."}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-[2px] h-3">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                          <div
                            key={i}
                            className="w-0.5 bg-[#066EFF] rounded-full animate-pulse"
                            style={{
                              // eslint-disable-next-line react-hooks/purity
                              height: `${50 + Math.random() * 50}%`,
                              animationDelay: `${i * 0.1}s`,
                              animationDuration: "0.5s",
                            }}
                          />
                        ))}
                      </div>
                      <span className="text-slate-500 text-[12px] font-medium font-poppins">
                        Speak clearly...
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {showVoiceResult && !isListening && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 mb-3">
                <div className="bg-[#F0F7FF] border border-[#E1EFFE] rounded-[20px] p-3.5 relative shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Mic className="w-3.5 h-3.5 text-[#066EFF]" />
                      <span className="text-[#066EFF] text-[13px] font-semibold font-poppins tracking-tight">
                        Voice-to-Text Result
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          setInputText(voiceTranscript);
                          setShowVoiceResult(false);
                        }}
                        className="text-[#066EFF] text-[12px] font-bold font-poppins hover:underline cursor-pointer"
                      >
                        Use text
                      </button>
                      <button
                        onClick={() => setShowVoiceResult(false)}
                        className="text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-[14px] p-3 border border-white/50 shadow-sm transition-all duration-300">
                    <p className="text-[13.5px] text-slate-700 leading-relaxed font-poppins font-medium">
                      {voiceTranscript}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              <div className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-3.5 py-2.5 focus-within:bg-white focus-within:border-blue-200 transition-all flex items-center">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type your response..."
                  disabled={isWaitingForBot}
                  className="bg-transparent border-none outline-none w-full text-[13px] text-slate-700 placeholder:text-slate-400 font-medium font-poppins disabled:opacity-55"
                />
              </div>

              <button
                onClick={toggleListening}
                disabled={isWaitingForBot}
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-all shrink-0 active:scale-95 border cursor-pointer disabled:opacity-40",
                  isListening
                    ? "bg-red-500 text-white border-red-500 shadow-xl shadow-red-500/30"
                    : "bg-slate-50 text-slate-400 border-slate-100 hover:bg-slate-100",
                )}
              >
                <Mic
                  className={cn("w-4 h-4", isListening && "animate-pulse")}
                />
              </button>

              <button
                onClick={() => handleSend()}
                disabled={!inputText.trim() || isWaitingForBot}
                className="w-10 h-10 rounded-xl bg-[#066EFF] flex items-center justify-center text-white hover:bg-blue-600 transition-all shrink-0 active:scale-95 group shadow-lg shadow-blue-500/20 disabled:opacity-40"
              >
                <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Helper spin animation styling
interface Loader2Props {
  className?: string;
}
const Loader2 = ({ className }: Loader2Props) => (
  <svg
    className={cn("animate-spin", className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);
