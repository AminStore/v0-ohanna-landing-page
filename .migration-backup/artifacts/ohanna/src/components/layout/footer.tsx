import { Link } from "wouter";
import { Eye, MapPin, Mail, Clock } from "lucide-react";

const COLLECTION_LINKS = [
  { label: "Hoodies", href: "/collection?category=Hoodies" },
  { label: "T-Shirts", href: "/collection?category=T-Shirts" },
  { label: "Jackets", href: "/collection?category=Jackets" },
  { label: "Bottoms", href: "/collection?category=Bottoms" },
  { label: "Accessories", href: "/collection?category=Accessories" },
];

const SUPPORT_LINKS = [
  { label: "Size Guide", href: "/size-guide" },
  { label: "Shipping & Returns", href: "/shipping" },
  { label: "FAQs", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
  { label: "Track Order", href: "/track-order" },
];

const DISCOVER_LINKS = [
  { label: "Our Story", href: "/story" },
  { label: "Egyptian Culture", href: "/culture" },
  { label: "The Collection", href: "/collection" },
  { label: "Community", href: "/community" },
  { label: "Careers", href: "/careers" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1B1B1B] text-[#FDF8EF]">
      <div className="border-b border-[#FDF8EF]/8 py-10">
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <Eye className="h-7 w-7 text-[#C89D29] transition-transform group-hover:scale-110" />
              <span className="text-xl font-black hieroglyph-font text-[#FDF8EF]">OHANNA</span>
            </Link>
            <p className="text-[#FDF8EF]/55 text-sm leading-relaxed">
              Egypt's premier streetwear brand. Where 5,000 years of pharaonic heritage meets modern street rebellion. Premium Egyptian apparel, crafted for the culture.
            </p>
            <div className="space-y-2 text-xs text-[#FDF8EF]/40">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-[#C89D29] shrink-0" />
                <span>Maadi, Cairo, Egypt</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-[#C89D29] shrink-0" />
                <a href="mailto:info@ohanna.store" className="hover:text-[#C89D29] transition-colors">
                  info@ohanna.store
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-[#C89D29] shrink-0" />
                <span>Sun–Thu 10am–8pm EET</span>
              </div>
            </div>
            <div className="flex gap-3 pt-1">
              {["𓂀", "𓅃", "𓋹", "𓊖"].map((g, i) => (
                <span key={i} className="text-[#C89D29]/50 text-lg hover:text-[#C89D29] transition-colors cursor-default select-none">
                  {g}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="hieroglyph-font text-xs text-[#C89D29] mb-5 tracking-widest">COLLECTION</h4>
            <ul className="space-y-3">
              {COLLECTION_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-[#FDF8EF]/55 hover:text-[#C89D29] transition-colors text-sm flex items-center gap-1.5 group">
                    <span className="w-1 h-1 rounded-full bg-[#C89D29]/30 group-hover:bg-[#C89D29] transition-colors" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="hieroglyph-font text-xs text-[#C89D29] mb-5 tracking-widest">SUPPORT</h4>
            <ul className="space-y-3">
              {SUPPORT_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-[#FDF8EF]/55 hover:text-[#C89D29] transition-colors text-sm flex items-center gap-1.5 group">
                    <span className="w-1 h-1 rounded-full bg-[#C89D29]/30 group-hover:bg-[#C89D29] transition-colors" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="hieroglyph-font text-xs text-[#C89D29] mb-5 tracking-widest">DISCOVER</h4>
            <ul className="space-y-3">
              {DISCOVER_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-[#FDF8EF]/55 hover:text-[#C89D29] transition-colors text-sm flex items-center gap-1.5 group">
                    <span className="w-1 h-1 rounded-full bg-[#C89D29]/30 group-hover:bg-[#C89D29] transition-colors" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="py-6">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#FDF8EF]/30 text-xs text-center sm:text-left">
            © {year} OHANNA Egyptian Streetwear. All rights reserved. Ancient heritage, modern rebellion.
          </p>
          <p className="text-[#FDF8EF]/20 text-xs text-center">
            Egyptian Pound (EGP) · Secure payments · Made in Egypt 🇪🇬
          </p>
        </div>
      </div>
    </footer>
  );
}
