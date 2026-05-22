"use client";

import { ProjectCard } from "./ProjectCard";

const miniProjects = [
  {
    id: "rest-api",
    title: "REST API with Express",
    description: "Build a CRUD API with authentication and validation",
    level: "Intermediate" as const,
    status: "In Progress" as const,
    duration: "4 hours",
    tag: "Node.js",
    progress: 65,
  },
  {
    id: "react-dashboard",
    title: "React Dashboard",
    description: "Create a responsive analytics dashboard with charts",
    level: "Intermediate" as const,
    status: "Completed" as const,
    duration: "6 hours",
    tag: "React",
    progress: 100,
  },
  {
    id: "db-schema",
    title: "Database Schema Design",
    description: "Design a normalized schema for an e-commerce platform",
    level: "Beginner" as const,
    status: "Not Started" as const,
    duration: "2 hours",
    tag: "SQL",
  },
  {
    id: "docker-container",
    title: "Docker Containerization",
    description: "Containerize a full-stack app with Docker Compose",
    level: "Advanced" as const,
    status: "Not Started" as const,
    duration: "3 hours",
    tag: "DevOps",
  },
];

export const ProjectGrid = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 pb-4">
      {miniProjects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  );
};
