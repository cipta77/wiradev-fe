"use client";

import React from "react";
import { FileText, Files, Download, FolderOpen } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export const DocumentsCard = () => {
  const { user } = useAuth();

  const getFilenameFromUrl = (url: string | null) => {
    if (!url) return null;
    return url.split("/").pop() || url;
  };

  const cvFilename = getFilenameFromUrl(user?.cv_url ?? null);
  const transcriptFilename = getFilenameFromUrl(user?.transcript_url ?? null);

  const hasDocs = cvFilename || transcriptFilename;

  return (
    <div className="bg-white rounded-[24px] border border-[#F1F5F9] shadow-sm shadow-slate-200/5 overflow-hidden flex flex-col">
      <div className="px-6 py-4 border-b border-[#F1F5F9]">
        <h3 className="text-[17px] font-bold text-slate-800">Documents</h3>
      </div>
      <div className="p-4 md:p-5 space-y-3">
        {!hasDocs ? (
          <div className="flex flex-col items-center justify-center py-6 gap-2 text-center">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
              <FolderOpen className="w-5 h-5 text-slate-300" />
            </div>
            <p className="text-[12px] text-slate-400 font-medium">
              No documents uploaded yet
            </p>
          </div>
        ) : (
          <>
            {cvFilename && (
              <a
                href={user?.cv_url ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-50/50 rounded-[16px] flex items-center justify-between border border-slate-100 hover:border-blue-100 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center border border-slate-100 shadow-sm">
                    <FileText className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-slate-800">CV</p>
                    <p className="text-[11px] text-slate-400 font-medium truncate max-w-[120px]">
                      {cvFilename}
                    </p>
                  </div>
                </div>
                <Download className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition-colors" />
              </a>
            )}

            {transcriptFilename && (
              <a
                href={user?.transcript_url ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-50/50 rounded-[16px] flex items-center justify-between border border-slate-100 hover:border-blue-100 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center border border-slate-100 shadow-sm">
                    <Files className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-slate-800">
                      Transcript
                    </p>
                    <p className="text-[11px] text-slate-400 font-medium truncate max-w-[120px]">
                      {transcriptFilename}
                    </p>
                  </div>
                </div>
                <Download className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition-colors" />
              </a>
            )}
          </>
        )}
      </div>
    </div>
  );
};
