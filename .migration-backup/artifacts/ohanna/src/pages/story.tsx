import { Link } from "wouter";
import { Eye, Crown, Pyramid, Zap, Heart, Users } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const TIMELINE = [
  { year: "3100 BC", title: "The Ancient Inspiration", desc: "Egyptian pharaohs adorned themselves in symbols of power — the Ankh, the Eye of Horus, the Scarab. These weren't just decorations; they were statements of identity and authority." },
  { year: "2021", title: "The Vision", desc: "In the streets of Cairo, two designers looked at ancient temple walls and asked: what if these symbols lived on hoodies, tees, and jackets? The seed of OHANNA was planted." },
  { year: "2022", title: "The Brand", desc: "OHANNA launched its first collection — 6 pieces, all sold out in 48 hours. Cairo's streets confirmed what we believed: people hunger for fashion that honors their heritage." },
  { year: "2023", title: "The Community", desc: "10,000 modern pharaohs joined the movement. OHANNA expanded to 12 core pieces and began shipping across Egypt and the Arab world." },
  { year: "2024+", title: "The Future", desc: "We're building more than a brand — we're building a cultural movement. Ancient power, modern form. The revolution continues." },
];

const VALUES = [
  { icon: Crown, title: "Heritage First", desc: "Every stitch honors thousands of years of Egyptian culture. We never compromise on cultural authenticity." },
  { icon: Pyramid, title: "Built to Last", desc: "Like the pyramids, our garments are engineered for longevity. Premium materials, uncompromising construction." },
  { icon: Zap, title: "Street Rebellion", desc: "We blend ancient authority with modern defiance. Fashion is protest. Wear your roots loud." },
  { icon: Heart, title: "Made with Pride", desc: "Proudly designed in Cairo. We celebrate Egyptian craftsmanship and support local artisans." },
  { icon: Users, title: "For the Culture", desc: "OHANNA is for anyone who carries the fire of Egyptian ancestry in their DNA — wherever they are in the world." },
  { icon: Eye, title: "Always Watching", desc: "Like the Eye of Horus, we guard cultural integrity. No appropriation, only authentic celebration." },
];

export default function StoryPage() {
  return (
    <div className="min-h-screen bg-[#FDF8EF] flex flex-col">
      <Navbar />

      <section className="relative py-24 bg-gradient-to-br from-[#1B1B1B] to-[#2D2D2D] text-[#FDF8EF] overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-[#C89D29]/40" />
            <Eye className="h-8 w-8 text-[#C89D29]" />
            <div className="h-px w-16 bg-[#C89D29]/40" />
          </div>
          <h1 className="text-5xl sm:text-7xl font-black hieroglyph-font hieroglyph-shadow mb-6">
            OUR <span className="text-[#C89D29]">STORY</span>
          </h1>
          <p className="text-[#FDF8EF]/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Born from the cradle of civilization. Built for the streets of today.
            We are OHANNA — where 5,000 years of pharaonic power meets contemporary rebellion.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#FDF8EF]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-black hieroglyph-font">WHERE IT <span className="text-[#C89D29]">BEGAN</span></h2>
              <p className="text-[#1B1B1B]/70 leading-relaxed">
                It started in a Maadi apartment. Two Egyptian designers, surrounded by books on ancient civilization,
                staring at images of pharaohs wrapped in symbolic garments, wondered: why had modern Egyptian fashion
                abandoned its most powerful inheritance?
              </p>
              <p className="text-[#1B1B1B]/70 leading-relaxed">
                Every symbol we use has meaning. Every garment carries history. We're not selling clothes —
                we're distributing cultural armor to a generation that refuses to forget who they are.
              </p>
            </div>
            <div className="relative">
              <div className="sketchy-border-thick p-3 bg-white shadow-[8px_8px_0_rgba(27,27,27,0.15)] rotate-1">
                <img src="/egyptian-streetwear-timeline.png" alt="OHANNA heritage timeline" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#E4D5B7]/40">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black hieroglyph-font mb-3">THE <span className="text-[#C89D29]">TIMELINE</span></h2>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#C89D29]/30" />
            <div className="space-y-10">
              {TIMELINE.map((item, i) => (
                <div key={i} className="flex gap-6 relative">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#C89D29] text-[#1B1B1B] flex items-center justify-center font-black text-xs hieroglyph-font z-10 shadow-md">
                    {i + 1}
                  </div>
                  <div className="ohanna-card p-5 flex-1">
                    <span className="text-[#C89D29] text-xs font-black hieroglyph-font tracking-widest">{item.year}</span>
                    <h3 className="font-black hieroglyph-font text-sm mt-1 mb-2">{item.title}</h3>
                    <p className="text-[#1B1B1B]/60 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#1B1B1B] text-[#FDF8EF]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black hieroglyph-font mb-3">OUR <span className="text-[#C89D29]">VALUES</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {VALUES.map((v, i) => (
              <div key={i} className="bg-[#FDF8EF]/5 border border-[#FDF8EF]/10 rounded-xl p-6 hover:bg-[#FDF8EF]/8 transition-colors group">
                <v.icon className="h-8 w-8 text-[#C89D29] mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-black hieroglyph-font text-sm mb-2">{v.title}</h3>
                <p className="text-[#FDF8EF]/55 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#C89D29]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-black hieroglyph-font text-[#1B1B1B] mb-4">JOIN THE MOVEMENT</h2>
          <Link href="/collection" className="inline-flex items-center gap-2 bg-[#1B1B1B] text-[#FDF8EF] hover:bg-[#FDF8EF] hover:text-[#1B1B1B] px-8 py-3.5 font-black hieroglyph-font text-sm sketchy-button transition-all">
            <Crown className="h-4 w-4" /> SHOP THE COLLECTION
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
