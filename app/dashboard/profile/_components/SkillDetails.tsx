"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Sparkles, BrainCircuit, AlertCircle, RefreshCw } from "lucide-react";
import { getAssessmentAnalytics } from "@/lib/api";

interface Skill {
  skill: string;
  confidence_pct: number;
}

const getBarColor = (pct: number) => {
  if (pct >= 70) return "bg-[#10B981]";
  if (pct >= 50) return "bg-[#F59E0B]";
  return "bg-[#EF4444]";
};

const getTextColor = (pct: number) => {
  if (pct >= 70) return "text-[#10B981]";
  if (pct >= 50) return "text-[#F59E0B]";
  return "text-[#EF4444]";
};

export const SkillDetails = () => {
  const { user } = useAuth();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasAssessment, setHasAssessment] = useState(false);

  const doFetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAssessmentAnalytics();
      if (data && data.has_assessment && data.categories) {
        setHasAssessment(true);
        const mappedSkills = data.categories.map((c) => ({
          skill: c.name,
          confidence_pct: c.score,
        }));
        setSkills(mappedSkills);
      } else {
        setHasAssessment(false);
        setSkills([]);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load skills");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      try {
        const data = await getAssessmentAnalytics();
        if (ignore) return;
        if (data && data.has_assessment && data.categories) {
          setHasAssessment(true);
          setSkills(data.categories.map((c) => ({
            skill: c.name,
            confidence_pct: c.score,
          })));
        } else {
          setHasAssessment(false);
          setSkills([]);
        }
      } catch (e) {
        if (ignore) return;
        setError(e instanceof Error ? e.message : "Failed to load skills");
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchData();
    return () => { ignore = true; };
  }, []);


  const isEmpty = !loading && !error && (!hasAssessment || skills.length === 0);
  const hasNoRole = !user?.target_role;

  return (
    <div className="bg-white rounded-[24px] border border-[#F1F5F9] shadow-sm shadow-slate-200/5 overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#F1F5F9] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
            <BrainCircuit className="w-4 h-4 text-blue-500" />
          </div>
          <div>
            <h3 className="text-[17px] font-bold text-slate-800 leading-none">
              Your Assessed Skills
            </h3>
            {user?.target_role && (
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                For <span className="text-blue-500 font-semibold">{user.target_role}</span>
              </p>
            )}
          </div>
        </div>
        {!loading && (
          <button
            onClick={doFetch}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-500 hover:bg-blue-50 transition-all"
            title="Refresh skills"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="p-5 md:p-6">
        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-8 gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
            </div>
            <div className="space-y-2 w-full max-w-xs">
              {[100, 80, 90, 70, 85].map((w, i) => (
                <div key={i} className="h-8 bg-slate-100 rounded-xl animate-pulse" style={{ width: `${w}%` }} />
              ))}
            </div>
            <p className="text-[12px] text-slate-400 font-medium animate-pulse">
              Analyzing assessment data for <span className="font-semibold">{user?.target_role}</span>…
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-8 gap-3 text-center">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-slate-700">Failed to load skills</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{error}</p>
            </div>
            <button
              onClick={doFetch}
              className="text-[12px] font-semibold text-blue-500 hover:text-blue-600 transition-colors"
            >
              Try again
            </button>
          </div>
        )}

        {/* No target role set */}
        {!loading && !error && hasNoRole && (
          <div className="flex flex-col items-center justify-center py-8 gap-2 text-center">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
              <BrainCircuit className="w-5 h-5 text-slate-300" />
            </div>
            <p className="text-[13px] font-semibold text-slate-500">No target role set</p>
            <p className="text-[11px] text-slate-400">
              Complete onboarding to see skill recommendations.
            </p>
          </div>
        )}

        {/* Empty result */}
        {!loading && !error && !hasNoRole && isEmpty && (
          <div className="flex flex-col items-center justify-center py-8 gap-3 text-center">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-slate-300" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-slate-500">No assessment completed yet</p>
              <p className="text-[11px] text-slate-400 max-w-xs mx-auto mt-1 leading-relaxed">
                Take the Initial Assessment in the Readiness Center to measure and view your core capabilities.
              </p>
            </div>
          </div>
        )}

        {/* Skills grid */}
        {!loading && !error && skills.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {skills.map((skill) => (
              <div key={skill.skill} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-semibold text-slate-750 font-poppins">
                    {skill.skill}
                  </span>
                  <span className={`text-[11px] font-bold ${getTextColor(skill.confidence_pct)}`}>
                    {skill.confidence_pct}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getBarColor(skill.confidence_pct)} transition-all duration-700 ease-out`}
                    style={{ width: `${Math.min(skill.confidence_pct, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
