"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "./api-client";

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
  cv_url: string | null;
  transcript_url: string | null;
  onboarding_completed: boolean;
  is_email_verified: boolean;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (identifier: string, password: string) => Promise<User>;
  loginWithGoogle: (idToken: string, isSignUp?: boolean) => Promise<User>;
  register: (email: string, password: string) => Promise<User>;
  logout: () => void;
  updateProfile: (data: {
    first_name: string;
    last_name: string;
    university: string;
    field_of_study: string;
    graduation_year: number;
  }) => Promise<User>;
  updateGoal: (goal: AchievementGoal) => Promise<User>;
  uploadDocuments: (
    cv?: File | null,
    transcript?: File | null,
  ) => Promise<User>;
  completeOnboarding: (githubId?: string) => Promise<User>;
  refreshProfile: () => Promise<void>;
  updateAccountSettings: (data: {
    first_name: string;
    last_name: string;
    email: string;
    university: string;
  }) => Promise<User>;
  updatePassword: (data: {
    current_password?: string;
    new_password?: string;
  }) => Promise<User>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
      }
    } catch (e) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
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
        };
      } = await apiClient.post(
        "/api/auth/login",
        { identifier, password },
        { useAuth: false },
      );

      const { user: loggedUser } = res.result;
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
    setIsLoading(true);
    try {
      const res: {
        result: {
          user: User;
        };
      } = await apiClient.post(
        "/api/auth/google",
        { idToken, isSignUp },
        { useAuth: false },
      );

      const { user: loggedUser } = res.result;
      setUser(loggedUser);
      return loggedUser;
    } catch (e) {
      setIsLoading(false);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res: {
        result: {
          user: User;
        };
      } = await apiClient.post(
        "/api/auth/register",
        { email, password },
        { useAuth: false },
      );

      const { user: registeredUser } = res.result;
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

  const updateGoal = async (goal: AchievementGoal) => {
    if (!user) throw new Error("Unauthorized");
    const res: { result: User } = await apiClient.patch(
      `/api/users/${user.id}/onboarding/goal`,
      {
        achievement_goal: goal,
      },
    );
    setUser(res.result);
    return res.result;
  };

  const uploadDocuments = async (
    cv?: File | null,
    transcript?: File | null,
  ) => {
    if (!user) throw new Error("Unauthorized");
    const formData = new FormData();
    if (cv) formData.append("cv", cv);
    if (transcript) formData.append("transcript", transcript);

    const res: { result: User } = await apiClient.patch(
      `/api/users/${user.id}/onboarding/documents`,
      formData,
    );
    setUser(res.result);
    return res.result;
  };

  const completeOnboarding = async (githubId?: string) => {
    if (!user) throw new Error("Unauthorized");
    const body: { githubId?: string } = {};
    if (githubId) {
      body.githubId = githubId;
    }

    const res: { result: User } = await apiClient.post(
      `/api/users/${user.id}/onboarding/complete`,
      body,
    );
    setUser(res.result);
    return res.result;
  };

  const updateAccountSettings = async (data: {
    first_name: string;
    last_name: string;
    email: string;
    university: string;
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
        register,
        logout,
        updateProfile,
        updateGoal,
        uploadDocuments,
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
