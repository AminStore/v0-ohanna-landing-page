import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Users, Star } from "lucide-react";
import { Link } from "wouter";

const TESTIMONIALS = [
  { name: "MAYA K.", location: "Zamalek, Cairo", quote: "OHANNA gave me a way to wear my Egyptian identity with pride. The Horus Hoodie is my signature piece everywhere I go.", rating: 5 },
  { name: "OMAR B.", location: "Alexandria", quote: "Finally, a brand that understands Egyptian culture on a deep level. I've learned so much about my heritage through the designs.", rating: 5 },
  { name: "SARA M.", location: "New Cairo", quote: "The quality is insane for the price. I've washed my Ankh Tee 30 times and it still looks brand new.", rating: 5 },
  { name: "HASSAN R.", location: "Heliopolis, Cairo", quote: "Wearing OHANNA abroad always sparks conversations about Egypt. It's become my ambassador piece when I travel.", rating: 5 },
  { name: "LAYLA A.", location: "Maadi, Cairo", quote: "The Nefertiti Hoodie was a birthday gift from my partner and it's my most-worn piece.", rating: 5 },
  { name: "KAREEM S.", location: "Giza", quote: "I've been waiting for an Egyptian streetwear brand this authentic my whole life. OHANNA bridges a gap that needed bridging.", rating: 5 },
];

const STATS = [
  { value: "10K+", label: "Modern Pharaohs" },
  { value: "50K+", label: "Instagram Followers" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "30+", label: "Cities Reached" },
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-[#FDF8EF] flex flex-col">
      <Navbar />

      <section className="py-20 bg-gradient-to-br from-[#1B1B1B] to-[#2D2D2D] text-[#FDF8EF] text-center">
        <div className="container mx-auto px-4">
          <Users className="h-12 w-12 text-[#C89D29] mx-auto mb-6" />
          <h1 className="text-5xl sm:text-7xl font-black hieroglyph-font mb-6">
            THE <span className="text-[#C89D29]">MOVEMENT</span>
          </h1>
          <p className="text-[#FDF8EF]/70 text-lg max-w-2xl mx-auto leading-relaxed">
            10,000+ modern pharaohs across Egypt and beyond. This is more than a brand — it's a cultural revolution.
          </p>
        </div>
      </section>

      <section className="py-12 bg-[#C89D29]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {STATS.map((s, i) => (
              <div key={i}>
                <div className="text-3xl font-black hieroglyph-font text-[#1B1B1B]">{s.value}</div>
                <div className="text-[#1B1B1B]/60 text-sm font-semibold mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#FDF8EF]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-black hieroglyph-font text-center mb-12">
            WHAT OUR <span className="text-[#C89D29]">PHARAOHS SAY</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="ohanna-card p-5 h-full">
                <div className="flex text-[#C89D29] mb-3">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-[#1B1B1B]/75 italic mb-4 leading-relaxed">"{t.quote}"</p>
                <div>
                  <p className="font-black hieroglyph-font text-xs">{t.name}</p>
                  <p className="text-xs text-[#1B1B1B]/40">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#1B1B1B]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-black hieroglyph-font text-[#FDF8EF] mb-4">JOIN THE MOVEMENT</h2>
          <p className="text-[#FDF8EF]/55 mb-8 max-w-md mx-auto text-sm">Wear your heritage. Carry the power of pharaohs.</p>
          <Link href="/collection" className="inline-flex items-center gap-2 bg-[#C89D29] text-[#1B1B1B] hover:bg-[#FDF8EF] px-8 py-3.5 font-black hieroglyph-font text-sm sketchy-button transition-all">
            <Users className="h-4 w-4" /> SHOP COLLECTION
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
