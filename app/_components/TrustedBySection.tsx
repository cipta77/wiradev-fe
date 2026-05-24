export default function TrustedBySection() {
  return (
    <section
      className="py-10 w-full border-y-[0.8px] bg-[#FAFBFC] flex flex-col items-center justify-center gap-6"
      style={{ borderColor: "#E8ECF099" }}
    >
      <p className="px-4 text-center font-poppins text-[11px] md:text-[13px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
        Trusted by graduates from top universities
      </p>
      <div className="container mx-auto max-w-[1200px] px-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-6 md:gap-x-20">
        <span className="font-darker-grotesque text-[14px] md:text-[15px] font-bold text-gray-400 whitespace-nowrap">
          Universitas Indonesia
        </span>
        <span className="font-darker-grotesque text-[14px] md:text-[15px] font-bold text-gray-400 whitespace-nowrap">
          ITB
        </span>
        <span className="font-darker-grotesque text-[14px] md:text-[15px] font-bold text-gray-400 whitespace-nowrap">
          Binus University
        </span>
        <span className="font-darker-grotesque text-[14px] md:text-[15px] font-bold text-gray-400 whitespace-nowrap">
          UGM
        </span>
        <span className="font-darker-grotesque text-[14px] md:text-[15px] font-bold text-gray-400 whitespace-nowrap">
          ITS Surabaya
        </span>
      </div>
    </section>
  );
}
