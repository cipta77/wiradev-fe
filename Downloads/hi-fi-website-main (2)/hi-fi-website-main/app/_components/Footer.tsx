import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="w-full flex flex-col items-center font-poppins pt-20 pb-12"
      style={{
        backgroundColor: "#FAFBFC",
        borderTop: "0.8px solid #E8ECF0",
      }}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-[1248px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          <div className="lg:col-span-2 flex flex-col space-y-6 max-w-[320px]">
            <Link href="/" className="flex items-center -mt-2">
              <Image
                src="/assets/images/logo.png"
                alt="Wirapath Logo"
                width={120}
                height={32}
                className="w-auto object-contain"
              />
            </Link>
            <p className="text-[13px] text-gray-500 leading-relaxed font-medium">
              The career readiness platform built for IT fresh graduates. Know
              your gaps, build your skills, land your dream job.
            </p>
          </div>

          <div className="flex flex-col space-y-5">
            <h4 className="text-[13px] font-poppins font-bold text-gray-900">
              Platform
            </h4>
            <div className="flex flex-col space-y-4">
              <Link
                href="#"
                className="text-[13px] text-gray-400 hover:text-[#066EFF] transition-colors font-medium"
              >
                Readiness Assessment
              </Link>
              <Link
                href="#"
                className="text-[13px] text-gray-400 hover:text-[#066EFF] transition-colors font-medium"
              >
                Skill Mapping
              </Link>
              <Link
                href="#"
                className="text-[13px] text-gray-400 hover:text-[#066EFF] transition-colors font-medium"
              >
                Mini Projects
              </Link>
              <Link
                href="#"
                className="text-[13px] text-gray-400 hover:text-[#066EFF] transition-colors font-medium"
              >
                AI Code Review
              </Link>
            </div>
          </div>

          <div className="flex flex-col space-y-5">
            <h4 className="text-[13px] font-poppins font-bold text-gray-900">
              Resources
            </h4>
            <div className="flex flex-col space-y-4">
              <Link
                href="#"
                className="text-[13px] text-gray-400 hover:text-[#066EFF] transition-colors font-medium"
              >
                Career Guide
              </Link>
              <Link
                href="#"
                className="text-[13px] text-gray-400 hover:text-[#066EFF] transition-colors font-medium"
              >
                Blog
              </Link>
              <Link
                href="#"
                className="text-[13px] text-gray-400 hover:text-[#066EFF] transition-colors font-medium"
              >
                Documentation
              </Link>
              <Link
                href="#"
                className="text-[13px] text-gray-400 hover:text-[#066EFF] transition-colors font-medium"
              >
                Help Center
              </Link>
            </div>
          </div>

          <div className="flex flex-col space-y-5">
            <h4 className="text-[13px] font-poppins font-bold text-gray-900">
              Company
            </h4>
            <div className="flex flex-col space-y-4">
              <Link
                href="#"
                className="text-[13px] text-gray-400 hover:text-[#066EFF] transition-colors font-medium"
              >
                About Us
              </Link>
              <Link
                href="#"
                className="text-[13px] text-gray-400 hover:text-[#066EFF] transition-colors font-medium"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-[13px] text-gray-400 hover:text-[#066EFF] transition-colors font-medium"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-[13px] text-gray-400 hover:text-[#066EFF] transition-colors font-medium"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[13px] text-gray-400 font-medium">
            © 2026 Wirapath. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-[13px] text-gray-400 hover:text-gray-600 transition-colors font-medium"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-[13px] text-gray-400 hover:text-gray-600 transition-colors font-medium"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-[13px] text-gray-400 hover:text-gray-600 transition-colors font-medium"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
