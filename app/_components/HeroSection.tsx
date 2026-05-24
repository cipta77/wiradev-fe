import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center pt-24 md:pt-32 pb-16 overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #F7F9FC, #F9FAFD, #FBFCFE, #FDFDFE, #FFFFFF)",
      }}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-[1200px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="flex flex-col space-y-6 md:space-y-7 max-w-[550px] text-center lg:text-left items-center lg:items-start mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#066EFF] text-[12px] md:text-sm font-medium w-fit border border-blue-100">
              <span className="w-2 h-2 rounded-full bg-[#066EFF]" />
              #1 Career Readiness Platform for IT Graduates
            </div>

            <h1 className="text-[32px] sm:text-[40px] md:text-[52px] font-extrabold tracking-tight leading-[1.15] md:leading-[1.1]">
              <span className="text-[#0D3E9B]">Stop Applying Blindly.</span>
              <br className="hidden sm:block" />
              <span className="text-[#066EFF]"> Know Where You Stand.</span>
            </h1>

            <p className="text-base md:text-lg text-gray-500 leading-relaxed max-w-[480px]">
              Wirapath analyzes your skills, identifies gaps, and builds your
              career readiness with real projects, AI code review, and industry
              simulations — so you land your first tech job with confidence.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 w-full">
              <Link href="/signup" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-[#066EFF] hover:bg-[#0556cc] h-14 px-8 text-[16px] rounded-[14px] shadow-lg shadow-blue-200 cursor-pointer"
                >
                  Start Free Assessment <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/signin" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full h-14 px-8 text-[16px] rounded-[14px] border-gray-200 hover:bg-gray-50 cursor-pointer"
                >
                  Sign In
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 pt-2 md:pt-4 text-[12px] md:text-[13px]">
              <div className="flex items-center gap-2 text-gray-500 font-medium whitespace-nowrap">
                <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-emerald-500" />
                <span>Free forever</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 font-medium whitespace-nowrap">
                <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-emerald-500" />
                <span>No credit card</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 font-medium whitespace-nowrap">
                <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-emerald-500" />
                <span>5 min setup</span>
              </div>
            </div>
          </div>

          <div className="relative group w-full max-w-[600px] lg:max-w-none mx-auto lg:ml-auto mt-8 lg:mt-0">
            <div className="absolute -inset-1 bg-linear-to-r from-blue-100 to-indigo-100 rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">
              <Image
                src="/assets/images/hero-image.png"
                alt="Wirapath Platform Preview"
                width={700}
                height={500}
                className="w-full h-auto object-cover transform transition duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0D3E9B]/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-4 right-4 md:top-8 md:right-8 bg-white/90 backdrop-blur-md p-3 md:p-4 rounded-xl md:rounded-2xl shadow-xl border border-white/20 animate-in fade-in slide-in-from-right duration-700">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-8 h-8 md:w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <ArrowRight className="h-4 w-4 md:h-5 md:w-5 text-emerald-600 -rotate-45" />
                  </div>
                  <div>
                    <p className="uppercase tracking-wider text-gray-400 text-[9px] md:text-[11px]">
                      Skills Improved
                    </p>
                    <p className="text-[12px] md:text-[14px] font-bold text-emerald-600">
                      +4 this week
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
