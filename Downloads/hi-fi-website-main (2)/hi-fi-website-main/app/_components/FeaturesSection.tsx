import {
  Target,
  BarChart3,
  Layers,
  Brain,
  MessageSquare,
  GitBranch,
} from "lucide-react";

const features = [
  {
    title: "Readiness Assessment",
    description:
      "Upload your CV, transcript, and connect GitHub to get an instant, detailed career readiness score.",
    icon: Target,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Skill Gap Analysis",
    description:
      "Visual skill mapping shows exactly where you stand vs industry requirements with actionable insights.",
    icon: BarChart3,
    iconColor: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
  {
    title: "Mini Projects",
    description:
      "Build real-world projects tailored to your skill gaps. Each project targets specific competencies.",
    icon: Layers,
    iconColor: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    title: "AI Code Review",
    description:
      "Get instant, detailed feedback on your code quality, best practices, and areas for improvement.",
    icon: Brain,
    iconColor: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "Career Simulation",
    description:
      "Practice recruiter chats, salary negotiation, and job description analysis with AI-powered scenarios.",
    icon: MessageSquare,
    iconColor: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  {
    title: "GitHub Integration",
    description:
      "Connect your GitHub to analyze real contributions, commit quality, and collaboration patterns.",
    icon: GitBranch,
    iconColor: "text-[#0D3E9B]",
    bgColor: "bg-blue-50/50",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="min-h-screen py-24 bg-white flex flex-col items-center justify-center font-poppins scroll-mt-10"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-[1200px] flex flex-col items-center justify-center">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="px-4 py-1.5 rounded-full bg-blue-50 text-[#066EFF] text-[13px] font-medium">
            Platform Features
          </div>

          <h2 className="text-[28px] md:text-[38px] font-extrabold text-[#0D3E9B] font-darker-grotesque leading-[1.15] md:leading-tight">
            Everything You Need to Become Job-Ready
          </h2>
          <p className="text-[16px] text-gray-500 max-w-[650px] leading-relaxed">
            From skill assessment to interview simulation, Wirapath covers your
            entire journey from graduate to hired professional.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 w-full">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-[28px] rounded-[16px] border border-gray-100 bg-white hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col items-start text-left"
              style={{ borderTop: "0.8px solid #E8ECF0" }}
            >
              <div
                className={`w-12 h-12 rounded-[12px] ${feature.bgColor} flex items-center justify-center mb-5`}
              >
                <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
              </div>

              <h3 className="text-[17px] font-semibold text-gray-900 mb-2 font-poppins">
                {feature.title}
              </h3>

              <p className="text-[14px] text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
