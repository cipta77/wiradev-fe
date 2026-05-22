"use client";

import React from "react";
import {
  Download,
  RefreshCcw,
  ArrowLeft,
  Award,
  Zap,
  Briefcase,
  GraduationCap,
  FileText,
  ShieldCheck,
  Target,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CategoryReviewCard } from "./CategoryReviewCard";

interface CVResultsViewProps {
  onBack: () => void;
  onViewSkillMap?: () => void;
  onViewSkillGap?: () => void;
  onExport?: () => void;
  fileName: string;
}

const roleFit = [
  { role: "Frontend Dev", match: 82, color: "bg-emerald-500" },
  { role: "Fullstack Dev", match: 58, color: "bg-amber-500" },
  { role: "Backend Dev", match: 42, color: "bg-red-500" },
];

const keywords = {
  found: ["JavaScript", "React", "Node.js", "Git", "SQL", "REST API"],
  missing: ["TypeScript", "Docker", "AWS", "CI/CD"],
};

const categoryScores = [
  { id: "contact", label: "Contact & Header", score: 90, status: "Strong", icon: FileText, color: "emerald" },
  { id: "summary", label: "Professional Summary", score: 55, status: "Moderate", icon: Sparkles, color: "amber" },
  { id: "skills", label: "Technical Skills", score: 78, status: "Strong", icon: Zap, color: "emerald" },
  { id: "experience", label: "Work Experience", score: 62, status: "Moderate", icon: Briefcase, color: "amber" },
  { id: "projects", label: "Projects", score: 70, status: "Moderate", icon: Target, color: "amber" },
  { id: "education", label: "Education", score: 85, status: "Strong", icon: GraduationCap, color: "emerald" },
  { id: "ats", label: "ATS Compatibility", score: 58, status: "Moderate", icon: ShieldCheck, color: "amber" },
];

