import { useState, useEffect, useCallback } from "react";
import { getAssessmentAnalytics, AssessmentAnalytics } from "@/lib/api";

export function useAssessmentAnalytics() {
  const [data, setData] = useState<AssessmentAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getAssessmentAnalytics();
      setData(result);
    } catch (err) {
      const errorObject = err as Error;
      setError(errorObject.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return {
    data,
    loading,
    error,
    hasAssessment: !!data?.has_assessment,
    refresh: fetchAnalytics,
  };
}
