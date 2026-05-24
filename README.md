# Wirapath Frontend 🚀

Wirapath is a platform designed to help career seekers assess their readiness, discover skill gaps, and understand market demands. This repository contains the Frontend application built with **Next.js 14**, **React**, and **Tailwind CSS**.

## 🛠 Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Package Manager**: pnpm

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/) (v18 or higher recommended)
- [pnpm](https://pnpm.io/installation) package manager

## 🚀 How to Run Locally

Follow these steps to run the frontend application on your local machine:

### 1. Clone the repository
```bash
git clone https://github.com/ubaydillah1/hi-fi-website.git
cd wirapath-fe
```

### 2. Install dependencies
It is highly recommended to use `pnpm` for this project:
```bash
pnpm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root of the project by copying the example:
```bash
cp .env.example .env
```
Ensure the following variable is correctly pointing to your local backend server:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_AI_API_URL=http://127.0.0.1:5000
```
*(Note: Make sure the `wirapath-be` backend is also running concurrently so the APIs work correctly).*

### 4. Start the development server
```bash
pnpm dev
```

### 5. Open in Browser
Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 📂 Project Structure

- `/app`: Next.js App Router pages and layouts (Dashboard, Onboarding, Profile).
- `/components`: Reusable UI components.
- `/lib`: Utility functions, API request helpers, and React Contexts (e.g., AuthContext).

## 🔗 Backend Repository
To use the full functionality of the application (like Dashboard summaries, skill gap, and auth), please ensure you also clone and run the backend repository (`wirapath-be`).
