"use client";

import React, { useState, useEffect } from "react";
import {
  UploadCloud,
  FileText,
  Sparkles,
  Target,
  BarChart2,
  Star,
  Zap,
  ShieldCheck,
  LineChart,
  Trash2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CVAnalysisView } from "./CVAnalysisView";
import { CVResultsView } from "./CVResultsView";
import {
  getCvScreeningHistory,
  deleteCvScreening,
  uploadCvScreening,
  CvScreeningResult,
} from "@/lib/api";

const analyzeItems = [
  {
    icon: Target,
    label: "Overall CV Score",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: BarChart2,
    label: "Section Breakdown",
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    icon: Star,
    label: "Strengths & Weaknesses",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: Zap,
    label: "Keyword Analysis",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: ShieldCheck,
    label: "ATS Compatibility",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    icon: LineChart,
    label: "Role-Fit Alignment",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
];

export const CVScreening = ({ onTabChange }: { onTabChange?: (tab: string) => void }) => {
  const [history, setHistory] = useState<CvScreeningResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [activeResult, setActiveResult] = useState<CvScreeningResult | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fetchHistory = async (showLoading = false) => {
    try {
      if (showLoading) {
        setLoading(true);
      }
      const list = await getCvScreeningHistory();
      setHistory(list);
    } catch (e) {
      console.error("Failed to load CV screening history:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    const loadInit = async () => {
      try {
        const list = await getCvScreeningHistory();
        if (ignore) return;
        setHistory(list);
      } catch (e) {
        console.error("Failed to load CV screening history on mount:", e);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    loadInit();
    return () => {
      ignore = true;
    };
  }, []);
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    setUploadError(null);
    setActiveResult(null);

    try {
      const result = await uploadCvScreening(file);
      setActiveResult(result);
      fetchHistory(); // Refresh history background
    } catch (err) {
      console.error("Upload error:", err);
      const msg = err instanceof Error ? err.message : "Failed to analyze CV. Please try again.";
      setUploadError(msg);
      setIsAnalyzing(false);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this CV screening report? This will also delete the uploaded file from the server.")) {
      return;
    }

    try {
      await deleteCvScreening(id);
      setHistory((prev) => prev.filter((item) => item.id !== id));
      if (activeResult?.id === id) {
        setActiveResult(null);
        setShowResults(false);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to delete CV screening report";
      alert(msg);
    }
  };

  const handleView = (item: CvScreeningResult) => {
    setActiveResult(item);
    setShowResults(true);
  };

  const handleBack = () => {
    setShowResults(false);
    setIsAnalyzing(false);
    setActiveResult(null);
  };

  const handleAnalysisComplete = () => {
    // If the API call has already finished, show results
    if (activeResult) {
      setIsAnalyzing(false);
      setShowResults(true);
    } else {
      // If API is still running, let it wait in analyzing state
      // When uploadCvScreening resolves, it will set activeResult which triggers render transition
    }
  };

  // Monitor when activeResult is populated while isAnalyzing is active
  useEffect(() => {
    if (isAnalyzing && activeResult) {
      const timeout = setTimeout(() => {
        setIsAnalyzing(false);
        setShowResults(true);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [activeResult, isAnalyzing]);

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (e) {
      return dateStr;
    }
  };

  if (isAnalyzing) {
    return <CVAnalysisView onComplete={handleAnalysisComplete} />;
  }

  if (showResults && activeResult) {
    return (
      <CVResultsView 
        onBack={handleBack} 
        result={activeResult}
        onViewSkillMap={() => onTabChange?.("skill-map")}
        onViewSkillGap={() => onTabChange?.("skill-gap")}
      />
    );
  }

  return (
    <div className="w-full animate-in fade-in duration-700 pb-6 md:pb-8">
      {uploadError && (
        <div className="mb-5 bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-2xl flex items-center gap-3 text-[13px] font-medium font-poppins">
          <AlertCircle className="w-4.5 h-4.5 shrink-0 text-rose-500" />
          <span>{uploadError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
        <div className="lg:col-span-8 space-y-5 md:space-y-6">
          {/* Upload Area */}
          <div className="bg-white rounded-[24px] border-2 border-dashed border-[#E8ECF0] p-8 md:p-10 flex flex-col items-center text-center relative group transition-all hover:border-[#066EFF]/30 hover:bg-slate-50/30">
            <div className="w-14 h-14 bg-[#066EFF]/10 rounded-2xl flex items-center justify-center mb-5 transition-all group-hover:scale-110 group-hover:bg-[#066EFF]/15">
              <UploadCloud className="w-7 h-7 text-[#066EFF]" />
            </div>
            <h3 className="text-[15px] md:text-[16px] font-semibold text-slate-800 font-poppins mb-1 tracking-tight">
              Drop your CV here or click to browse
            </h3>
            <p className="text-slate-400 text-[11px] md:text-[12px] font-medium font-poppins mb-6">
              PDF, DOC, DOCX — Max 10MB
            </p>
            <label className="bg-[#066EFF] text-white px-8 py-2.5 rounded-full font-semibold text-[13px] flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all hover:bg-[#0559d1] active:scale-[0.98] cursor-pointer">
              <UploadCloud className="w-4 h-4" />
              Choose File
              <input
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleFileSelect}
              />
            </label>
          </div>

          {/* Previous Uploads */}
          <div className="bg-white rounded-[24px] border border-[#E8ECF0] p-5 md:p-6 shadow-sm shadow-slate-200/5">
            <h4 className="text-[13px] md:text-[14px] font-semibold text-slate-800 font-poppins mb-5">
              Previous Uploads
            </h4>
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-8 gap-2">
                <Loader2 className="w-6 h-6 text-[#066EFF] animate-spin" />
                <span className="text-[12px] text-slate-400 font-poppins">Loading CV history...</span>
              </div>
            ) : history.length > 0 ? (
              <div className="space-y-3">
                {history.map((file) => (
                  <div
                    key={file.id}
                    className="bg-[#F8FAFC]/60 p-3 rounded-[20px] border border-slate-100 flex items-center justify-between gap-4 transition-all hover:bg-[#F8FAFC]"
                  >
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-100 shrink-0 shadow-sm">
                        <FileText className="w-5 h-5 text-[#066EFF]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h5 className="text-[13px] font-semibold text-slate-700 font-poppins truncate block tracking-tight">
                          {file.file_name}
                        </h5>
                        <div className="flex items-center gap-2 mt-0.5">
                          <p className="text-[11px] text-slate-400 font-medium font-poppins">
                            {formatDate(file.created_at as unknown as string)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 md:gap-5 shrink-0">
                      <span className={cn(
                        "text-[13px] md:text-[14px] font-bold font-poppins",
                        file.overall_score >= 80 ? "text-emerald-500" : file.overall_score >= 60 ? "text-[#066EFF]" : "text-amber-500"
                      )}>
                        {file.overall_score}/100
                      </span>
                      <button 
                        onClick={() => handleView(file)}
                        className="text-[#066EFF] text-[12px] md:text-[13px] font-semibold hover:underline cursor-pointer px-1 py-1 transition-all"
                      >
                        View
                      </button>
                      <button 
                        onClick={(e) => handleDelete(file.id, e)}
                        className="text-rose-500 hover:text-rose-700 cursor-pointer p-1 rounded-lg hover:bg-rose-50 transition-all"
                        title="Delete screening report"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 border border-dashed border-slate-150 rounded-[20px] bg-slate-50/20">
                <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2.5" />
                <p className="text-slate-400 text-[12px] font-medium font-poppins">
                  No CVs uploaded yet. Upload one above to get started!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-5 md:space-y-6 flex flex-col">
          <div className="bg-white rounded-[24px] border border-[#E8ECF0] p-5 md:p-6 flex-1 shadow-sm shadow-slate-200/5">
            <div className="flex items-center gap-2 mb-6 px-1">
              <Sparkles className="w-4 h-4 text-[#066EFF]" />
              <h4 className="text-[13px] font-semibold text-slate-800 font-poppins">
                What we analyze
              </h4>
            </div>
            <div className="space-y-1.5">
              {analyzeItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-2 rounded-[14px] bg-[#F8FAFC]/60 border border-slate-100/50 transition-all hover:bg-[#F8FAFC]"
                >
                  <div className="w-6.5 h-6.5 rounded-lg bg-white flex items-center justify-center shrink-0 border border-slate-100 shadow-xs">
                    <item.icon className="w-3.5 h-3.5 text-[#066EFF]" />
                  </div>
                  <span className="text-[12px] md:text-[13px] font-medium text-slate-600 font-poppins tracking-tight">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#066EFF] to-[#0446A3] rounded-[24px] p-6 text-white relative overflow-hidden shadow-lg shadow-blue-600/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
            <div className="relative z-10">
              <h5 className="text-[15px] font-semibold mb-2 font-poppins flex items-center gap-2 text-white tracking-tight">
                Pro Tip
              </h5>
              <p className="text-white/90 text-[11px] md:text-[12px] font-medium font-poppins leading-relaxed">
                Upload your latest CV to get the most accurate analysis. Apply
                our suggestions and re-upload for a better score.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
