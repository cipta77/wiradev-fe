"use client";

import React, { useState } from "react";
import { Search, FileSearch, ChevronRight, AlertCircle } from "lucide-react";
import { analyzeJobDescription, JobdeskAnalysisResult } from "@/lib/api";

export const JobdeskAnalyzer = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<JobdeskAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = () => {
    if (!jobDescription.trim()) return;
    setIsAnalyzing(true);
    setError(null);
    analyzeJobDescription(jobDescription)
      .then((result) => setAnalysisResult(result))
      .catch((err) => setError(err instanceof Error ? err.message : "Analysis failed"))
      .finally(() => setIsAnalyzing(false));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-[520px] md:min-h-[500px] pb-0 lg:pb-[20px]">
      {/* Left Side: Input */}
      <div className="lg:col-span-5 h-[400px] lg:h-full min-h-0">
        <div
          className="bg-white rounded-[24px] overflow-hidden flex flex-col h-full transition-all hover:shadow-xl hover:shadow-slate-200/20"
          style={{ border: "1.2px solid #F1F5F9" }}
        >
          <div className="px-4 py-3 border-b border-[#F1F5F9] bg-slate-50/50 shrink-0">
            <h3 className="text-[14px] font-semibold text-slate-800 font-poppins text-left">
              Paste Job Description
            </h3>
          </div>
          <div className="flex-1 p-4 min-h-0 flex flex-col">
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste a job description here to analyze how it matches your profile..."
              className="flex-1 w-full bg-transparent border-none outline-none resize-none text-[13px] md:text-[14px] text-slate-700 placeholder:text-slate-400 font-normal leading-relaxed font-poppins min-h-[250px]"
            />
          </div>
          <div className="px-4 py-4 border-t border-[#F1F5F9] bg-white shrink-0">
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !jobDescription.trim()}
              className="w-full h-11 rounded-xl bg-[#066EFF] text-white text-[13px] md:text-[14px] font-semibold font-poppins hover:bg-blue-600 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2 shadow-sm"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Analyzing Match...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Analyze Job Description</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Right Side: Results */}
      <div className="lg:col-span-7 h-fit lg:h-full min-h-0">
        <div
          className="bg-white rounded-[24px] overflow-hidden flex flex-col h-full shadow-sm shadow-slate-200/5 transition-all hover:shadow-xl hover:shadow-slate-200/20"
          style={{ border: "1.2px solid #F1F5F9" }}
        >
          <div className="px-4 py-3 border-b border-[#F1F5F9] bg-slate-50/50 shrink-0">
            <h3 className="text-[14px] font-semibold text-slate-800 font-poppins text-left">
              Analysis Results
            </h3>
          </div>

          {!analysisResult && !error ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-3 min-h-0">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-1 border border-slate-100 shadow-sm shadow-slate-200/10">
                <FileSearch className="w-6 h-6 text-slate-300" />
              </div>
              <div className="space-y-1.5 px-4">
                <h4 className="text-[15px] font-semibold text-slate-800 font-poppins">
                  Paste a job description to analyze
                </h4>
                <p className="text-slate-400 text-[13px] font-normal max-w-sm leading-relaxed font-poppins">
                  We&apos;ll compare it against your profile and suggest improvements.
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-3 min-h-0">
              <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center mb-1 border border-rose-100 shadow-sm shadow-rose-200/10">
                <AlertCircle className="w-6 h-6 text-rose-500" />
              </div>
              <div className="space-y-1.5 px-4">
                <h4 className="text-[15px] font-semibold text-slate-800 font-poppins">
                  Analysis Failed
                </h4>
                <p className="text-slate-400 text-[13px] font-normal max-w-sm leading-relaxed font-poppins">
                  {error}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 p-5 md:p-6 space-y-5 overflow-y-auto no-scrollbar animate-in fade-in slide-in-from-right-4 duration-500">
              {/* Summary */}
              {analysisResult?.summary && (
                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100/50">
                  <p className="text-[13px] text-slate-700 leading-relaxed font-poppins font-medium">
                    {analysisResult.summary}
                  </p>
                </div>
              )}

              {/* Match Score */}
              <div className="bg-[#F8FAFC] rounded-[16px] p-5 flex flex-col items-center justify-center border border-[#F1F5F9]">
                <span className="text-slate-400 text-[11px] font-medium mb-1">Match Score</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-[32px] font-bold text-orange-500">{analysisResult?.match_score}</span>
                  <span className="text-[16px] font-bold text-orange-500">%</span>
                </div>
              </div>

              {/* Matching Skills */}
              {analysisResult && analysisResult.matching_skills.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-[13px] font-semibold text-slate-700 font-poppins">Matching Skills</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {analysisResult.matching_skills.map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[12px] font-medium font-poppins border border-emerald-100/50">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Missing Skills */}
              {analysisResult && analysisResult.missing_skills.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-[13px] font-semibold text-slate-700 font-poppins">Missing Skills</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {analysisResult.missing_skills.map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-rose-50 text-rose-500 rounded-full text-[12px] font-medium font-poppins border border-rose-100/50">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {analysisResult && analysisResult.recommendations.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-[13px] font-semibold text-slate-700 font-poppins">Recommendations</h4>
                  <div className="space-y-2">
                    {analysisResult.recommendations.map((rec, i) => (
                      <div key={i} className="flex items-start gap-3 p-2.5 bg-slate-50/50 rounded-xl border border-slate-100 group hover:border-blue-100 transition-all cursor-default">
                        <ChevronRight className="w-3 h-3 text-blue-500 mt-1 shrink-0" />
                        <span className="text-[12px] text-slate-600 font-medium font-poppins leading-relaxed">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
