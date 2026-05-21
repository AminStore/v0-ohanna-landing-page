import { useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import {
  ShoppingBag, Eye, Crown, Pyramid, Zap, Users, Star, ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/product/product-card";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { PRODUCTS, fmt, BADGE_STYLES } from "@/lib/products-data";

const FEATURED = PRODUCTS.filter((p) =>
  ["BESTSELLER", "NEW", "LIMITED"].includes(p.badge),
).slice(0, 3);

const TESTIMONIALS = [
  { name: "MAYA K.", location: "Cairo", quote: "Ohanna makes me feel like a modern Cleopatra ruling the streets!", rating: 5 },
  { name: "ARJUN S.", location: "Alexandria", quote: "The Horus hoodie is pure fire. Ancient power meets street credibility.", rating: 5 },
  { name: "PRIYA M.", location: "Luxor", quote: "Finally, fashion that represents my heritage with modern attitude.", rating: 5 },
  { name: "ROHIT T.", location: "Giza", quote: "Wearing Ohanna is like carrying the power of pharaohs in my DNA.", rating: 5 },
  { name: "KAVYA R.", location: "Aswan", quote: "The quality and cultural depth of Ohanna is unmatched.", rating: 5 },
  { name: "SARA M.", location: "Hurghada", quote: "Ancient symbols, modern rebellion. This is my uniform.", rating: 5 },
];

const STATS = [
  { value: "10K+", label: "MODERN PHARAOHS" },
  { value: "5000+", label: "YEARS OF HERITAGE" },
  { value: "12+", label: "SACRED PIECES" },
  { value: "4.9★", label: "COMMUNITY RATING" },
];

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  const handleHeroShop = () => {
    toast.success("Entering the sacred collection... 𓋹");
  };

  return (
    <div className="min-h-screen bg-[#FDF8EF] text-[#1B1B1B] overflow-x-hidden">
      <Navbar />

      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-[#E4D5B7] to-[#FDF8EF] overflow-hidden">
        {["𓂀", "𓅃", "𓋹", "𓊖", "𓏃", "𓁿"].map((g, i) => (
          <motion.div
            key={i}
            className="absolute text-[#C89D29]/15 select-none pointer-events-none"
            style={{
              fontSize: `${2 + (i % 3)}rem`,
              top: `${10 + i * 15}%`,
              left: i % 2 === 0 ? `${5 + i * 8}%` : undefined,
              right: i % 2 !== 0 ? `${5 + i * 6}%` : undefined,
            }}
            animate={{ y: [-8, 8, -8], rotate: [-2, 2, -2] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
          >
            {g}
          </motion.div>
        ))}

        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="bg-[#C89D29] text-[#1B1B1B] sketchy-border text-sm px-4 py-2 mb-4">
                ANCIENT POWER
              </Badge>
              <h1 className="text-5xl md:text-7xl font-black leading-tight hieroglyph-font hieroglyph-shadow">
                REVIVING
                <br />
                <motion.span
                  className="text-[#C89D29] inline-block"
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  ROOTS
                </motion.span>
                <br />
                IN STYLE
              </h1>
              <p className="text-lg text-[#1B1B1B]/70 max-w-lg leading-relaxed mt-4">
                Where pharaonic heritage meets street rebellion. Ohanna brings
                5000 years of ancient Egyptian power to modern urban fashion.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/collection" onClick={handleHeroShop}>
                <Button
                  size="lg"
                  className="bg-[#1B1B1B] text-[#FDF8EF] hover:bg-[#C89D29] hover:text-[#1B1B1B] sketchy-button text-base px-8 py-4 font-black"
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  SHOP THE CULTURE
                </Button>
              </Link>
              <Link href="/story">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-[#1B1B1B] text-[#1B1B1B] hover:bg-[#1B1B1B] hover:text-[#FDF8EF] sketchy-button text-base px-8 py-4 font-black bg-transparent"
                >
                  DISCOVER STORY
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-6 flex-wrap pt-2"
            >
              {STATS.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-xl font-black text-[#C89D29]">{s.value}</div>
                  <div className="text-[10px] text-[#1B1B1B]/50 font-bold tracking-wider hieroglyph-font">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative hidden lg:block"
          >
            <div className="sketchy-border-thick bg-[#FDF8EF] p-4 transform rotate-1 shadow-[8px_8px_0_#1B1B1B]">
              <img
                src="/streetwear-egyptian-sketch.png"
                alt="OHANNA — Modern pharaoh streetwear"
                className="w-full h-auto sketchy-border"
              />
            </div>
            <motion.div
              animate={{ rotate: ["-12deg", "-8deg", "-12deg"] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-[#C89D29] text-[#1B1B1B] p-3 sketchy-border"
            >
              <Crown className="h-8 w-8" />
            </motion.div>
            <motion.div
              animate={{ rotate: ["12deg", "16deg", "12deg"] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-4 -left-4 bg-[#AE1C1C] text-[#FDF8EF] p-3 sketchy-border"
            >
              <span className="text-2xl">𓋹</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[#FDF8EF] relative overflow-hidden">
        <div className="container mx-auto px-4">
          <FadeUp className="text-center mb-14">
            <div className="flex items-center justify-center mb-4 gap-4">
              <div className="h-1 w-14 bg-[#C89D29] sketchy-line" />
              <Eye className="h-8 w-8 text-[#C89D29]" />
              <div className="h-1 w-14 bg-[#C89D29] sketchy-line" />
            </div>
            <h2 className="text-4xl md:text-6xl font-black hieroglyph-font mb-3">SACRED STREETWEAR</h2>
            <p className="text-[#1B1B1B]/60 max-w-xl mx-auto">
              Each piece carries the power of ancient symbols into modern rebellion
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {FEATURED.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <FadeUp className="text-center">
            <Link href="/collection">
              <Button
                size="lg"
                className="bg-[#1B1B1B] text-[#FDF8EF] hover:bg-[#C89D29] hover:text-[#1B1B1B] sketchy-button font-black px-10"
              >
                VIEW FULL COLLECTION
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </FadeUp>
        </div>
      </section>

      <section className="py-20 bg-[#E4D5B7] relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <Badge className="bg-[#1B1B1B] text-[#FDF8EF] sketchy-border text-sm px-4 py-2 mb-4">
                THE OHANNA LEGACY
              </Badge>
              <h2 className="text-4xl md:text-6xl font-black hieroglyph-font mb-6">
                FROM ANCIENT
                <br />
                <span className="text-[#C89D29]">TEMPLES</span>
                <br />
                TO STREET
              </h2>
              <p className="text-[#1B1B1B]/75 leading-relaxed mb-6">
                Born from the fusion of 5000-year-old Egyptian heritage and contemporary urban
                culture, Ohanna represents the eternal power of ancient symbols in modern form.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center sketchy-border bg-[#FDF8EF] p-4">
                  <Pyramid className="h-7 w-7 text-[#C89D29] mx-auto mb-2" />
                  <div className="font-black hieroglyph-font text-sm">HERITAGE</div>
                  <div className="text-xs text-[#1B1B1B]/50">Ancient Roots</div>
                </div>
                <div className="text-center sketchy-border bg-[#FDF8EF] p-4">
                  <Zap className="h-7 w-7 text-[#C89D29] mx-auto mb-2" />
                  <div className="font-black hieroglyph-font text-sm">REBELLION</div>
                  <div className="text-xs text-[#1B1B1B]/50">Modern Edge</div>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.15} className="relative hidden lg:block">
              <div className="sketchy-border-thick bg-[#FDF8EF] p-4 transform -rotate-2 shadow-[8px_8px_0_rgba(27,27,27,0.2)]">
                <img
                  src="/egyptian-streetwear-timeline.png"
                  alt="OHANNA heritage timeline"
                  className="w-full h-auto sketchy-border"
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#1B1B1B] text-[#FDF8EF] relative overflow-hidden">
        <motion.div className="absolute top-10 left-10 text-8xl text-[#C89D29]/10 select-none" animate={{ rotate: [0, 5, 0] }} transition={{ duration: 8, repeat: Infinity }}>𓂀</motion.div>
        <motion.div className="absolute bottom-10 right-10 text-7xl text-[#C89D29]/10 select-none" animate={{ rotate: [0, -5, 0] }} transition={{ duration: 10, repeat: Infinity }}>𓅃</motion.div>

        <div className="container mx-auto px-4">
          <FadeUp className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-black hieroglyph-font mb-3">
              MODERN PHARAOHS<br /><span className="text-[#C89D29]">OF THE STREET</span>
            </h2>
          </FadeUp>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <FadeUp key={i} delay={i * 0.07}>
                <div className="bg-[#FDF8EF] text-[#1B1B1B] border-2 border-[#FDF8EF]/30 p-5 h-full">
                  <div className="flex text-[#C89D29] mb-3">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-[#1B1B1B]/75 italic mb-4 leading-relaxed">"{t.quote}"</p>
                  <div>
                    <p className="font-black hieroglyph-font text-xs">{t.name}</p>
                    <p className="text-xs text-[#1B1B1B]/40">{t.location}, Egypt</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-[#C89D29] to-[#E4D5B7] relative overflow-hidden">
        <div className="container mx-auto px-4">
          <FadeUp className="text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-6xl font-black hieroglyph-font text-[#1B1B1B]">
              CLAIM YOUR<br /><span className="text-[#FDF8EF]">PHARAOH STATUS</span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/collection">
                <Button size="lg" className="bg-[#1B1B1B] text-[#FDF8EF] hover:bg-[#FDF8EF] hover:text-[#1B1B1B] sketchy-button font-black px-10 py-5 text-base">
                  <Crown className="h-5 w-5 mr-2" />
                  SHOP COLLECTION
                </Button>
              </Link>
              <Link href="/culture">
                <Button variant="outline" size="lg" className="border-2 border-[#1B1B1B] text-[#1B1B1B] hover:bg-[#1B1B1B] hover:text-[#FDF8EF] sketchy-button font-black px-10 py-5 text-base bg-transparent">
                  <Users className="h-5 w-5 mr-2" />
                  JOIN COMMUNITY
                </Button>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
