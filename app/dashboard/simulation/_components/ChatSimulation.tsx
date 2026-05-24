"use client";

import React, { useState, useEffect, useRef } from "react";
import { Bot, User, Send, Mic, X, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
}

const interviewSuggestions = [
  "Tell me about yourself",
  "Why should we hire you?",
  "What's your expected salary?",
  "Describe a challenging project",
];

const BotMessage = ({ text }: { text: string }) => (
  <div className="flex items-start gap-2 max-w-[90%] md:max-w-[85%]">
    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0 border-[0.8px] border-slate-200/50">
      <Bot className="w-3.5 h-3.5" />
    </div>
    <div className="bg-slate-50 p-2.5 md:p-3 rounded-[14px] md:rounded-[16px] rounded-tl-none border border-[#F1F5F9]">
      <p className="text-[13px] text-slate-700 leading-relaxed font-poppins font-medium words">
        {text}
      </p>
    </div>
  </div>
);

const UserMessage = ({ text }: { text: string }) => (
  <div className="flex items-start gap-2 max-w-[90%] md:max-w-[85%] ml-auto justify-end">
    <div className="bg-[#066EFF] p-2.5 md:p-3 rounded-[14px] md:rounded-[16px] rounded-tr-none text-white max-w-full shadow-sm shadow-blue-500/10">
      <p className="text-[13px] leading-relaxed font-poppins font-medium words">{text}</p>
    </div>
    <div className="w-7 h-7 rounded-full bg-[#066EFF]/10 flex items-center justify-center text-[#066EFF] shrink-0 border-[0.8px] border-blue-500/10">
      <User className="w-3.5 h-3.5" />
    </div>
  </div>
);

export const ChatSimulation = ({
  companyName,
  type = "recruiter",
  showSuggestions = true,
}: {
  companyName: string;
  type?: "recruiter" | "salary";
  showSuggestions?: boolean;
}) => {
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [listeningTime, setListeningTime] = useState(0);
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const [showVoiceResult, setShowVoiceResult] = useState(false);
  const recognitionRef = useRef<any>(null);

  const initialMessages: Message[] =
    type === "recruiter"
      ? [
          {
            id: "1",
            sender: "bot",
            text: `Welcome to your interview simulation at ${companyName} for the Software Engineer role. I'll be acting as your technical recruiter today. Let's begin!`,
          },
          {
            id: "2",
            sender: "bot",
            text: "First question: Can you tell me about yourself and why you're interested in this position?",
          },
        ]
      : [
          {
            id: "1",
            sender: "bot",
            text: `Let's practice salary negotiation. You've received an offer of Rp 8,000,000/month for a Junior Software Engineer position. The market average is Rp 9,500,000-12,000,000. How would you respond?`,
          },
        ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isListening]);

  useEffect(() => {
    let timer: any;
    if (isListening) {
      timer = setInterval(() => setListeningTime((p) => p + 1), 1000);
    } else {
      setListeningTime(0);
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
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert("Speech Recognition not supported in this browser.");
        return;
      }

      setVoiceTranscript("");
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
    } catch (error) {
      console.error("Speech recognition error:", error);
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

  const handleSend = (overrideText?: string) => {
    const textToSend = overrideText || inputText;
    if (!textToSend.trim()) return;
    if (isListening) stopListening();
    setShowVoiceResult(false);

    const newUserMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend,
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputText("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text:
            type === "recruiter"
              ? "That's a great answer. Can you elaborate further on how your experience aligns with our company values?"
              : "Good approach! You've anchored higher. The recruiter says: 'That's above our initial budget, but we really like your profile. Could you meet us in the middle at Rp 9,000,000?'",
        },
      ]);
    }, 1000);
  };

  return (
    <div className="bg-white flex flex-col h-full rounded-[24px] overflow-hidden border border-[#F1F5F9]">
      <div className="px-4 py-3 md:py-3.5 border-b border-[#F1F5F9] flex items-center justify-between bg-slate-50/50">
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
                Active simulation
              </span>
            </div>
          </div>
        </div>
      </div>

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
      </div>

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
                <span className="text-[#066EFF] text-[13px] font-semibold font-poppins">Listening...</span>
                <span className="text-[#066EFF]/40 text-[12px] font-semibold font-poppins ml-2">
                  {formatTime(listeningTime)}
                </span>
              </div>

              <div className="space-y-2.5">
                <div className="bg-white/60 rounded-[14px] p-2.5 border border-white/40">
                  <p className="text-[13px] text-slate-600 font-poppins min-h-[18px]">
                    {voiceTranscript || "Wait, recording..."}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-[2px] h-3">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <div
                        key={i}
                        className="w-0.5 bg-[#066EFF] rounded-full animate-pulse"
                        style={{
                          height: `${50 + Math.random() * 50}%`,
                          animationDelay: `${i * 0.1}s`,
                          animationDuration: "0.5s"
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-slate-500 text-[12px] font-medium font-poppins">Speak clearly...</span>
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
                  <span className="text-[#066EFF] text-[13px] font-semibold font-poppins tracking-tight">Voice-to-Text Result</span>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => {
                      setInputText(voiceTranscript);
                      setShowVoiceResult(false);
                    }}
                    className="text-[#066EFF] text-[12px] font-semibold font-poppins hover:underline cursor-pointer"
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

        {showSuggestions && type === "recruiter" && (
          <div className="hidden md:flex flex-wrap gap-1.5 mb-3">
            {interviewSuggestions.map((s) => (
              <button
                key={s}
                onClick={() => setInputText(s)}
                className="px-3 py-1.5 rounded-full bg-[#F0F7FF] text-[#066EFF] text-[11px] font-semibold hover:bg-blue-100 font-poppins cursor-pointer border border-blue-100/50"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2">
          <div className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-3.5 py-2 focus-within:bg-white focus-within:border-blue-200 transition-all flex items-center">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your response..."
              className="bg-transparent border-none outline-none w-full text-[13px] text-slate-700 placeholder:text-slate-400 font-medium font-poppins"
            />
          </div>
          
          <button
            onClick={toggleListening}
            className={cn(
              "w-9 h-9 rounded-xl flex items-center justify-center transition-all shrink-0 active:scale-95 border cursor-pointer",
              isListening 
                ? "bg-red-500 text-white border-red-500 shadow-xl shadow-red-500/30" 
                : "bg-slate-50 text-slate-400 border-slate-100 hover:bg-slate-100"
            )}
          >
            <Mic className={cn("w-4 h-4", isListening && "animate-pulse")} />
          </button>
          
          <button
            onClick={() => handleSend()}
            disabled={!inputText.trim()}
            className="w-9 h-9 rounded-xl bg-[#066EFF] flex items-center justify-center text-white hover:bg-blue-600 transition-all shrink-0 active:scale-95 group shadow-lg shadow-blue-500/20 disabled:opacity-40"
          >
            <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
