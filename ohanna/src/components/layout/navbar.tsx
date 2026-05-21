import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";

const LINKS = [
  { href: "/collection", label: "COLLECTION" },
  { href: "/story", label: "STORY" },
  { href: "/culture", label: "CULTURE" },
  { href: "/contact", label: "CONTACT" },
];

export default function Navbar() {
  const [location] = useLocation();
  const { itemCount, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <nav
        className={`sticky top-0 z-40 border-b-4 border-[#1B1B1B] bg-[#FDF8EF] transition-shadow duration-300 ${
          scrolled ? "shadow-[0_4px_0_#1B1B1B]" : ""
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2 group">
            <Eye className="h-7 w-7 text-[#C89D29] transition-transform group-hover:scale-110" />
            <span className="text-xl font-black hieroglyph-font tracking-widest">OHANNA</span>
          </Link>

          <div className="hidden md:flex items-center gap-7">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-bold hieroglyph-font tracking-wider transition-colors hover:text-[#C89D29] relative after:absolute after:bottom-[-2px] after:left-0 after:h-[3px] after:bg-[#C89D29] after:transition-all after:duration-200 ${
                  location === l.href
                    ? "text-[#C89D29] after:w-full"
                    : "after:w-0 hover:after:w-full"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={openCart}
              className="relative p-2 hover:text-[#C89D29] transition-colors"
              aria-label={`Cart (${itemCount} items)`}
            >
              <ShoppingBag className="h-6 w-6" />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-[#C89D29] text-[#1B1B1B] text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full"
                  >
                    {itemCount > 99 ? "99+" : itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <Link href="/collection">
              <Button className="hidden md:flex bg-[#1B1B1B] text-[#FDF8EF] hover:bg-[#C89D29] hover:text-[#1B1B1B] sketchy-button text-xs font-black px-5">
                SHOP NOW
              </Button>
            </Link>

            <button
              className="md:hidden p-1"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden sticky top-[61px] z-30 bg-[#FDF8EF] border-b-4 border-[#1B1B1B] overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`text-sm font-black hieroglyph-font tracking-wider py-2 border-b border-[#1B1B1B]/15 transition-colors hover:text-[#C89D29] ${
                    location === l.href ? "text-[#C89D29]" : ""
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <Link href="/collection">
                <Button className="w-full bg-[#1B1B1B] text-[#FDF8EF] hover:bg-[#C89D29] hover:text-[#1B1B1B] sketchy-button font-black">
                  SHOP THE COLLECTION
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
