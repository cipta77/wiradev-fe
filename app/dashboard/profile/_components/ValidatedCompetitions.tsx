"use client";

import React, { useEffect, useState } from "react";
import { Trophy, Award, Sparkles } from "lucide-react";
import { useMiniProjects } from "@/hooks/use-mini-projects";
import { useAssessmentAnalytics } from "@/hooks/useAssessmentAnalytics";
import { useAuth } from "@/lib/auth-context";

interface CertCardProps {
  title: string;
  equivalent: string;
  code: string;
  date: string;
}

const CertCard: React.FC<CertCardProps> = ({ title, equivalent, code, date }) => {
  return (
    <div className="flex gap-4 p-4 rounded-[16px] bg-[#FFFDF0] border border-[#FEF3C7] transition-all hover:shadow-sm">
      <div className="w-10 h-10 rounded-full bg-[#FDE68A] flex items-center justify-center flex-shrink-0">
        <Trophy className="w-5 h-5 text-amber-700" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-[14px] font-bold text-slate-800 truncate">
          {title}
        </h4>
        <p className="text-[11px] text-slate-500 mt-0.5">
          Equivalent: {equivalent}
        </p>
        <div className="flex items-center gap-1.5 mt-1.5 flex-wrap text-[10px] text-slate-400 font-medium">
          <span className="text-blue-500 font-semibold">{code}</span>
          <span>•</span>
          <span>{date}</span>
          <span>•</span>
          <span className="text-[#10B981] font-semibold flex items-center gap-0.5">
            <Award className="w-3 h-3" /> Verified
          </span>
        </div>
      </div>
    </div>
  );
};

