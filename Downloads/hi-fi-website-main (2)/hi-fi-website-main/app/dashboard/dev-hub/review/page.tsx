"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { AICodeReviewFullDetail } from "../_components/AICodeReviewFullDetail";

export default function AIReviewResultPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#F8FAFC]">
      <div className="p-4 md:p-6 lg:p-8">
        <AICodeReviewFullDetail onBack={() => router.push("/dashboard/dev-hub")} />
      </div>
    </div>
  );
}
