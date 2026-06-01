"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ProjectDetailView } from "../_components/ProjectDetailView";
import { useMiniProjects } from "@/hooks/use-mini-projects";
import { MiniProjectWithSubmission, UserMiniProjectSubmission } from "@/lib/api";
import { Loader2, AlertCircle, RefreshCw } from "lucide-react";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { fetchProjectDetail, loading, error } = useMiniProjects();
  const [data, setData] = useState<{ project: MiniProjectWithSubmission; submission: UserMiniProjectSubmission | null } | null>(null);

  const loadDetail = async () => {
    if (!id) return;
    const res = await fetchProjectDetail(id);
    if (res) {
      setData(res);
    }
  };

  useEffect(() => {
    loadDetail();
  }, [id, fetchProjectDetail]);

  if (loading) {
    return (
      <div className="flex flex-col h-full overflow-y-auto bg-[#F8FAFC]">
        <div className="p-4 md:p-6 lg:p-8 flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="w-10 h-10 animate-spin text-[#066EFF]" />
          <p className="text-slate-400 font-poppins font-medium text-[13px] mt-4">Memuat Detail Proyek...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col h-full overflow-y-auto bg-[#F8FAFC]">
        <div className="p-4 md:p-6 lg:p-8 flex flex-col items-center justify-center min-h-[400px] text-center max-w-md mx-auto font-poppins gap-4">
          <AlertCircle className="w-10 h-10 text-red-500" />
          <div>
            <h4 className="text-slate-900 font-bold text-[16px]">Gagal memuat proyek</h4>
            <p className="text-slate-500 text-[13px] mt-1.5 leading-relaxed">{error || "Proyek tidak ditemukan."}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => router.push("/dashboard/dev-hub")}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 rounded-xl text-[12px] font-bold cursor-pointer"
            >
              Kembali
            </button>
            <button
              onClick={loadDetail}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[#066EFF] rounded-xl text-[12px] font-bold cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#F8FAFC]">
      <div className="p-4 md:p-6 lg:p-8">
        <ProjectDetailView
          project={data.project}
          submission={data.submission}
          onBack={() => router.push("/dashboard/dev-hub")}
        />
      </div>
    </div>
  );
}
