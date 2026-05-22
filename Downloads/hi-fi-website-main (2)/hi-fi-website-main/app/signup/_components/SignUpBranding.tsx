import Image from "next/image";
import Link from "next/link";

export default function SignUpBranding() {
  const blueGradient =
    "linear-gradient(to bottom, #066EFF, #076AF8, #0867F0, #0963E9, #0A60E2, #0B5CDA, #0C59D3, #0C55CC, #0C52C5, #0D4FBE, #0D4BB7, #0D48B0, #0D45A9, #0D41A2, #0D3E9B)";

  return (
    <div
      className="hidden lg:flex w-[40%] flex-col items-center justify-center p-12 text-white relative overflow-hidden"
      style={{ background: blueGradient }}
    >
      <div className="relative z-10 flex flex-col items-center text-center max-w-[340px]">
        <Link href="/" className="mb-12">
          <Image
            src="/assets/images/logo.png"
            alt="Wirapath Logo"
            width={160}
            height={42}
            className="brightness-0 invert object-contain"
          />
        </Link>

        <h1 className="text-[28px] font-bold mb-4">Start Your Journey</h1>
        <p className="text-[15px] opacity-80 leading-relaxed">
          Join thousands of IT graduates who are closing their skill gaps and
          landing their dream jobs.
        </p>
      </div>

      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -ml-32 -mb-32" />
    </div>
  );
}
