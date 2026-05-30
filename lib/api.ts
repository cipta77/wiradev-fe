const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function requestApi(path: string, options?: RequestInit) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    credentials: "include",
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
  const responseData = await requestApi("/api/dashboard/summary");
  const data = responseData?.result || responseData;

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
  const responseData = await requestApi("/api/readiness/skill-gap");
  const data = responseData?.result || responseData;

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
  const responseData = await requestApi("/api/readiness/market-demand");
  const data = responseData?.result || responseData;

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

// Assessment API integrations using unified requestApi utility
export async function getAssessmentCategories() {
  return requestApi("/api/assessment/categories");
}

export async function getAssessmentQuestions() {
  return requestApi("/api/assessment/questions");
}

export async function submitAssessmentResult(answers: { question_id: string; user_answer: string }[], timeTaken: number) {
  return requestApi("/api/assessment/submit", {
    method: "POST",
    body: JSON.stringify({
      answers,
      time_taken_seconds: timeTaken,
    }),
  });
}

export async function getAssessmentResultData(id: string) {
  return requestApi(`/api/assessment/result/${id}`);
}

export type AssessmentAnalyticsCategory = {
  slug: string;
  name: string;
  icon: string;
  color: string;
  score: number;
  correct: number;
  total: number;
  required: number;
  gap: number;
  status: "strong" | "moderate" | "gap";
};

export type AssessmentAnalytics = {
  has_assessment: boolean;
  assessment_id?: string;
  completed_at?: string;
  overall_score?: number;
  total_questions?: number;
  correct_answers?: number;
  categories?: AssessmentAnalyticsCategory[];
  strengths_count?: number;
  critical_gaps_count?: number;
  skills_mapped?: number;
};

export async function getAssessmentAnalytics(): Promise<AssessmentAnalytics> {
  const responseData = await requestApi("/api/assessment/analytics");
  return responseData?.result ?? responseData;
}

// CV Screening API types and methods
export interface CvScreeningResult {
  id: string;
  user_id: string;
  file_name: string;
  file_url: string;
  overall_score: number;
  contact_score: number;
  summary_score: number;
  skills_score: number;
  experience_score: number;
  projects_score: number;
  education_score: number;
  ats_score: number;
  keywords_found: string[];
  keywords_missing: string[];
  ai_summary: string;
  recommendations: string[];
  created_at: string;
}

export async function uploadCvScreening(file: File): Promise<CvScreeningResult> {
  const formData = new FormData();
  formData.append("cv", file);

  const response = await fetch(`${API_BASE_URL}/api/cv-screening/upload`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.message || data?.error || "CV screening failed");
  }

  return data?.result ?? data;
}

export async function getCvScreeningHistory(): Promise<CvScreeningResult[]> {
  const responseData = await requestApi("/api/cv-screening/history");
  return responseData?.result ?? responseData ?? [];
}

export async function getCvScreeningById(id: string): Promise<CvScreeningResult> {
  const responseData = await requestApi(`/api/cv-screening/${id}`);
  return responseData?.result ?? responseData;
}

export async function deleteCvScreening(id: string): Promise<void> {
  await requestApi(`/api/cv-screening/${id}`, {
    method: "DELETE",
  });
}

// Career Simulation API methods
export interface SimulationResultReport {
  is_passed: boolean;
  score: number;
  feedback: string;
  negotiated_salary?: string;
}

export interface SimulationSession {
  id: string;
  user_id: string;
  type: "recruiter" | "salary";
  company_name: string | null;
  status: "ongoing" | "completed";
  current_question_index: number;
  created_at: string;
}

export interface SimulationMessage {
  id: string;
  simulation_id: string;
  sender: "bot" | "user";
  text: string;
  created_at: string;
}

export async function startSimulation(
  type: "recruiter" | "salary",
  companyName?: string
): Promise<{ simulation: SimulationSession; firstMessage: SimulationMessage }> {
  const responseData = await requestApi("/api/simulations/start", {
    method: "POST",
    body: JSON.stringify({ type, company_name: companyName }),
  });
  return responseData?.result ?? responseData;
}

export async function sendSimulationMessage(
  id: string,
  text: string
): Promise<{ botMessage?: SimulationMessage; result?: SimulationResultReport }> {
  const responseData = await requestApi(`/api/simulations/${id}/message`, {
    method: "POST",
    body: JSON.stringify({ text }),
  });
  return responseData?.result ?? responseData;
}

export async function getSimulationDetails(
  id: string
): Promise<{ simulation: SimulationSession; messages: SimulationMessage[]; result?: SimulationResultReport }> {
  const responseData = await requestApi(`/api/simulations/${id}`);
  return responseData?.result ?? responseData;
}

// Jobdesk Analyzer API integration
export interface JobdeskAnalysisResult {
  match_score: number;
  matching_skills: string[];
  missing_skills: string[];
  recommendations: string[];
  summary: string;
}

export async function analyzeJobDescription(
  jobDescription: string
): Promise<JobdeskAnalysisResult> {
  const responseData = await requestApi("/api/jobdesk/analyze", {
    method: "POST",
    body: JSON.stringify({ job_description: jobDescription }),
  });
  return responseData?.result ?? responseData;
}


