"use client";

import { Database, Layout, Code2, Terminal } from "lucide-react";

export type TaskType = "Multiple Choice" | "Practical Test" | "Essay" | "File Upload";

export interface Option {
  id: string;
  text: string;
}

export interface Task {
  id: number;
  type: TaskType;
  question: string;
  options?: Option[];
  instructions?: string[];
  placeholder?: string;
  minWords?: number;
}

export interface Section {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  tasks: Task[];
}

export const quizData: Section[] = [
  {
    id: "data-analysis",
    name: "Data Analysis",
    description: "Analyze data patterns and demonstrate practical skills",
    icon: Database,
    color: "blue",
    tasks: [
      {
        id: 1,
        type: "Multiple Choice",
        question: "You're given a dataset with 10,000 rows and notice that 15% of entries in the 'income' column are missing. Which approach is most appropriate before building a predictive model?",
        options: [
          { id: "A", text: "Delete all rows with missing income values" },
          { id: "B", text: "Fill missing values with the column mean after checking the missing data pattern" },
          { id: "C", text: "Replace missing values with zero" },
          { id: "D", text: "Ignore the missing values and proceed with modeling" },
        ],
      },
      {
        id: 2,
        type: "Multiple Choice",
        question: "Which SQL query correctly calculates the average order value per customer from an 'orders' table?",
        options: [
          { id: "A", text: "SELECT customer_id, AVG(total) FROM orders" },
          { id: "B", text: "SELECT customer_id, AVG(total) FROM orders GROUP BY customer_id" },
          { id: "C", text: "SELECT AVG(total) FROM orders WHERE customer_id IS NOT NULL" },
          { id: "D", text: "SELECT customer_id, SUM(total) / COUNT(*) FROM orders" },
        ],
      },
      {
        id: 3,
        type: "Practical Test",
        question: "Practical Test — Data Cleaning",
        instructions: [
          "Remove duplicate records based on transaction ID",
          "Handle missing values in the 'revenue' column using median imputation",
          "Standardize date formats to YYYY-MM-DD",
          "Export the cleaned dataset as a new CSV file"
        ],
      },
      {
        id: 4,
        type: "Essay",
        question: "Explain how you would approach analyzing customer churn for a SaaS company with 50,000 users. Describe the key metrics you'd track, the data sources you'd use, and the analytical framework you'd apply.",
        placeholder: "Describe your analytical approach, including data preparation steps, key metrics, tools you'd use, and how you'd present findings to stakeholders...",
        minWords: 150,
      }
    ],
  },
  {
    id: "design-brief",
    name: "Design Brief",
    description: "Demonstrate your design thinking and visual problem-solving",
    icon: Layout,
    color: "purple",
    tasks: [
      {
        id: 5,
        type: "Multiple Choice",
        question: "A client needs a dashboard for monitoring real-time IoT sensor data. Which layout approach best supports quick scanning of critical metrics?",
        options: [
          { id: "A", text: "Single long scrollable page with all data points" },
          { id: "B", text: "Card-based grid layout with status indicators and progressive disclosure" },
          { id: "C", text: "Multi-tab interface with each sensor on a separate tab" },
          { id: "D", text: "Table view listing all sensor readings chronologically" },
        ],
      },
      {
        id: 6,
        type: "Multiple Choice",
        question: "When designing for accessibility (WCAA 2.1 AA), what is the minimum contrast ratio required for normal-sized text?",
        options: [
          { id: "A", text: "3:1" },
          { id: "B", text: "4.5:1" },
          { id: "C", text: "7:1" },
          { id: "D", text: "2:1" },
        ],
      },
      {
        id: 7,
        type: "Practical Test",
        question: "Design Task — Mobile App Onboarding",
        instructions: [
          "Create a 3-screen onboarding flow for a fitness tracking mobile app",
          "Target young professionals (age 22–35)",
          "Upload your design as a PDF, PNG, or Figma export",
          "Consider user motivation, visual hierarchy, and clear call-to-action placement"
        ],
      }
    ],
  },
  {
    id: "problem-solving",
    name: "Problem Solving",
    description: "Test your algorithmic thinking and logical reasoning",
    icon: Code2,
    color: "emerald",
    tasks: [
      {
        id: 8,
        type: "Multiple Choice",
        question: "You need to find duplicates in an array of 1 million integers. Which approach gives the best time complexity?",
        options: [
          { id: "A", text: "Nested loops comparing each pair — O(n²)" },
          { id: "B", text: "Sort the array first, then check adjacent elements — O(n log n)" },
          { id: "C", text: "Use a Hash Set to track seen elements — O(n)" },
          { id: "D", text: "Recursive binary search — O(log n)" },
        ],
      },
      {
        id: 9,
        type: "Multiple Choice",
        question: "A system experiences a bottleneck during high traffic. Which analytical step is most effective for identifying the root cause?",
        options: [
          { id: "A", text: "Scaling the server horizontally immediately" },
          { id: "B", text: "Analyzing system logs and performance metrics (CPU, RAM, I/O)" },
          { id: "C", text: "Rewriting the entire codebase for better performance" },
          { id: "D", text: "Adding more cache layers without checking existing ones" },
        ],
      },
      {
        id: 10,
        type: "Essay",
        question: "Describe a complex technical problem you've solved recently. Explain your thought process, the tools you used, and how you validated the solution.",
        placeholder: "Detail your approach, the challenge faced, steps taken for resolution, and the final outcome...",
        minWords: 100,
      }
    ],
  },
  {
    id: "web-dev",
    name: "Web Development",
    description: "Assess your frontend and backend engineering skills",
    icon: Terminal,
    color: "orange",
    tasks: [
      {
        id: 11,
        type: "Multiple Choice",
        question: "In React, what is the primary purpose of the useEffect hook?",
        options: [
          { id: "A", text: "To create state variables in a component" },
          { id: "B", text: "To perform side effects like data fetching or subscriptions" },
          { id: "C", text: "To optimize rendering performance with memoization" },
          { id: "D", text: "To define event handlers for user interactions" },
        ],
      },
      {
        id: 12,
        type: "Multiple Choice",
        question: "Which HTTP status code is most appropriate for a successful POST request that creates a new resource?",
        options: [
          { id: "A", text: "200 OK" },
          { id: "B", text: "201 Created" },
          { id: "C", text: "204 No Content" },
          { id: "D", text: "302 Found" },
        ],
      },
      {
        id: 13,
        type: "Essay",
        question: "Explain the differences between Server-Side Rendering (SSR) and Client-Side Rendering (CSR). When would you choose one over the other for a production application?",
        placeholder: "Compare SSR and CSR in terms of SEO, performance, user experience, and complexity...",
        minWords: 120,
      }
    ],
  },
];