export const ValidatedCompetitions = () => {
  const { user } = useAuth();
  const { fetchProjects, loading: projectsLoading } = useMiniProjects();
  const { data: analytics, loading: analyticsLoading, hasAssessment } = useAssessmentAnalytics();
  const [completedCerts, setCompletedCerts] = useState<CertCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  // Mapping helper functions
  const getEquivalentCertForProject = (titleOrId: string) => {
    const title = titleOrId.toLowerCase();
    if (title.includes("testing") || title.includes("test")) {
      return "Meta Front-End Developer (Module 5)";
    } else if (title.includes("responsive") || title.includes("css")) {
      return "W3C FWD Certificate (Module 3)";
    } else if (title.includes("component") || title.includes("react")) {
      return "Meta Front-End Developer (Module 6)";
    } else if (title.includes("async") || title.includes("javascript") || title.includes("js")) {
      return "Meta Front-End Developer (Module 4)";
    } else if (title.includes("portfolio") || title.includes("landing")) {
      return "freeCodeCamp Responsive Web Design";
    } else if (title.includes("task tracker") || title.includes("tracker")) {
      return "Meta Front-End Developer (Module 2)";
    } else if (title.includes("analytics") || title.includes("chart")) {
      return "Google Data Analytics Professional";
    } else if (title.includes("rest api") || title.includes("api")) {
      return "IBM Full Stack Developer (Module 3)";
    } else if (title.includes("jwt") || title.includes("auth")) {
      return "Meta Back-End Developer (Module 5)";
    } else if (title.includes("websocket") || title.includes("chat")) {
      return "Google Cloud Engineering Certificate";
    } else if (title.includes("house price") || title.includes("regression")) {
      return "Google Advanced Data Analytics (Module 3)";
    } else if (title.includes("churn") || title.includes("classification")) {
      return "IBM Data Science Professional (Module 6)";
    } else if (title.includes("deep learning") || title.includes("transformer") || title.includes("text classifier")) {
      return "Google TensorFlow Developer Certificate";
    } else if (title.includes("wireframe") || title.includes("prototype")) {
      return "Google UX Design Certificate (Module 2)";
    } else if (title.includes("design system") || title.includes("saas")) {
      return "Google UX Design Certificate (Module 4)";
    } else if (title.includes("wallet") || title.includes("e-wallet")) {
      return "Google UX Design Certificate (Module 6)";
    } else if (title.includes("proposal") || title.includes("sow")) {
      return "Google Project Management Certificate";
    } else if (title.includes("contract") || title.includes("sla")) {
      return "ITIL Foundation Certification";
    }
    return "Google Career Certification";
  };

  const getCertCodeForProject = (titleOrId: string) => {
    const title = titleOrId.toLowerCase();
    if (title.includes("testing")) return "TEST L3";
    if (title.includes("responsive") || title.includes("css")) return "HCEV L3";
    if (title.includes("component") || title.includes("react")) return "PROG-REACT L3";
    if (title.includes("async") || title.includes("javascript")) return "PROG-JS L3";
    if (title.includes("portfolio")) return "HTML L1";
    if (title.includes("tracker")) return "REACT L2";
    if (title.includes("analytics")) return "ANALYTICS L3";
    if (title.includes("rest api") || title.includes("api")) return "BE-REST L1";
    if (title.includes("jwt") || title.includes("auth")) return "BE-AUTH L2";
    if (title.includes("websocket") || title.includes("chat")) return "BE-WS L3";
    if (title.includes("house price")) return "DS-REG L1";
    if (title.includes("churn")) return "DS-CLASS L2";
    if (title.includes("deep learning") || title.includes("text classifier")) return "DS-DL L3";
    if (title.includes("wireframe")) return "UI-WIRE L1";
    if (title.includes("design system")) return "UI-SYS L2";
    if (title.includes("wallet")) return "UI-HI L3";
    if (title.includes("proposal")) return "FL-SOW L2";
    if (title.includes("contract")) return "FL-SLA L3";
    return "CERT-WD L3";
  };

  const getEquivalentCertForTest = (role: string) => {
    const cleanRole = role.toLowerCase();
    if (cleanRole.includes("front")) {
      return "Meta Front-End Developer (Module 5)";
    } else if (cleanRole.includes("back")) {
      return "IBM Full Stack Developer (Module 1)";
    } else if (cleanRole.includes("data")) {
      return "Google Data Analytics (Module 1)";
    } else if (cleanRole.includes("ux") || cleanRole.includes("design")) {
      return "Google UX Design (Module 1)";
    }
    return "Google Crash Course on Python";
  };

  const getCertCodeForTest = (role: string) => {
    const cleanRole = role.toLowerCase();
    if (cleanRole.includes("front")) return "TEST L3";
    if (cleanRole.includes("back")) return "BE-TEST L1";
    if (cleanRole.includes("data")) return "DTAN L3";
    if (cleanRole.includes("ux") || cleanRole.includes("design")) return "HCEV L3";
    return "PROG L3";
  };

  const formatDateString = (dateStr?: string) => {
    if (!dateStr) return "Recent";
    try {
      const d = new Date(dateStr);
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    } catch {
      return "Recent";
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const projects = await fetchProjects();
        const completedProjects = projects.filter(
          (p) => p.submission_status === "submitted" || p.submission_status === "reviewed"
        );

        const list: CertCardProps[] = [];

        // 1. Projects
        completedProjects.forEach((p) => {
          list.push({
            title: p.title,
            equivalent: getEquivalentCertForProject(p.title),
            code: getCertCodeForProject(p.title),
            date: formatDateString(p.submitted_at || p.reviewed_at || undefined),
          });
        });

        // 2. Assessment
        if (hasAssessment && analytics) {
          const role = user?.target_role || "Frontend Developer";
          list.push({
            title: `Job Readiness Test: ${role}`,
            equivalent: getEquivalentCertForTest(role),
            code: getCertCodeForTest(role),
            date: formatDateString(analytics.completed_at),
          });
        }

        setCompletedCerts(list);
      } catch (err) {
        console.error("Error loading completed certifications:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [fetchProjects, hasAssessment, analytics, user]);

  const isLoading = loading || projectsLoading || analyticsLoading;

  return (
    <div className="bg-white rounded-[24px] border border-[#F1F5F9] shadow-sm shadow-slate-200/5 overflow-hidden flex flex-col">
      <div className="px-6 py-4 border-b border-[#F1F5F9] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center">
            <Trophy className="w-4 h-4 text-amber-500" />
          </div>
          <h3 className="text-[17px] font-bold text-slate-800 leading-none">
            Validated Competitions
          </h3>
        </div>
      </div>

      <div className="p-5 md:p-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-6">
            <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : completedCerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center bg-slate-50/50 border border-slate-100 rounded-[20px] p-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-3">
              <Trophy className="w-6 h-6 text-amber-400" />
            </div>
            <h4 className="text-[14px] font-bold text-slate-800 mb-1">
              Belum Ada Kompetisi Terverifikasi
            </h4>
            <p className="text-[11px] text-slate-400 max-w-sm leading-relaxed">
              Selesaikan mini project di Dev Hub atau ikuti asesmen di Readiness Center untuk mendapatkan penyetaraan sertifikat kompetensi dari Google atau Meta.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedCerts.map((cert, index) => (
              <CertCard key={index} {...cert} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
