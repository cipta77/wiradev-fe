import SignInBranding from "./_components/SignInBranding";
import SignInForm from "./_components/SignInForm";

export default function SignPage() {
  return (
    <div className="flex min-h-screen bg-[#F9FAFB] font-poppins">
      <SignInBranding />
      <div className="grow min-h-screen flex flex-col items-center p-6 md:px-12 py-[70px] overflow-y-auto">
        <div className="min-h-full flex flex-col items-center justify-center w-full">
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
