import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const FAQ_ITEMS = [
  { q: "How long does delivery take within Egypt?", a: "Standard delivery within Egypt takes 3–5 business days. Cairo and Giza orders often arrive in 2–3 business days." },
  { q: "Do you ship internationally?", a: "Yes! We ship to Saudi Arabia, UAE, Kuwait, Qatar, and other Arab countries. International orders take 7–14 business days." },
  { q: "What is your return policy?", a: "We accept returns within 14 days of delivery for unworn, unwashed items with original tags attached." },
  { q: "How do I find my size?", a: "We recommend checking our Size Guide for detailed measurements. OHANNA pieces run true to size." },
  { q: "Are your products made in Egypt?", a: "Absolutely. OHANNA is proudly Egyptian — designed in Cairo, manufactured with Egyptian cotton and premium fabrics." },
  { q: "How can I track my order?", a: "Use our Track Order page with your order ID and email address to get real-time updates." },
];

function FAQItem({ item }: { item: typeof FAQ_ITEMS[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#1B1B1B]/8 last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full text-left py-5 flex items-center justify-between gap-4 hover:text-[#C89D29] transition-colors group" aria-expanded={open}>
        <span className="font-semibold text-sm leading-snug">{item.q}</span>
        {open ? <ChevronUp className="h-4 w-4 shrink-0 text-[#C89D29]" /> : <ChevronDown className="h-4 w-4 shrink-0 text-[#1B1B1B]/40 group-hover:text-[#C89D29] transition-colors" />}
      </button>
      {open && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="pb-5 text-sm text-[#1B1B1B]/65 leading-relaxed overflow-hidden">
          {item.a}
        </motion.div>
      )}
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch(`${basePath}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSent(true);
        toast.success("Message sent! We'll get back to you within 24 hours. 𓋹");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Failed");
      }
    } catch {
      toast.error("Couldn't send message. Please email us directly at info@ohanna.store");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF8EF] flex flex-col">
      <Navbar />

      <section className="py-16 bg-gradient-to-b from-[#E4D5B7]/60 to-[#FDF8EF]">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-6xl font-black hieroglyph-font mb-4">
            GET IN <span className="text-[#C89D29]">TOUCH</span>
          </h1>
          <p className="text-[#1B1B1B]/55 max-w-md mx-auto text-sm">
            We'd love to hear from you. Reach out with any questions, feedback, or just to say hello.
          </p>
        </div>
      </section>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-2xl font-black hieroglyph-font mb-6">SEND A MESSAGE</h2>
              {sent ? (
                <div className="ohanna-card p-8 text-center">
                  <span className="text-5xl block mb-4 text-[#C89D29]">𓋹</span>
                  <h3 className="font-black hieroglyph-font text-lg mb-2">MESSAGE RECEIVED!</h3>
                  <p className="text-sm text-[#1B1B1B]/55">We'll reply within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { key: "name", label: "FULL NAME *", type: "text", placeholder: "Your name" },
                    { key: "email", label: "EMAIL *", type: "email", placeholder: "your@email.com" },
                    { key: "subject", label: "SUBJECT", type: "text", placeholder: "What's this about?" },
                  ].map((f) => (
                    <div key={f.key}>
                      <label className="block text-xs font-black hieroglyph-font text-[#1B1B1B]/60 mb-1.5 tracking-wider">{f.label}</label>
                      <input
                        type={f.type}
                        value={(form as any)[f.key]}
                        onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                        placeholder={f.placeholder}
                        className="w-full border-2 border-[#1B1B1B]/12 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#C89D29] transition-colors"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-black hieroglyph-font text-[#1B1B1B]/60 mb-1.5 tracking-wider">MESSAGE *</label>
                    <textarea
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us what's on your mind..."
                      rows={5}
                      className="w-full border-2 border-[#1B1B1B]/12 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#C89D29] transition-colors resize-none"
                    />
                  </div>
                  <button type="submit" disabled={sending}
                    className="w-full bg-[#1B1B1B] text-[#FDF8EF] hover:bg-[#C89D29] hover:text-[#1B1B1B] py-3 font-black hieroglyph-font text-sm sketchy-button transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                    <Send className="h-4 w-4" />
                    {sending ? "SENDING..." : "SEND MESSAGE"}
                  </button>
                </form>
              )}
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-black hieroglyph-font mb-6">CONTACT INFO</h2>
              {[
                { icon: MapPin, label: "ADDRESS", value: "Maadi, Cairo, Egypt" },
                { icon: Mail, label: "EMAIL", value: "info@ohanna.store" },
                { icon: Clock, label: "HOURS", value: "Sun–Thu 10am–8pm EET" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#C89D29]/15 rounded-lg flex items-center justify-center shrink-0">
                    <item.icon className="h-5 w-5 text-[#C89D29]" />
                  </div>
                  <div>
                    <p className="text-xs font-black hieroglyph-font text-[#1B1B1B]/50 tracking-widest mb-1">{item.label}</p>
                    <p className="text-sm font-semibold">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black hieroglyph-font mb-8">FREQUENTLY ASKED <span className="text-[#C89D29]">QUESTIONS</span></h2>
            <div className="ohanna-card p-6 divide-y divide-[#1B1B1B]/8">
              {FAQ_ITEMS.map((item, i) => (
                <FAQItem key={i} item={item} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
