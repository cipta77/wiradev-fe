"use client";

import React, { useEffect, useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { useMiniProjects } from "@/hooks/use-mini-projects";
import { MiniProjectWithSubmission } from "@/lib/api";
import { FolderKanban, RefreshCw, AlertCircle } from "lucide-react";

export const ProjectGrid = () => {
  const { fetchProjects, loading, error } = useMiniProjects();
  const [projects, setProjects] = useState<MiniProjectWithSubmission[]>([]);

  const loadProjects = async () => {
    const data = await fetchProjects();
    setProjects(data);
  };

  useEffect(() => {
    loadProjects();
  }, [fetchProjects]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 pb-4">
        {[1, 2, 3, 4].map((i) => (
          <div 
            key={i} 
            className="bg-white p-5 rounded-[20px] border border-[#F1F5F9] animate-pulse flex flex-col gap-4.5"
            style={{ border: '1.2px solid #F1F5F9' }}
          >
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <div className="h-5 w-16 bg-slate-100 rounded-full" />
                <div className="h-5 w-24 bg-slate-100 rounded-full" />
              </div>
              <div className="h-4 w-12 bg-slate-100 rounded" />
            </div>
            <div className="space-y-2.5 flex-1">
              <div className="h-4.5 w-2/3 bg-slate-100 rounded" />
              <div className="h-3.5 w-full bg-slate-100 rounded" />
              <div className="h-3.5 w-5/6 bg-slate-100 rounded" />
            </div>
            <div className="h-6 w-20 bg-slate-100 rounded" />
            <div className="h-10 w-full bg-slate-100 rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50/50 border border-red-200/60 p-6 rounded-2xl flex flex-col items-center text-center gap-3 font-poppins">
        <AlertCircle className="w-8 h-8 text-red-500" />
        <div>
          <h4 className="text-slate-950 text-[14px] font-bold">Gagal memuat proyek</h4>
          <p className="text-slate-500 text-[12px] mt-1">{error}</p>
        </div>
        <button 
          onClick={loadProjects}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-red-200 text-red-600 text-[12px] font-bold hover:bg-red-50 transition-all cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Coba Lagi</span>
        </button>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="bg-white border border-slate-100 p-10 rounded-[24px] flex flex-col items-center text-center gap-4.5 font-poppins max-w-lg mx-auto mt-6">
        <div className="p-4 bg-blue-50 text-[#066EFF] rounded-full">
          <FolderKanban className="w-8 h-8" />
        </div>
        <div>
          <h4 className="text-slate-950 text-[16px] font-bold">Belum Ada Proyek</h4>
          <p className="text-slate-500 text-[13px] mt-1.5 leading-relaxed max-w-sm">
            Tidak ada proyek yang sesuai dengan peran target Anda saat ini. Pastikan peran target Anda sudah diatur di profil Anda.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 pb-4">
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  );
};
