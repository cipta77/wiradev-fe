import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  const gradient =
    "linear-gradient(135deg, #066EFF, #076AF8, #0867F0, #0963E9, #0A60E2, #0B5CDA, #0C59D3, #0C55CC, #0C52C5, #0D4FBE, #0D4BB7, #0D48B0, #0D45A9, #0D41A2, #0D3E9B)";

  return (
    <section className="min-h-screen py-24 bg-white flex flex-col items-center justify-center font-poppins">
      <div className="container mx-auto px-4 md:px-6 max-w-[1248px] flex flex-col items-center">
        <div
          className="w-full max-w-[752px] rounded-[24px] md:rounded-[32px] p-[32px] md:p-[56px] flex flex-col items-center text-center text-white shadow-2xl shadow-blue-500/20"
          style={{ background: gradient }}
        >
          <h2 className="text-[26px] md:text-[36px] font-bold mb-4 leading-tight">
            Ready to Know Where You Stand?
          </h2>

          <p
            className="text-[16px] leading-relaxed mb-8 max-w-[480px] opacity-80"
            style={{ color: "#FFFFFFCC" }}
          >
            Join thousands of IT graduates who stopped guessing and started
            building real career readiness. It takes less than 5 minutes to
            start.
          </p>

          <Button className="w-full sm:w-auto bg-white text-[#066EFF] hover:bg-gray-50 h-14 px-8 text-[16px] font-medium rounded-[14px] shadow-lg mb-6">
            Start Your Free Assessment <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <span className="text-[13px] text-white/50 font-medium">
            Free forever · No credit card required
          </span>
        </div>
      </div>
    </section>
  );
}
