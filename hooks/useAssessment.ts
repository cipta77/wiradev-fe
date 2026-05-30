import { useState, useCallback } from "react";
import { AssessmentCategory } from "../app/dashboard/readiness/_components/initial-test/quizData";
import { 
  getAssessmentQuestions, 
  submitAssessmentResult, 
  getAssessmentResultData 
} from "@/lib/api";

export function useAssessment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getQuestions = useCallback(async (): Promise<AssessmentCategory[]> => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAssessmentQuestions();
      return data || [];
    } catch (err) {
      const errorObject = err as Error;
      setError(errorObject.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const submitAssessment = useCallback(
    async (answers: { question_id: string; user_answer: string }[], timeTaken: number) => {
      setLoading(true);
      setError(null);
      try {
        const data = await submitAssessmentResult(answers, timeTaken);
        return data;
      } catch (err) {
        const errorObject = err as Error;
        setError(errorObject.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getResult = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAssessmentResultData(id);
      return data;
    } catch (err) {
      const errorObject = err as Error;
      setError(errorObject.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    getQuestions,
    submitAssessment,
    getResult,
  };
}
