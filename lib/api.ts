const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function requestApi(path: string, options?: RequestInit) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || data?.error || "API request failed");
  }

  return data?.data ?? data;
}

function formatJobsCount(value: unknown) {
  if (typeof value === "string") return value;

  const numberValue = Number(value || 0);

  if (Number.isNaN(numberValue)) return "0 jobs";
  if (numberValue >= 1000) return `${(numberValue / 1000).toFixed(1)}k jobs`;

  return `${numberValue} jobs`;
}

function getInitials(name: string) {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase())
      .join("") || "AR"
  );
}

export type SkillGapApiItem = {
  skill?: string;
  skill_name?: string;
  skillName?: string;
  current?: number;
  current_score?: number;
  currentScore?: number;
  required?: number;
  required_score?: number;
  requiredScore?: number;
  demand?: string;
  priority?: "Critical" | "High" | "Medium";
};

export type MarketDemandApiItem = {
  rank?: number;
  rank_order?: number;
  rankOrder?: number;
  skill?: string;
  skill_name?: string;
  skillName?: string;
  jobs?: string | number;
  jobs_count?: number;
  jobsCount?: number;
  trend?: number;
  trend_score?: number;
  trendScore?: number;
  barWidth?: number;
  bar_width?: number;
};

export type DashboardSummary = {
  name: string;
  role: string;
  initials: string;
  streak: number;
  readinessScore: number;
  readinessTrend: string;
};

export type OnboardingPayload = {
  email: string;
  firstName: string;
  lastName: string;
  university: string;
  fieldOfStudy: string;
  graduationYear: string;
  goals: string[];
  cvFileName?: string;
  transcriptFileName?: string;
};

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const data = await requestApi("/api/dashboard/summary");

  const user = data?.user || data?.profile || data?.account || data || {};
  const readiness = data?.readiness || data?.readinessSummary || data || {};

  const firstName = user.firstName || user.first_name || "Alex";
  const lastName = user.lastName || user.last_name || "Rahman";
  const fullName =
    user.name || data?.name || `${firstName} ${lastName}`.trim() || "Alex Rahman";

  const score =
    readiness.score ??
    readiness.readinessScore ??
    data?.readinessScore ??
    data?.overallReadiness ??
    62;

  const trend =
    readiness.trend ||
    readiness.readinessTrend ||
    data?.readinessTrend ||
    data?.trend ||
    "+8%";

  return {
    name: fullName,
    role: user.role || data?.role || "Career Seeker",
    initials: user.initials || data?.initials || getInitials(fullName),
    streak: Number(data?.streak ?? user.streak ?? 3),
    readinessScore: Number(score || 62),
    readinessTrend: String(trend),
  };
}

export async function getSkillGap() {
  const data = await requestApi("/api/readiness/skill-gap");

  const list: SkillGapApiItem[] = Array.isArray(data)
    ? data
    : data?.skills || data?.skillGaps || [];

  return list.map((item) => ({
    skill: item.skill || item.skill_name || item.skillName || "Unknown Skill",
    current: item.current ?? item.current_score ?? item.currentScore ?? 0,
    required: item.required ?? item.required_score ?? item.requiredScore ?? 0,
    demand: item.demand || "Medium",
    priority: item.priority || "Medium",
  }));
}

export async function getMarketDemand() {
  const data = await requestApi("/api/readiness/market-demand");

  const list: MarketDemandApiItem[] = Array.isArray(data)
    ? data
    : data?.marketDemands || data?.demands || [];

  return list.map((item, index) => {
    const trend = item.trend ?? item.trend_score ?? item.trendScore ?? 0;

    return {
      rank: item.rank ?? item.rank_order ?? item.rankOrder ?? index + 1,
      skill: item.skill || item.skill_name || item.skillName || "Unknown Skill",
      jobs: formatJobsCount(item.jobs ?? item.jobs_count ?? item.jobsCount),
      trend,
      barWidth: item.barWidth ?? item.bar_width ?? trend ?? 60,
    };
  });
}

export async function submitOnboarding(payload: OnboardingPayload) {
  return requestApi("/api/onboarding", {
    method: "POST",
    body: JSON.stringify({
      ...payload,
      first_name: payload.firstName,
      last_name: payload.lastName,
      field_of_study: payload.fieldOfStudy,
      graduation_year: payload.graduationYear,
      cv_file_name: payload.cvFileName,
      transcript_file_name: payload.transcriptFileName,
    }),
  });
}
