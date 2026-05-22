import { Share2, BarChart3, Terminal, Briefcase } from "lucide-react";

const steps = [
  {
    step: "STEP 01",
    title: "Connect & Assess",
    description:
      "Upload your CV, transcript, and connect your GitHub account for a complete analysis.",
    icon: Share2,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    step: "STEP 02",
    title: "See Your Gaps",
    description:
      "Get a detailed skill map and readiness score compared to industry requirements.",
    icon: BarChart3,
    iconColor: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
  {
    step: "STEP 03",
    title: "Build & Learn",
    description:
      "Complete mini projects and get AI-powered code reviews to close skill gaps fast.",
    icon: Terminal,
    iconColor: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    step: "STEP 04",
    title: "Simulate & Apply",
    description:
      "Practice interviews, negotiate salary, and analyze job descriptions before applying.",
    icon: Briefcase,
    iconColor: "text-amber-600",
    bgColor: "bg-amber-50",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="min-h-screen py-24 flex flex-col items-center justify-center font-poppins"
      style={{
        background: "linear-gradient(to bottom, #F7F9FC, #F9FAFD, #FBFCFE, #FDFDFE, #FFFFFF)",
      }}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-[1248px] flex flex-col items-center">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="px-4 py-1.5 rounded-full bg-blue-50 text-[#066EFF] text-[13px] font-medium">
            How It Works
          </div>

          <h2 className="text-[28px] md:text-[38px] font-extrabold text-[#0D3E9B] font-darker-grotesque leading-[1.15] md:leading-tight">
            From Zero to Job-Ready in 4 Steps
          </h2>
        </div>

        <div className="relative w-full pt-4">
          <div className="hidden lg:block absolute top-[50px] left-[15%] right-[15%] h-px border-t border-dashed border-gray-200 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full relative z-10 px-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div
                  className={`w-[64px] h-[64px] rounded-[16px] ${step.bgColor} flex items-center justify-center mb-[20px]`}
                >
                  <step.icon className={`w-7 h-7 ${step.iconColor}`} />
                </div>

                <span className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider mb-[4px]">
                  {step.step}
                </span>

                <h3 className="text-[17px] font-semibold text-gray-900 mb-[8px] font-poppins">
                  {step.title}
                </h3>

                <p className="text-[13px] text-gray-400 font-normal leading-relaxed max-w-[240px]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