const detailedReviews = [
  {
    icon: FileText,
    title: "Contact & Header",
    subtitle: "How recruiters reach you and verify your work",
    score: 90,
    status: "Strong",
    colorTheme: "emerald" as const,
    description: "Contact info is complete and recruiter-ready. Missing portfolio proof keeps it from a perfect score.",
    strengths: ["Email, phone, and location are clearly placed", "Active LinkedIn URL is included"],
    weaknesses: ["No GitHub or portfolio link", "Availability/notice period not stated"],
    whyThisScore: "High score because contact is complete, but missing portfolio links cap it for technical roles.",
    additions: ["GitHub username with active repos", "Personal portfolio or live demo URL", "Current city + remote availability"],
    recommendation: "Add GitHub link · Include availability"
  },
  {
    icon: Sparkles,
    title: "Professional Summary",
    subtitle: "Your career positioning statement at the top of the CV",
    score: 55,
    status: "Moderate",
    colorTheme: "amber" as const,
    description: "Summary is too generic. No target role clarity, no measurable impact, no positioning angle.",
    strengths: ["Summary section exists at the top", "Tone is professional and free of typos"],
    weaknesses: ["No target role or years of experience", "No quantified achievement", "No unique career positioning"],
    whyThisScore: "Moderate because the summary could apply to any candidate. It does not anchor you to a specific role.",
    additions: ["Target role + years of experience in line 1", "One quantified win (e.g. 'Improved load time by 40%')", "Positioning statement: domain, stack focus, or differentiator"],
    recommendation: "Add quantifiable metrics · Target specific role"
  },
  {
    icon: Zap,
    title: "Technical Skills",
    subtitle: "Tools, languages, and frameworks you can work with",
    score: 78,
    status: "Strong",
    colorTheme: "emerald" as const,
    description: "Solid stack for frontend roles, but several high-demand keywords are missing and skills are flat without proficiency grouping.",
    strengths: ["Frontend stack is strong: React, Redux, JS, HTML, CSS", "Backend basics covered: Node.js, Express, MongoDB", "Git and Agile listed"],
    weaknesses: ["TypeScript missing (88% of frontend listings require it)", "No Docker, AWS, or CI/CD keywords", "No testing frameworks (Jest, RTL)"],
    whyThisScore: "Strong because the core stack is covered, but missing high-demand keywords prevent a top score against current listings.",
    additions: ["TypeScript and Next.js", "Docker, AWS, and CI/CD basics", "Group by proficiency: Proficient / Familiar / Learning"],
    recommendation: "Add TypeScript · Include Docker/CI-CD"
  },
  {
    icon: Briefcase,
    title: "Work Experience",
    subtitle: "Roles, responsibilities, and proof of impact",
    score: 62,
    status: "Moderate",
    colorTheme: "amber" as const,
    description: "Bullets are task-focused, not impact-focused. Action verbs are weak and there are no measurable outcomes.",
    strengths: ["Reverse chronological order", "Role titles, companies, and dates are clearly formatted"],
    weaknesses: ["No metrics or percentages on any bullet", "Weak verbs: 'Responsible for...', 'Worked on...'", "No scope: team size, user base, revenue impact"],
    whyThisScore: "Moderate because recruiters cannot tell what you actually delivered. Tasks are listed, impact is invisible.",
    additions: ["Action verb + what you did + measurable result", "Scope numbers: '5-person team', '50K MAU'", "Strong verbs: Built, Shipped, Led, Migrated"],
    recommendation: "Use action verbs · Add measurable impact"
  },
  {
    icon: Target,
    title: "Projects",
    subtitle: "Personal and academic projects that prove your skills",
    score: 70,
    status: "Moderate",
    colorTheme: "amber" as const,
    description: "Tech stacks are listed but objectives, deployment proof, and outcomes are missing — recruiters cannot verify the work.",
    strengths: ["Tech stack listed for each project", "Project names and short descriptions present"],
    weaknesses: ["No clear project objective", "No GitHub repo or live demo URL", "No outcome or measurable result"],
    whyThisScore: "Moderate because recruiters can see what you built but not verify it. Without links and outcomes, projects read as claims.",
    additions: ["One-line objective per project: who it's for, what it solves", "GitHub link + live demo URL for every project", "Result line: 'Reduced X by Y' or 'Used by Z people'"],
    recommendation: "Add live demo links · Describe challenges solved"
  },
  {
    icon: GraduationCap,
    title: "Education",
    subtitle: "Academic record and continuous learning evidence",
    score: 85,
    status: "Strong",
    colorTheme: "emerald" as const,
    description: "Core academic record is solid. Adds-on like certifications and activities would push it to top tier.",
    strengths: ["Degree, university, year, and GPA all present", "Relevant coursework listed (Data Structures, Algorithms)"],
    weaknesses: ["No certifications (AWS, Google, Coursera)", "No academic honors or scholarships", "No tech-related activities (hackathons, organizations)"],
    whyThisScore: "Strong because the academic record is well presented. Not perfect because evidence of continuous learning is missing.",
    additions: ["1-2 industry certifications relevant to your target role", "Academic honors or scholarship recognition (if any)", "Tech extracurriculars: hackathons, study groups"],
    recommendation: "Add certifications · Highlight relevant courses"
  },
  {
    icon: ShieldCheck,
    title: "ATS Compatibility",
    subtitle: "How well automated screening systems can parse your CV",
    score: 58,
    status: "Moderate",
    colorTheme: "amber" as const,
    description: "Layout and headings risk being misread by ATS. The CV may be ranked low before a human ever reviews it.",
    strengths: ["File is text-based PDF (not a scanned image)", "Font is standard and readable"],
    weaknesses: ["Table-based / multi-column layout detected", "Non-standard headings (e.g. 'Career Story' instead of 'Experience')", "Sparse job-relevant keywords inside bullets"],
    whyThisScore: "Needs Work because layout choices and non-standard headings risk the CV being parsed incorrectly.",
    additions: ["Single-column linear layout", "Standard ATS labels: Experience, Education, Skills", "Mirror keywords from the target job description"],
    recommendation: "Use single-column layout · Standard section headings"
  }
];

