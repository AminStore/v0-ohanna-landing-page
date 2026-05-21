import { Link } from "wouter";
import { Eye } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const SYMBOLS = [
  { symbol: "𓋹", name: "ANKH", meaning: "Eternal Life & Power", desc: "The Ankh is the ancient Egyptian symbol for life, immortality, and divine power. Carried by pharaohs and gods alike, it represents the key to eternal existence." },
  { symbol: "𓂀", name: "EYE OF HORUS", meaning: "Protection & Royal Power", desc: "Wedjat — the Eye of Horus — is a symbol of protection, royal power, and good health. Our brand's guiding symbol." },
  { symbol: "𓁿", name: "SCARAB", meaning: "Transformation & Rebirth", desc: "The scarab beetle (Khepri) was the god of the rising sun and self-creation. Egyptians carved scarabs into amulets as symbols of regeneration." },
  { symbol: "𓇳", name: "SUN DISC (RA)", meaning: "The Source of All Power", desc: "Ra, the sun god, was the most powerful deity in the Egyptian pantheon. The sun disc represents creation, warmth, and omnipotent power." },
  { symbol: "𓅃", name: "FALCON (HORUS)", meaning: "Kingship & Divine Authority", desc: "The falcon was the manifestation of Horus, god of the sky and kingship. Every Egyptian pharaoh was considered the living Horus." },
  { symbol: "𓊖", name: "CARTOUCHE", meaning: "Identity & Immortality", desc: "A cartouche is an oval enclosure containing a pharaoh's royal name in hieroglyphs. To have your name in a cartouche meant immortality." },
];

const GODS = [
  { name: "HORUS", role: "Sky God & Protector", info: "God of the sky, war, and hunting. Patron of pharaohs. His eye (the Wedjat) is one of the most powerful symbols of protection in history." },
  { name: "RA", role: "Sun God & Creator", info: "The paramount deity of ancient Egypt. Creator of all life and order." },
  { name: "OSIRIS", role: "God of Death & Resurrection", info: "Ruler of the underworld and judge of the dead. His resurrection gave hope to all Egyptians of eternal life beyond death." },
  { name: "ANUBIS", role: "God of Mummification", info: "The jackal-headed guide of souls. He weighed the hearts of the dead against the feather of Ma'at." },
  { name: "THOTH", role: "God of Wisdom & Writing", info: "The ibis-headed god of knowledge, writing, science, and judgment. Inventor of hieroglyphs." },
  { name: "SEKHMET", role: "Goddess of War & Healing", info: "The lion-headed goddess of war and pestilence, but also of healing. She embodied both destruction and protection." },
];

export default function CulturePage() {
  return (
    <div className="min-h-screen bg-[#FDF8EF] flex flex-col">
      <Navbar />

      <section className="py-24 bg-gradient-to-br from-[#1D4D4F] to-[#1B1B1B] text-[#FDF8EF] text-center relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-[#C89D29]/40" />
            <span className="text-4xl text-[#C89D29]">𓋹</span>
            <div className="h-px w-16 bg-[#C89D29]/40" />
          </div>
          <h1 className="text-5xl sm:text-7xl font-black hieroglyph-font hieroglyph-shadow mb-6">
            EGYPTIAN <span className="text-[#C89D29]">CULTURE</span>
          </h1>
          <p className="text-[#FDF8EF]/70 text-lg max-w-2xl mx-auto leading-relaxed">
            5,000 years of civilization. Symbols that outlived empires. Culture that breathes through our designs.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#FDF8EF]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black hieroglyph-font mb-3">THE <span className="text-[#C89D29]">SYMBOLS</span></h2>
            <p className="text-[#1B1B1B]/55 text-sm">Every symbol we wear carries thousands of years of meaning</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {SYMBOLS.map((s, i) => (
              <div key={i} className="ohanna-card p-6 hover:shadow-[6px_6px_0_#C89D29] transition-all">
                <div className="text-5xl text-[#C89D29] mb-4">{s.symbol}</div>
                <div className="font-black hieroglyph-font text-sm tracking-wider mb-1">{s.name}</div>
                <div className="text-xs text-[#C89D29] font-bold mb-3">{s.meaning}</div>
                <p className="text-xs text-[#1B1B1B]/60 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#1B1B1B] text-[#FDF8EF]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black hieroglyph-font mb-3">THE <span className="text-[#C89D29]">GODS</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {GODS.map((g, i) => (
              <div key={i} className="bg-[#FDF8EF]/5 border border-[#FDF8EF]/10 rounded-xl p-5">
                <div className="font-black hieroglyph-font text-[#C89D29] text-sm tracking-widest mb-1">{g.name}</div>
                <div className="text-xs text-[#FDF8EF]/40 font-bold mb-3">{g.role}</div>
                <p className="text-xs text-[#FDF8EF]/60 leading-relaxed">{g.info}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#C89D29]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-black hieroglyph-font text-[#1B1B1B] mb-4">WEAR THE SYMBOLS</h2>
          <Link href="/collection" className="inline-flex items-center gap-2 bg-[#1B1B1B] text-[#FDF8EF] hover:bg-[#FDF8EF] hover:text-[#1B1B1B] px-8 py-3.5 font-black hieroglyph-font text-sm sketchy-button transition-all">
            <Eye className="h-4 w-4" /> SHOP COLLECTION
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
