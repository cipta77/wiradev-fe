"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ChevronLeft, 
  Clock, 
  CheckCircle2, 
  FileText, 
  Upload,
  X,
  FileCode,
  AlertCircle,
  Loader2,
  Sparkles
} from "lucide-react";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useMiniProjects } from "@/hooks/use-mini-projects";
import { MiniProjectWithSubmission, UserMiniProjectSubmission } from "@/lib/api";
import { ProjectReviewResult } from "../../_components/ProjectReviewResult";

export default function ProjectWorkspacePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { fetchProjectDetail, submitProject, submitProjectGitHub, loading: apiLoading } = useMiniProjects();
  
  const [data, setData] = useState<{ project: MiniProjectWithSubmission; submission: UserMiniProjectSubmission | null } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Drag & drop file states
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isReviewing, setIsReviewing] = useState(false);

  // GitHub submission states
  const [activeSubmitTab, setActiveSubmitTab] = useState<"file" | "github">("file");
  const [githubUrl, setGithubUrl] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let active = true;

    const loadData = async () => {
      if (!id) return;
      try {
        const res = await fetchProjectDetail(id);
        if (res && active) {
          setData(res);
        }
      } catch  {
        if (active) {
          setError("Gagal memuat workspace proyek.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      active = false;
    };
  }, [id, fetchProjectDetail]);

  // Handle drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Check file type and size constraints
  const validateFile = (selectedFile: File): boolean => {
    setUploadError(null);
    const allowedExtensions = ["zip", "rar", "pdf", "docx", "pptx", "js", "ts", "jsx", "tsx", "py", "java", "txt"];
    const ext = selectedFile.name.split(".").pop()?.toLowerCase();

    if (!ext || !allowedExtensions.includes(ext)) {
      setUploadError("Format berkas tidak diizinkan. Hanya berkas ZIP, RAR, PDF, DOCX, PPTX atau berkas kode yang diperbolehkan.");
      return false;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setUploadError("Ukuran berkas melebihi batas 10MB.");
      return false;
    }

    return true;
  };

  // Handle drop event
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
      }
    }
  };

  // Handle manual selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
      }
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    if (activeSubmitTab === "file") {
      if (!file || !id) return;
      setIsReviewing(true);
      setUploadError(null);

      try {
        const updatedSubmission = await submitProject(id, file);
        if (updatedSubmission) {
          setData(prev => prev ? { ...prev, submission: updatedSubmission } : null);
        }
      } catch (err) {
        setUploadError((err as Error).message || "Gagal mengunggah dan menilai proyek.");
        setIsReviewing(false);
      } finally {
        setIsReviewing(false);
      }
    } else {
      if (!githubUrl || !id) return;

      // Basic validation
      if (!githubUrl.toLowerCase().includes("github.com/")) {
        setUploadError("Tautan harus merupakan tautan repositori GitHub yang valid.");
        return;
      }

      setIsReviewing(true);
      setUploadError(null);

      try {
        const updatedSubmission = await submitProjectGitHub(id, githubUrl);
        if (updatedSubmission) {
          setData(prev => prev ? { ...prev, submission: updatedSubmission } : null);
        }
      } catch (err) {
        setUploadError((err as Error).message || "Gagal mengimpor dan menilai proyek dari GitHub.");
        setIsReviewing(false);
      } finally {
        setIsReviewing(false);
      }
    }
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  if (loading) {
    return (
      <div className="flex flex-col h-full overflow-y-auto bg-[#F8FAFC]">
        <div className="p-4 md:p-6 lg:p-8 flex flex-col items-center justify-center min-h-[450px]">
          <Loader2 className="w-10 h-10 animate-spin text-[#066EFF]" />
          <p className="text-slate-400 font-poppins font-medium text-[13px] mt-4">Mempersiapkan Lembar Kerja...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col h-full overflow-y-auto bg-[#F8FAFC]">
        <div className="p-4 md:p-6 lg:p-8 flex flex-col items-center justify-center min-h-[450px] text-center max-w-md mx-auto font-poppins gap-4">
          <AlertCircle className="w-10 h-10 text-red-500" />
          <div>
            <h4 className="text-slate-900 font-bold text-[16px]">Gagal memuat ruang kerja</h4>
            <p className="text-slate-500 text-[13px] mt-1.5 leading-relaxed">{error || "Proyek tidak ditemukan."}</p>
          </div>
          <button
            onClick={() => router.push("/dashboard/dev-hub")}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 rounded-xl text-[12px] font-bold cursor-pointer"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  const { project, submission } = data;
  const status = submission?.status || "not_started";

  // If already reviewed, directly show results
  if (status === "reviewed" && submission) {
    return (
      <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-700">
        <ProjectReviewResult 
          project={project} 
          submission={submission} 
          onBack={() => router.push(`/dashboard/dev-hub/${project.id}`)}
        />
      </div>
    );
  }

  // If submitting / waiting for AI review
  if (isReviewing || status === "submitted") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center font-poppins p-4 bg-[#F8FAFC]">
        <div className="bg-white p-8 md:p-10 rounded-[32px] border border-slate-100/60 shadow-xl shadow-slate-200/20 max-w-md w-full text-center space-y-7 animate-in zoom-in-95 duration-500">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto relative overflow-hidden">
            <div className="absolute inset-0 border-[3px] border-[#066EFF] border-t-transparent rounded-2xl animate-spin" />
            <Sparkles className="w-6 h-6 text-[#066EFF]" />
          </div>
          <div className="space-y-2.5">
            <h2 className="text-[19px] md:text-[20px] font-bold text-slate-900">Meninjau Proyek Anda</h2>
            <p className="text-slate-400 text-[13px] leading-relaxed">
              Kecerdasan Buatan (AI) kami sedang menganalisis berkas Anda secara terperinci sesuai kriteria penilaian. Proses ini memakan waktu sekitar 10-25 detik.
            </p>
          </div>
          <div className="h-1.5 w-44 bg-slate-100 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-[#066EFF] rounded-full animate-[progress_15s_ease-in-out]" style={{ width: '100%' }} />
          </div>
        </div>
        <style jsx global>{`
          @keyframes progress {
            0% { width: 0%; }
            100% { width: 100%; }
          }
        `}</style>
      </div>
    );
  }

  // Related skills parsing
  const relatedSkills: string[] = Array.isArray(project.related_skills) 
    ? project.related_skills 
    : typeof project.related_skills === 'string'
      ? JSON.parse(project.related_skills)
      : [];

  return (
    <div className="max-w-[1400px] mx-auto p-4 md:p-6 animate-in fade-in duration-700 font-poppins space-y-5">
      {/* Back to detail */}
      <Link
        href={`/dashboard/dev-hub/${project.id}`}
        className="flex items-center gap-1.5 text-slate-400 hover:text-slate-600 font-semibold text-[13px] group transition-all self-start"
      >
        <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Kembali ke Detail Proyek
      </Link>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <h1 className="text-[20px] md:text-[22px] font-bold text-slate-900">{project.title}</h1>
          <p className="text-slate-400 text-[12px] font-medium">Lengkapi proyek di bawah dan unggah hasil pekerjaan Anda.</p>
        </div>

        <div className="flex items-center gap-4.5 bg-white border border-slate-100 p-3 rounded-2xl shadow-sm">
          <div className="flex items-center gap-1.5 text-slate-400 shrink-0">
            <Clock className="w-4 h-4 text-slate-400" />
            <span className="text-[12px] font-bold text-slate-600">{project.duration}</span>
          </div>
          <div className="h-4 w-px bg-slate-150" />
          <span className="bg-blue-50 text-[#066EFF] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-blue-100/30">
            {project.level}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side - Brief */}
        <div className="lg:col-span-6 bg-white rounded-[24px] border border-[#F1F5F9] p-5 md:p-6 space-y-5 shadow-sm">
          <div className="flex items-center gap-2.5">
            <FileText className="w-4.5 h-4.5 text-[#066EFF]" />
            <h2 className="text-[15px] font-bold text-slate-800">Brief Proyek & Kebutuhan</h2>
          </div>
          
          <div className="text-slate-500 text-[13px] md:text-[13.5px] font-medium leading-relaxed whitespace-pre-line bg-slate-50/50 p-4 rounded-2xl border border-slate-100 overflow-y-auto max-h-[450px]">
            {project.brief}
          </div>

          {relatedSkills.length > 0 && (
            <div className="space-y-2 pt-2">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Keahlian Terkait</h4>
              <div className="flex flex-wrap gap-1.5">
                {relatedSkills.map(skill => (
                  <span key={skill} className="px-3 py-1.5 rounded-full bg-blue-50/30 text-[#066EFF] text-[10px] font-bold border border-blue-100/30">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side - File Upload / GitHub Import Area */}
        <div className="lg:col-span-6 bg-white rounded-[24px] border border-[#F1F5F9] p-5 md:p-6 space-y-5 shadow-sm">
          <div className="flex items-center gap-2.5">
            <Upload className="w-4.5 h-4.5 text-[#066EFF]" />
            <h2 className="text-[15px] font-bold text-slate-800">Unggah Hasil Pekerjaan</h2>
          </div>

          {/* Tabs for Submission Method */}
          <div className="flex border-b border-slate-100 gap-4">
            <button 
              onClick={() => {
                setActiveSubmitTab("file");
                setUploadError(null);
              }} 
              className={cn(
                "pb-2.5 text-[13px] font-bold border-b-2 transition-all cursor-pointer", 
                activeSubmitTab === "file" 
                  ? "border-[#066EFF] text-[#066EFF]" 
                  : "border-transparent text-slate-400 hover:text-slate-600"
              )}
            >
              Unggah Berkas
            </button>
            <button 
              onClick={() => {
                setActiveSubmitTab("github");
                setUploadError(null);
              }} 
              className={cn(
                "pb-2.5 text-[13px] font-bold border-b-2 transition-all cursor-pointer", 
                activeSubmitTab === "github" 
                  ? "border-[#066EFF] text-[#066EFF]" 
                  : "border-transparent text-slate-400 hover:text-slate-600"
              )}
            >
              Impor dari GitHub
            </button>
          </div>

          {activeSubmitTab === "file" ? (
            <>
              <p className="text-slate-400 text-[12px] leading-relaxed font-medium">
                Unggah seluruh berkas proyek Anda dalam satu file berformat <span className="font-bold text-slate-700">ZIP</span> atau <span className="font-bold text-slate-700">RAR</span> jika berupa proyek kode, atau berformat <span className="font-bold text-slate-700">PDF, DOCX, PPTX</span> jika berupa dokumen. Maksimal 10MB.
              </p>

              {/* Drag & Drop Zone */}
              <div 
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "border-2 border-dashed rounded-[20px] p-8 text-center flex flex-col items-center justify-center gap-3 transition-all cursor-pointer select-none",
                  dragActive 
                    ? "border-[#066EFF] bg-blue-50/10" 
                    : "border-slate-200 hover:border-[#066EFF] hover:bg-slate-50/30"
                )}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".zip,.rar,.pdf,.docx,.doc,.pptx,.ppt,.txt,.json,.js,.ts,.jsx,.tsx,.py,.java"
                />
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-[#066EFF] shrink-0">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-slate-850">
                    Tarik dan lepaskan berkas di sini
                  </p>
                  <p className="text-[11.5px] text-slate-400 mt-1 font-medium">
                    Atau klik untuk memilih berkas secara manual
                  </p>
                </div>
              </div>

              {/* Selected File Card */}
              {file && (
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between gap-4 animate-in fade-in duration-300">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-[#066EFF] shrink-0">
                      <FileCode className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 space-y-0.5">
                      <p className="text-[12.5px] font-bold text-slate-800 truncate leading-snug">{file.name}</p>
                      <p className="text-[11px] font-semibold text-slate-400">{formatBytes(file.size)}</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleRemoveFile}
                    className="p-1.5 bg-white border border-slate-100 text-slate-400 hover:text-slate-650 rounded-lg hover:border-slate-200 transition-all cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <p className="text-slate-400 text-[12px] leading-relaxed font-medium">
                Masukkan URL repositori GitHub publik Anda. AI kami akan secara otomatis mengunduh dan menganalisis seluruh kode di dalam repositori tersebut.
              </p>

              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <GithubIcon className="w-4.5 h-4.5" />
                  </div>
                  <input
                    type="text"
                    value={githubUrl}
                    onChange={(e) => {
                      setGithubUrl(e.target.value);
                      setUploadError(null);
                    }}
                    placeholder="https://github.com/username/repository"
                    className="block w-full pl-10 pr-3.5 py-3 border border-slate-200 rounded-xl text-[12.5px] font-medium text-slate-850 placeholder-slate-400 focus:outline-none focus:border-[#066EFF] focus:ring-1 focus:ring-[#066EFF]/30 bg-slate-50/50 hover:bg-slate-55 transition-colors"
                  />
                </div>

                <div className="p-3 bg-amber-50 text-amber-700 border border-amber-100 rounded-xl text-[11.5px] leading-relaxed font-medium flex items-start gap-2.5">
                  <AlertCircle className="w-4.5 h-4.5 text-amber-500 mt-0.5 shrink-0" />
                  <span>
                    Pastikan repositori Anda bersifat <strong>publik</strong> agar server kami dapat mengunduh kodenya secara aman untuk dievaluasi oleh AI.
                  </span>
                </div>
              </div>
            </>
          )}

          {/* Upload Error Message */}
          {uploadError && (
            <div className="p-3 bg-red-50 text-red-600 border border-red-100 rounded-xl text-[12px] font-bold flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{uploadError}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-3 border-t border-slate-150 flex justify-end">
            <button 
              onClick={handleSubmit}
              disabled={
                (activeSubmitTab === "file" && !file) ||
                (activeSubmitTab === "github" && !githubUrl) ||
                apiLoading
              }
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl text-[13px] font-bold shadow-md shadow-blue-600/10 hover:bg-blue-700 transition-all active:scale-[0.98] cursor-pointer text-white",
                ((activeSubmitTab === "file" && !file) || (activeSubmitTab === "github" && !githubUrl) || apiLoading)
                  ? "bg-slate-200 border border-slate-300 text-slate-400 cursor-not-allowed shadow-none" 
                  : "bg-[#066EFF] hover:bg-blue-700"
              )}
            >
              {apiLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sedang Mengirim...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Kirim Proyek ke AI</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
