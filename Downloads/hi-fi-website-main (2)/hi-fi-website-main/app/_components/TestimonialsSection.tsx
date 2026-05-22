import Image from "next/image";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rina Sari",
    role: "Frontend Developer at Tokopedia",
    quote:
      '"Wirapath showed me I was weak in testing and accessibility. After completing the mini projects, I aced my technical interview. Landed my dream job in 2 months!"',
    avatar: "https://avatar.vercel.sh/rina",
  },
  {
    name: "Bayu Pratama",
    role: "Backend Engineer at Gojek",
    quote:
      '"The career simulation feature is a game-changer. Practicing salary negotiation with AI gave me the confidence to negotiate 30% higher than the initial offer."',
    avatar: "https://avatar.vercel.sh/bayu",
  },
  {
    name: "Dina Wahyuni",
    role: "Fullstack Developer at Bukalapak",
    quote:
      '"I had no idea my GitHub profile was so sparse. Wirapath\'s analysis and guided projects helped me build a portfolio that actually impressed recruiters."',
    avatar: "https://avatar.vercel.sh/dina",
  },
];

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="min-h-screen py-24 flex flex-col items-center justify-center font-poppins"
      style={{ backgroundColor: "#F7F9FC" }}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-[1248px] flex flex-col items-center">
        <div className="flex flex-col items-center text-center space-y-4 mb-14">
          <div className="px-4 py-1.5 rounded-full bg-blue-50 text-[#066EFF] text-[13px] font-medium">
            Testimonials
          </div>

          <h2 className="text-[28px] md:text-[38px] font-extrabold text-[#0D3E9B] font-darker-grotesque leading-[1.15] md:leading-tight">
            Loved by Fresh Graduates
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] pt-4 w-full">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="p-[28px] rounded-[16px] bg-white border border-gray-100 flex flex-col items-start text-left shadow-sm shadow-gray-200/50"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <p className="text-[14px] text-gray-600 font-medium leading-relaxed mb-6">
                {t.quote}
              </p>

              <div className="flex items-center gap-3 mt-auto">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-100">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-gray-900 leading-tight">
                    {t.name}
                  </span>
                  <span className="text-[12px] text-gray-400 font-medium">
                    {t.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
