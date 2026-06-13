"use client";

import React, { useRef, useState } from "react";
import { FileText, Files, Download, UploadCloud, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

type DocKind = "cv" | "transcript";

export const DocumentsCard = () => {
  const { user, uploadCv, uploadTranscript } = useAuth();
  const cvInputRef = useRef<HTMLInputElement>(null);
  const transcriptInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState<DocKind | null>(null);

  const getFilenameFromUrl = (url: string | null) => {
    if (!url) return null;
    return url.split("/").pop() || url;
  };

  const cvFilename = getFilenameFromUrl(user?.cv_url ?? null);
  const transcriptFilename = getFilenameFromUrl(user?.transcript_url ?? null);

  const handleFile = async (kind: DocKind, file?: File | null) => {
    if (!file) return;
    setUploading(kind);
    try {
      if (kind === "cv") {
        await uploadCv(file);
        toast.success("CV uploaded successfully.");
      } else {
        await uploadTranscript(file);
        toast.success("Transcript uploaded successfully.");
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : `Failed to upload ${kind}.`,
      );
    } finally {
      setUploading(null);
    }
  };

  const renderRow = (
    kind: DocKind,
    label: string,
    filename: string | null,
    url: string | null | undefined,
    Icon: React.ComponentType<{ className?: string }>,
    iconColor: string,
    inputRef: React.RefObject<HTMLInputElement | null>,
  ) => {
    const isUploading = uploading === kind;
    return (
      <div className="p-3 bg-slate-50/50 rounded-[16px] flex items-center justify-between border border-slate-100 transition-all">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center border border-slate-100 shadow-sm shrink-0">
            <Icon className={`w-4 h-4 ${iconColor}`} />
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-bold text-slate-800">{label}</p>
            <p className="text-[11px] text-slate-400 font-medium truncate max-w-[140px]">
              {filename || "Not uploaded yet"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {filename && url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-500 hover:bg-blue-50 transition-colors"
              title={`Download ${label}`}
            >
              <Download className="w-3.5 h-3.5" />
            </a>
          )}
          <button
            onClick={() => inputRef.current?.click()}
            disabled={isUploading}
            className="flex items-center gap-1.5 px-2.5 h-8 rounded-lg text-[11px] font-semibold text-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-colors disabled:opacity-50"
            title={filename ? `Replace ${label}` : `Upload ${label}`}
          >
            {isUploading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <UploadCloud className="w-3.5 h-3.5" />
            )}
            <span>{filename ? "Replace" : "Upload"}</span>
          </button>
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => {
              handleFile(kind, e.target.files?.[0]);
              e.target.value = "";
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-[24px] border border-[#F1F5F9] shadow-sm shadow-slate-200/5 overflow-hidden flex flex-col">
      <div className="px-6 py-4 border-b border-[#F1F5F9]">
        <h3 className="text-[17px] font-bold text-slate-800">Documents</h3>
      </div>
      <div className="p-4 md:p-5 space-y-3">
        {renderRow(
          "cv",
          "CV / Resume",
          cvFilename,
          user?.cv_url,
          FileText,
          "text-blue-500",
          cvInputRef,
        )}
        {renderRow(
          "transcript",
          "Transcript",
          transcriptFilename,
          user?.transcript_url,
          Files,
          "text-orange-500",
          transcriptInputRef,
        )}
        <p className="text-[11px] text-slate-400 font-medium px-1 pt-1">
          Upload your CV or academic transcript (PDF or DOC) if you didn&apos;t
          add them during onboarding.
        </p>
      </div>
    </div>
  );
};
