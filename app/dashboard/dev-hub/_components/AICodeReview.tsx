"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FileCode, RotateCcw, Send, Code2, Terminal } from "lucide-react";
import { AICodeReviewLoading } from "./AICodeReviewLoading";

export const AICodeReview = () => {
  const router = useRouter();
  const [view, setView] = useState<"editor" | "loading">("editor");
  const [code, setCode] =
    useState(`// Paste your code here or provide a GitHub repository URL

const express = require('express');
const app = express();

app.get('/users', async (req, res) => {
  const query = \`SELECT * FROM users WHERE name = '\${req.query.name}'\`;
  const users = await db.query(query);
  res.json(users);
});`);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 animate-in fade-in duration-700">
      {/* Code Editor Section */}
      <div className="bg-white rounded-[16px] flex flex-col overflow-hidden border border-[#F1F5F9] shadow-sm shadow-slate-200/5">
        <div className="px-4 py-3 bg-white border-b border-[#F1F5F9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCode className="w-3.5 h-3.5 text-[#066EFF]" />
            <h3 className="text-[16px] font-semibold text-slate-700">
              Your Code
            </h3>
          </div>
          <button className="flex items-center gap-1.5 text-slate-400 hover:text-slate-600 text-[11px] font-normal transition-colors cursor-pointer">
            <Code2 className="w-3 h-3" />
            <span>Import from GitHub</span>
          </button>
        </div>

        <div className="flex-1 bg-[#1E293B]">
          <div className="p-4 min-h-[280px] md:min-h-[380px] relative">
            <textarea
              className="w-full h-[260px] md:h-[360px] bg-transparent text-slate-300 font-mono text-[12px] resize-none outline-none leading-relaxed focus:ring-0 border-none scrollbar-hide"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
            />
          </div>
        </div>

        <div className="p-3.5 flex items-center justify-between gap-3 bg-white border-t border-[#F1F5F9]">
          <div className="flex items-center gap-2 text-slate-400">
            <Terminal className="w-3 h-3" />
            <span className="text-[11px] font-normal">
              JavaScript/Node.js detected
            </span>
          </div>
          <button
            onClick={() => setView("loading")}
            className="flex items-center gap-2 bg-[#066EFF] text-white px-5 py-2.5 rounded-xl text-[12px] font-bold shadow-lg shadow-blue-600/10 hover:bg-blue-700 transition-all active:scale-[0.98] cursor-pointer"
          >
            <Send className="w-3 h-3" />
            <span>Review My Code</span>
          </button>
        </div>
      </div>

      {/* Review Result Section */}
      <div className="bg-white rounded-[16px] flex flex-col overflow-hidden border border-[#F1F5F9] shadow-sm shadow-slate-200/5">
        <div className="px-4 py-3 bg-white border-b border-[#F1F5F9] flex items-center gap-2">
          <RotateCcw className="w-3.5 h-3.5 text-[#066EFF]" />
          <h3 className="text-[16px] font-semibold text-slate-700">
            Review Results
          </h3>
        </div>

        {view === "loading" ? (
          <AICodeReviewLoading
            onComplete={() => router.push("/dashboard/dev-hub/review")}
          />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-3 min-h-[280px] md:min-h-[380px]">
            <div className="w-12 h-12 flex items-center justify-center text-[#E2E8F0] mb-1">
              <Code2 className="w-8 h-8" />
            </div>
            <div className="space-y-1.5">
              <h4 className="text-[13px] font-semibold text-slate-400 px-4">
                Paste your code and click &quot;Review My Code&quot;
              </h4>
              <p className="text-slate-300 text-[11px] leading-relaxed max-w-[280px] font-normal px-4 mx-auto">
                Get instant AI-powered feedback on quality, security, and best
                practices
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
