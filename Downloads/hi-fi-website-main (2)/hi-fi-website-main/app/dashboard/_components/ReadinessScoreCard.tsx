"use client";

import { useRouter } from "next/navigation";
import { TrendingUp, ArrowRight } from "lucide-react";

interface ReadinessScoreCardProps {
  score: number;
  trend: string;
}

export const ReadinessScoreCard = ({ score, trend }: ReadinessScoreCardProps) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/dashboard/readiness")}
      className="relative overflow-hidden bg-[#066EFF] p-5 md:p-6 rounded-[24px] h-full flex flex-col transition-all duration-500 group text-white shadow-lg shadow-blue-600/10 cursor-pointer active:scale-[0.98]"
    >
      {/* Decorative background blobs/circles */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none transition-all duration-700 group-hover:bg-white/20" />
      <div className="absolute top-1/4 -right-4 w-20 h-20 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[10%] w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col grow">
        <p className="text-[13px] md:text-[14px] font-medium text-white/90 tracking-tight mb-1.5">
          Overall Readiness
        </p>

        <div className="flex items-baseline gap-1.5 mb-5">
          <span className="text-[44px] md:text-[52px] font-bold leading-none tracking-tight">
            {score}
          </span>
          <span className="text-[20px] md:text-[24px] font-medium text-white/60">
            / 100
          </span>
        </div>

        <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm mb-4">
          <div
            className="h-full bg-white rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(255,255,255,0.25)]"
            style={{ width: `${score}%` }}
          />
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1.5 text-white/70">
            <TrendingUp className="w-3.5 h-3.5" />
            <span className="text-[12px] font-medium tracking-tight">
              {trend} from last week
            </span>
          </div>
          
          <div className="flex items-center gap-1.5 text-[12px] font-medium text-white/70 group/btn">
            <span>View details</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </div>
  );
};
