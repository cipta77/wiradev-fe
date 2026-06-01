import { useState, useCallback } from "react";
import { 
  getMiniProjects, 
  getMiniProjectById, 
  startMiniProject, 
  submitMiniProject,
  submitMiniProjectGitHub,
  MiniProjectWithSubmission,
  UserMiniProjectSubmission
} from "@/lib/api";

export function useMiniProjects() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async (): Promise<MiniProjectWithSubmission[]> => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMiniProjects();
      return data || [];
    } catch (err) {
      const errorObject = err as Error;
      setError(errorObject.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProjectDetail = useCallback(async (id: string): Promise<{ project: MiniProjectWithSubmission; submission: UserMiniProjectSubmission | null } | null> => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMiniProjectById(id);
      return data;
    } catch (err) {
      const errorObject = err as Error;
      setError(errorObject.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const startProject = useCallback(async (id: string): Promise<UserMiniProjectSubmission | null> => {
    setLoading(true);
    setError(null);
    try {
      const data = await startMiniProject(id);
      return data;
    } catch (err) {
      const errorObject = err as Error;
      setError(errorObject.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const submitProject = useCallback(async (id: string, file: File): Promise<UserMiniProjectSubmission | null> => {
    setLoading(true);
    setError(null);
    try {
      const data = await submitMiniProject(id, file);
      return data;
    } catch (err) {
      const errorObject = err as Error;
      setError(errorObject.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const submitProjectGitHub = useCallback(async (id: string, githubUrl: string): Promise<UserMiniProjectSubmission | null> => {
    setLoading(true);
    setError(null);
    try {
      const data = await submitMiniProjectGitHub(id, githubUrl);
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
    fetchProjects,
    fetchProjectDetail,
    startProject,
    submitProject,
    submitProjectGitHub,
  };
}
