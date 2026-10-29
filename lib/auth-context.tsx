"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiClient, storeTokens, clearTokens } from "./api-client";

export enum AchievementGoal {
  GET_FIRST_JOB = "GET_FIRST_JOB",
  SWITCH_DEVELOPER_ROLE = "SWITCH_DEVELOPER_ROLE",
  IMPROVE_CODING_SKILLS = "IMPROVE_CODING_SKILLS",
  PREPARE_INTERVIEWS = "PREPARE_INTERVIEWS",
  BUILD_PORTFOLIO = "BUILD_PORTFOLIO",
  UNDERSTAND_MARKET = "UNDERSTAND_MARKET",
}

export interface User {
  id: string;
  email: string;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  university: string | null;
  field_of_study: string | null;
  graduation_year: number | null;
  avatar_url: string | null;
  achievement_goal: AchievementGoal | null;
  target_role: string | null;
  cv_url: string | null;
  transcript_url: string | null;
  onboarding_completed: boolean;
  is_email_verified: boolean;
  github_username?: string | null;
  github_languages?: any | null;
  github_readiness_score?: number | null;
  github_last_synced_at?: string | null;
  created_at: string;
  updated_at: string;
  providers?: string[];
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (identifier: string, password: string) => Promise<User>;
  loginWithGoogle: (idToken: string, isSignUp?: boolean) => Promise<User>;
  loginWithGitHub: (code: string, isSignUp?: boolean) => Promise<User>;
  register: (email: string, password: string) => Promise<User>;
  logout: () => void;
  updateProfile: (data: {
    first_name: string;
    last_name: string;
    university: string;
    field_of_study: string;
    graduation_year: number;
  }) => Promise<User>;
  updateRole: (role: string) => Promise<User>;
  uploadCv: (cv: File) => Promise<User>;
  uploadTranscript: (transcript: File) => Promise<User>;
  completeOnboarding: (githubId?: string, githubUsername?: string) => Promise<User>;
  refreshProfile: () => Promise<void>;
  updateAccountSettings: (data: {
    first_name: string;
    last_name: string;
    email: string;
    university: string;
    field_of_study?: string;
  }) => Promise<User>;
  updatePassword: (data: {
    current_password?: string;
    new_password?: string;
  }) => Promise<User>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Concurrency Mutex & Promise Memoization (/production-code-hardening)
let activeGitHubAuthPromise: { code: string; promise: Promise<User> } | null = null;
let activeGoogleAuthPromise: { idToken: string; promise: Promise<User> } | null = null;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const loadProfile = async () => {
    try {
      const res: { result: User | null } = await apiClient.get("/api/auth/me");
      if (res && res.result) {
        setUser(res.result);
      } else {
        setUser(null);
        clearTokens();
      }
    } catch {
      setUser(null);
      clearTokens();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadProfile();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const refreshProfile = async () => {
    if (!user) return;
    try {
      const res: { result: User } = await apiClient.get(
        `/api/users/${user.id}`,
      );
      setUser(res.result);
    } catch (e) {
      console.error("Error refreshing profile", e);
    }
  };

  const login = async (identifier: string, password: string) => {
    setIsLoading(true);
    try {
      const res: {
        result: {
          user: User;
          tokens?: { accessToken: string; refreshToken: string };
        };
      } = await apiClient.post(
        "/api/auth/login",
        { identifier, password },
        { useAuth: false },
      );

      const { user: loggedUser, tokens } = res.result;
      if (tokens) {
        storeTokens(tokens.accessToken, tokens.refreshToken);
      }
      setUser(loggedUser);
      return loggedUser;
    } catch (e) {
      setIsLoading(false);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (
    idToken: string,
    isSignUp: boolean = false,
  ) => {
    if (activeGoogleAuthPromise && activeGoogleAuthPromise.idToken === idToken) {
      return activeGoogleAuthPromise.promise;
    }

    const executeAuth = async () => {
      setIsLoading(true);
      try {
        const res: {
          result: {
            user: User;
            tokens?: { accessToken: string; refreshToken: string };
          };
        } = await apiClient.post(
          "/api/auth/google",
          { idToken, isSignUp },
          { useAuth: false },
        );

        const { user: loggedUser, tokens } = res.result;
        if (tokens) {
          storeTokens(tokens.accessToken, tokens.refreshToken);
        }
        setUser(loggedUser);
        return loggedUser;
      } finally {
        setIsLoading(false);
      }
    };

    const promise = executeAuth();
    activeGoogleAuthPromise = { idToken, promise };

    try {
      return await promise;
    } finally {
      setTimeout(() => {
        if (activeGoogleAuthPromise?.idToken === idToken) {
          activeGoogleAuthPromise = null;
        }
      }, 10000);
    }
  };

  const loginWithGitHub = async (code: string, isSignUp: boolean = false) => {
    // Concurrency Mutex: prevent duplicate requests for the single-use OAuth code
    if (activeGitHubAuthPromise && activeGitHubAuthPromise.code === code) {
      return activeGitHubAuthPromise.promise;
    }

    const executeAuth = async () => {
      setIsLoading(true);
      try {
        const res: {
          result: {
            user: User;
            tokens?: { accessToken: string; refreshToken: string };
          };
        } = await apiClient.post(
          "/api/auth/github",
          { code, isSignUp },
          { useAuth: false },
        );

        const { user: loggedUser, tokens } = res.result;
        if (tokens) {
          storeTokens(tokens.accessToken, tokens.refreshToken);
        }
        setUser(loggedUser);
        return loggedUser;
      } finally {
        setIsLoading(false);
      }
    };

    const promise = executeAuth();
    activeGitHubAuthPromise = { code, promise };

    try {
      return await promise;
    } finally {
      // Retain memoized promise for 10s so concurrent StrictMode/re-renders never resend the used code
      setTimeout(() => {
        if (activeGitHubAuthPromise?.code === code) {
          activeGitHubAuthPromise = null;
        }
      }, 10000);
    }
  };

  const register = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res: {
        result: {
          user: User;
          tokens?: { accessToken: string; refreshToken: string };
        };
      } = await apiClient.post(
        "/api/auth/register",
        { email, password },
        { useAuth: false },
      );

      const { user: registeredUser, tokens } = res.result;
      if (tokens) {
        storeTokens(tokens.accessToken, tokens.refreshToken);
      }
      setUser(registeredUser);
      return registeredUser;
    } catch (e) {
      setIsLoading(false);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiClient.post("/api/auth/logout", {}, { useAuth: true });
    } catch (e) {
      console.error("Backend logout failed:", e);
    } finally {
      clearTokens();
      setUser(null);
      router.push("/signin");
    }
  };

  const updateProfile = async (data: {
    first_name: string;
    last_name: string;
    university: string;
    field_of_study: string;
    graduation_year: number;
  }) => {
    if (!user) throw new Error("Unauthorized");
    const res: { result: User } = await apiClient.patch(
      `/api/users/${user.id}/onboarding/profile`,
      data,
    );
    setUser(res.result);
    return res.result;
  };

  const updateRole = async (role: string) => {
    if (!user) throw new Error("Unauthorized");
    const res: { result: User } = await apiClient.patch(
      `/api/users/${user.id}/onboarding/role`,
      {
        target_role: role,
      },
    );
    setUser(res.result);
    return res.result;
  };

  const uploadCv = async (cv: File) => {
    if (!user) throw new Error("Unauthorized");
    const formData = new FormData();
    formData.append("cv", cv);

    const res: { result: User } = await apiClient.patch(
      `/api/users/${user.id}/onboarding/cv`,
      formData,
    );
    setUser(res.result);
    return res.result;
  };

  const uploadTranscript = async (transcript: File) => {
    if (!user) throw new Error("Unauthorized");
    const formData = new FormData();
    formData.append("transcript", transcript);

    const res: { result: User } = await apiClient.patch(
      `/api/users/${user.id}/onboarding/transcript`,
      formData,
    );
    setUser(res.result);
    return res.result;
  };

  const completeOnboarding = async (githubId?: string, githubUsername?: string) => {
    if (!user) throw new Error("Unauthorized");
    
    const res: { result: User } = await apiClient.post(
      `/api/users/${user.id}/onboarding/complete`,
      { githubId, githubUsername },
    );
    setUser(res.result);
    return res.result;
  };

  const updateAccountSettings = async (data: {
    first_name: string;
    last_name: string;
    email: string;
    university: string;
    field_of_study?: string;
  }) => {
    if (!user) throw new Error("Unauthorized");
    const res: { result: User } = await apiClient.patch(
      `/api/users/${user.id}/profile`,
      data,
    );
    setUser(res.result);
    return res.result;
  };

  const updatePassword = async (data: {
    current_password?: string;
    new_password?: string;
  }) => {
    if (!user) throw new Error("Unauthorized");
    const res: { result: User } = await apiClient.put(
      `/api/users/${user.id}/password`,
      data,
    );
    setUser(res.result);
    return res.result;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        loginWithGoogle,
        loginWithGitHub,
        register,
        logout,
        updateProfile,
        updateRole,
        uploadCv,
        uploadTranscript,
        completeOnboarding,
        refreshProfile,
        updateAccountSettings,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