export const CVResultsView: React.FC<CVResultsViewProps> = ({
  onBack,
  onViewSkillMap,
  onViewSkillGap,
  onExport,
  fileName,
}) => {
  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12 font-poppins text-slate-900">
      {/* Top Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2.5">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 px-2.5 py-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all font-medium text-[13px] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <span className="text-slate-200">|</span>
          <span className="text-[13px] font-semibold text-slate-600 truncate max-w-[180px]">
            {fileName}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={onExport}
            className="px-3.5 py-1.5 text-[12px] font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all cursor-pointer flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
          <button 
            onClick={onBack}
            className="px-4 py-1.5 text-[12px] font-semibold text-white bg-[#066EFF] rounded-xl hover:bg-blue-600 transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-blue-500/20"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            Re-upload
          </button>
        </div>
      </div>

      {/* Hero Assessment Card */}
      <div className="bg-white rounded-[28px] p-6 md:p-8 border border-slate-100 shadow-sm shadow-slate-200/20 mb-6 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-[#066EFF] rounded-full text-[11px] font-semibold border border-blue-100">
            CV Screening Review
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
              <Award className="w-5 h-5 text-[#066EFF]" />
            </div>
            <div className="space-y-2">
              <h1 className="text-[20px] md:text-[22px] font-semibold text-slate-900 tracking-tight font-poppins">
                Overall CV Assessment
              </h1>
              <p className="text-[13.5px] text-slate-500 leading-relaxed font-normal font-poppins">
                Your CV is <span className="font-semibold text-blue-600">above average</span> and shows real technical foundation. The biggest blockers are a generic Professional Summary, task-based Work Experience bullets without measurable impact, and ATS-readability issues. Fixing those areas will move you toward <span className="font-semibold text-emerald-500">Excellent</span>.
              </p>
            </div>
          </div>
        </div>

        <div className="shrink-0 flex flex-col items-center gap-2">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="58"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-slate-100"
              />
              <circle
                cx="64"
                cy="64"
                r="58"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={364}
                strokeDashoffset={364 * (1 - 72 / 100)}
                strokeLinecap="round"
                className="text-[#066EFF]"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[32px] font-semibold text-slate-900 leading-none font-poppins">72</span>
              <span className="text-[12px] font-medium text-slate-400 mt-0.5 font-poppins">/100</span>
            </div>
          </div>
          <span className="text-[16px] font-semibold text-[#066EFF] font-poppins">Good</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Stats Grid */}
        <div className="lg:col-span-4 space-y-6">
          {/* Role-Fit Match */}
          <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-sm shadow-slate-200/10">
            <h3 className="text-[14px] font-semibold text-slate-800 mb-4 font-poppins">Role-Fit Match</h3>
            <div className="space-y-4">
              {roleFit.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-center text-[12px] font-semibold">
                    <span className="text-slate-600 font-poppins">{item.role}</span>
                    <span className={cn(
                      "font-poppins",
                      item.match >= 80 ? "text-emerald-500" :
                      item.match >= 50 ? "text-amber-500" : "text-red-500"
                    )}>{item.match}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all duration-1000", item.color)}
                      style={{ width: `${item.match}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Keywords */}
          <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-sm shadow-slate-200/10">
            <h3 className="text-[14px] font-semibold text-slate-800 mb-3 font-poppins">Keywords Found</h3>
            <div className="flex flex-wrap gap-1.5 mb-6">
              {keywords.found.map((kw, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-emerald-50 text-emerald-600 text-[11px] font-medium rounded-lg border border-emerald-100/50 font-poppins">
                  {kw}
                </span>
              ))}
            </div>

            <h3 className="text-[14px] font-semibold text-slate-800 mb-3 font-poppins">Missing <span className="text-[11px] font-normal text-slate-400 font-poppins">(High Demand)</span></h3>
            <div className="flex flex-wrap gap-1.5">
              {keywords.missing.map((kw, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-rose-50 text-rose-500 text-[11px] font-medium rounded-lg border border-rose-100/50 font-poppins">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Category Scores */}
        <div className="lg:col-span-8 h-full">
          <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm shadow-slate-200/10 h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[16px] font-semibold text-slate-800 font-poppins">Category Scores</h3>
              <span className="text-[11px] text-slate-400 font-medium italic font-poppins">Detailed review below</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-x-8 md:gap-y-4">
              {categoryScores.map((cat, idx) => (
                <div key={idx} className="bg-slate-50/50 rounded-xl p-3.5 border border-slate-100/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border",
                        cat.color === "emerald" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-purple-50 text-purple-500 border-purple-100"
                      )}>
                        <cat.icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[13px] font-semibold text-slate-700 font-poppins">{cat.label}</span>
                    </div>
                    <span className={cn(
                      "text-[13px] font-semibold font-poppins",
                      cat.score >= 80 ? "text-emerald-500" : "text-amber-500"
                    )}>{cat.score}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200/50 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-1000",
                        cat.score >= 80 ? "bg-emerald-500" : "bg-amber-500"
                      )}
                      style={{ width: `${cat.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Category Review Section */}
      <div className="mt-10 space-y-6">
        <div className="flex items-center gap-2.5 px-1 mb-4">
          <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100">
             <Target className="w-3.5 h-3.5 text-[#066EFF]" />
          </div>
          <h2 className="text-[17px] font-semibold text-slate-800 tracking-tight font-poppins">Detailed Category Review</h2>
        </div>

        <div className="space-y-8">
          {detailedReviews.map((review, idx) => (
            <CategoryReviewCard key={idx} {...review} />
          ))}
        </div>
      </div>

      {/* Recommended Next Steps Section */}
      <div className="mt-8 bg-white rounded-[24px] p-6 md:p-8 border border-slate-100 shadow-sm shadow-slate-200/10 space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h3 className="text-[16px] font-semibold text-slate-800 font-poppins">Recommended Next Steps</h3>
          </div>
          <p className="text-[12px] text-slate-400 font-normal font-poppins">
            Apply these in order — each one directly raises your overall CV match.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { id: 1, title: "Improve Professional Summary", desc: "Add target role, years of experience, and one quantified win.", target: "Summary" },
            { id: 2, title: "Add measurable achievements", desc: "Convert task bullets to action verb + result + scope.", target: "Experience" },
            { id: 3, title: "Add GitHub / portfolio links", desc: "Attach repository and live demo URLs to every project.", target: "Projects" },
            { id: 4, title: "Add missing technical keywords", desc: "Add TypeScript, Docker, AWS, and CI/CD to lift scores.", target: "Skills" },
            { id: 5, title: "Improve ATS formatting", desc: "Switch to single-column layout and rename headings.", target: "ATS" },
          ].map((step) => (
            <div key={step.id} className="bg-slate-50/50 rounded-xl p-4 border border-slate-100/50 flex gap-4 group hover:border-blue-200 hover:bg-blue-50/10 transition-all">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-[#066EFF] flex items-center justify-center text-[11px] font-bold shrink-0 font-poppins">
                {step.id}
              </div>
              <div className="space-y-1.5">
                <h4 className="text-[14px] font-semibold text-slate-900 font-poppins leading-tight">{step.title}</h4>
                <p className="text-[12px] text-slate-500 leading-normal font-poppins">{step.desc}</p>
                <div className="pt-0.5">
                  <span className="px-2.5 py-0.5 bg-white text-slate-400 text-[10px] font-medium rounded-full border border-slate-100 font-poppins">
                    Targets · {step.target}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-5 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-slate-400 font-medium font-poppins italic">Or jump straight to your skill data</p>
          <div className="flex items-center gap-3">
            <button 
              onClick={onViewSkillMap}
              className="px-5 py-2 text-[13px] font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-poppins"
            >
              View Skill Map
            </button>
            <button 
              onClick={onViewSkillGap}
              className="px-5 py-2 text-[13px] font-semibold text-white bg-[#066EFF] rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2 font-poppins"
            >
              View Skill Gap
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
