"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Sparkles, BrainCircuit, AlertCircle, RefreshCw } from "lucide-react";

interface Skill {
  skill: string;
  confidence: number;
  confidence_pct: number;
}

interface PredictResponse {
  status: string;
  job_title: string;
  threshold: number;
  skills: Skill[];
}

const getBarColor = (pct: number) => {
  if (pct >= 60) return "bg-emerald-500";
  if (pct >= 35) return "bg-blue-500";
  return "bg-orange-400";
};

const getTextColor = (pct: number) => {
  if (pct >= 60) return "text-emerald-500";
  if (pct >= 35) return "text-blue-500";
  return "text-orange-400";
};

export const SkillDetails = () => {
  const { user } = useAuth();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFetchedRole, setLastFetchedRole] = useState<string | null>(null);

  const doFetch = async (role: string) => {
    setLoading(true);
    setError(null);
    try {
      const aiApiUrl = process.env.NEXT_PUBLIC_AI_API_URL ?? "http://127.0.0.1:5000";
      const res = await fetch(`${aiApiUrl}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job_title: role, top_k: 10, threshold: 0.25 }),
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data: PredictResponse = await res.json();
      setSkills(data.skills ?? []);
      setLastFetchedRole(role);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load skills");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user?.target_role || user.target_role === lastFetchedRole) return;
    const role = user.target_role;
    // Define and immediately invoke async fn inside effect — avoids setState-in-effect lint warning
    const run = async () => {
      await doFetch(role);
    };
    run();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.target_role]);

  const isEmpty = !loading && !error && skills.length === 0;
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
              Recommended Skills
            </h3>
            {user?.target_role && (
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                For <span className="text-blue-500 font-semibold">{user.target_role}</span>
              </p>
            )}
          </div>
        </div>
        {user?.target_role && !loading && (
          <button
            onClick={() => doFetch(user.target_role!)}
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
              Analyzing skills for <span className="font-semibold">{user?.target_role}</span>…
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
            {user?.target_role && (
              <button
                onClick={() => doFetch(user.target_role!)}
                className="text-[12px] font-semibold text-blue-500 hover:text-blue-600 transition-colors"
              >
                Try again
              </button>
            )}
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
          <div className="flex flex-col items-center justify-center py-8 gap-2 text-center">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-slate-300" />
            </div>
            <p className="text-[13px] font-semibold text-slate-500">No skills found</p>
            <p className="text-[11px] text-slate-400">
              Try a different role or lower the confidence threshold.
            </p>
          </div>
        )}

        {/* Skills grid */}
        {!loading && !error && skills.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {skills.map((skill) => (
              <div key={skill.skill} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-semibold text-slate-700 capitalize">
                    {skill.skill.charAt(0) + skill.skill.slice(1).toLowerCase()}
                  </span>
                  <span className={`text-[11px] font-bold ${getTextColor(skill.confidence_pct)}`}>
                    {skill.confidence_pct.toFixed(1)}%
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
