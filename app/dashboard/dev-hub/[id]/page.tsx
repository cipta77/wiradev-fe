"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { ProjectDetailView } from "../_components/ProjectDetailView";

// Mock data - in real app, fetch based on id
const miniProjects = [
  {
    id: "rest-api",
    title: "REST API with Express",
    description:
      "Build a complete RESTful API using Express.js with user authentication using JWT, input validation with Joi, and proper error handling. The API should support full CRUD operations for a resource management system.",
    level: "Intermediate",
    status: "In Progress",
    duration: "4 hours",
    tag: "Node.js",
    progress: 65,
  },
  {
    id: "react-dashboard",
    title: "React Dashboard",
    description: "Create a responsive analytics dashboard with charts",
    level: "Intermediate",
    status: "Completed",
    duration: "6 hours",
    tag: "React",
    progress: 100,
  },
];

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const project = miniProjects.find((p) => p.id === id) || miniProjects[0];

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#F8FAFC]">
      <div className="p-4 md:p-6 lg:p-8">
        <ProjectDetailView
          project={project}
          onBack={() => router.push("/dashboard/dev-hub")}
        />
      </div>
    </div>
  );
}
