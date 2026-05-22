"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon, GraduationCapIcon, FileTextIcon, Trash2Icon, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

export default function Step5({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { user, uploadDocuments } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const existingTranscriptName = user?.transcript_url
    ? user.transcript_url.substring(user.transcript_url.lastIndexOf("/") + 1)
    : "";

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      if (file.size > 10 * 1024 * 1024) {
        toast.error("File is too large. Max size is 10MB.");
        return;
      }

      const allowedExtensions = ["pdf", "jpg", "jpeg", "png"];
      const extension = file.name.split(".").pop()?.toLowerCase();
      if (!extension || !allowedExtensions.includes(extension)) {
        toast.error("Invalid format. Please upload PDF, JPG, or PNG.");
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleContinue = async () => {
    if (!selectedFile) {
      onNext();
      return;
    }

    setIsSubmitting(true);
    try {
      await uploadDocuments(null, selectedFile);
      toast.success("Transcript uploaded successfully!");
      onNext();
    } catch (e: any) {
      toast.error(e.message || "Failed to upload transcript. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="flex flex-col items-center justify-center w-full animate-in fade-in duration-500 max-w-[720px] mx-auto py-4 px-4 sm:px-0">
      <div className="w-full mb-8 md:mb-10 text-center md:text-left">
        <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-extrabold text-[#0D3E9B] mb-2 tracking-tight leading-tight">
          Upload Academic Transcript
        </h2>
        <p className="text-[14px] md:text-[15px] font-medium text-slate-400 leading-relaxed opacity-80">
          Your transcript helps us map your academic competencies to industry requirements.
        </p>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.jpg,.jpeg,.png"
        className="hidden"
      />

      {selectedFile ? (
        <div className="w-full p-6 bg-slate-50 border border-slate-200 rounded-[24px] flex items-center justify-between gap-4 animate-in zoom-in-95 duration-200">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <FileTextIcon className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <p className="text-[15px] font-bold text-slate-800 truncate pr-4">
                {selectedFile.name}
              </p>
              <p className="text-[12px] font-medium text-slate-400 mt-0.5">
                {formatSize(selectedFile.size)}
              </p>
            </div>
          </div>
          <button
            onClick={handleRemoveFile}
            disabled={isSubmitting}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all shrink-0 cursor-pointer disabled:opacity-50"
          >
            <Trash2Icon className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <div
          onClick={handleBoxClick}
          className="w-full min-h-[200px] md:h-[250px] rounded-[24px] md:rounded-[32px] border-[1.6px] border-dashed border-[#066EFF4D] bg-[#F0F4FF80] flex flex-col items-center justify-center p-6 gap-4 cursor-pointer hover:bg-[#F0F4FF] transition-all group"
        >
          <div className="flex items-center justify-center group-hover:scale-110 transition-transform">
            <GraduationCapIcon className="w-10 h-10 md:w-12 md:h-12 text-[#066EFF]" />
          </div>
          <div className="text-center">
            <p className="text-[15px] md:text-[18px] font-bold text-[#475569] mb-1 md:mb-2 leading-tight">
              Drop your transcript here or click to browse
            </p>
            <p className="text-[12px] md:text-[13px] font-medium text-slate-400">
              Supports PDF, JPG, PNG (Max 10MB)
            </p>
          </div>
        </div>
      )}

      {/* Show existing transcript name if already uploaded */}
      {!selectedFile && existingTranscriptName && (
        <div className="w-full mt-4 px-4 py-2.5 bg-emerald-50/50 border border-emerald-100 rounded-xl flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-[12px] font-semibold text-emerald-700">
            Previously uploaded:
          </span>
          <span className="text-[12px] font-semibold text-slate-500 truncate max-w-[300px]">
            {existingTranscriptName}
          </span>
        </div>
      )}

      <div className="w-full text-center md:text-left mt-8">
        <button
          onClick={onNext}
          disabled={isSubmitting}
          className="text-[14px] font-semibold text-slate-400 hover:text-[#066EFF] transition-colors cursor-pointer disabled:opacity-50"
        >
          I&apos;ll do this later →
        </button>
      </div>

      <div className="flex items-center gap-3 mt-10 md:mt-12 w-full">
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className="h-14 w-14 flex items-center justify-center rounded-[20px] bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-gray-900 transition-all active:scale-95 sm:w-auto sm:px-6 sm:gap-2 sm:bg-transparent sm:hover:bg-transparent sm:h-auto disabled:opacity-50 cursor-pointer"
        >
          <ChevronLeftIcon className="w-5 h-5" />
          <span className="hidden sm:inline text-[15px] font-semibold">Back</span>
        </button>
        <div className="hidden sm:block grow" />
        <Button
          onClick={handleContinue}
          disabled={isSubmitting}
          className="grow sm:grow-0 h-14 px-12 bg-linear-to-r from-[#066EFF] to-[#0556cc] hover:from-[#0556cc] hover:to-[#044bb3] rounded-[20px] text-[15px] font-bold text-white shadow-lg shadow-blue-500/25 gap-3 group transition-all active:scale-[0.98] cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              {selectedFile ? "Upload & Continue" : "Continue"}
              <ChevronRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
