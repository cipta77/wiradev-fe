"use client";

import { LucideIcon } from "lucide-react";

export type QuestionType = "multiple_choice" | "yes_no";

export interface Option {
  id: string;
  text: string;
}

export interface AssessmentQuestion {
  id: string;
  question_type: QuestionType;
  question_text: string;
  options: Option[];
}

export interface AssessmentCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string; // string key representing a Lucide icon
  color: string;
  questions: AssessmentQuestion[];
}
