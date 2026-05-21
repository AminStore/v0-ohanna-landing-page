import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Truck, RotateCcw, Shield, Clock } from "lucide-react";

const EGYPT_ZONES = [
  { zone: "Cairo & Giza", time: "2–3 business days", cost: "EGP 50", express: "Same-day available" },
  { zone: "Alexandria", time: "3–4 business days", cost: "EGP 60", express: "Next-day available" },
  { zone: "Nile Delta", time: "3–5 business days", cost: "EGP 65", express: "2-day available" },
  { zone: "Upper Egypt", time: "4–6 business days", cost: "EGP 75", express: "—" },
  { zone: "North Coast & Red Sea", time: "4–6 business days", cost: "EGP 75", express: "—" },
  { zone: "Sinai", time: "5–7 business days", cost: "EGP 85", express: "—" },
];

const INTERNATIONAL_ZONES = [
  { zone: "Saudi Arabia", time: "7–10 business days", cost: "EGP 350" },
  { zone: "UAE", time: "7–10 business days", cost: "EGP 380" },
  { zone: "Kuwait", time: "8–12 business days", cost: "EGP 390" },
  { zone: "Qatar & Bahrain", time: "8–12 business days", cost: "EGP 390" },
  { zone: "Jordan & Lebanon", time: "9–14 business days", cost: "EGP 420" },
];

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-[#FDF8EF] flex flex-col">
      <Navbar />

      <section className="py-16 bg-gradient-to-b from-[#E4D5B7]/60 to-[#FDF8EF]">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-6xl font-black hieroglyph-font mb-4">
            SHIPPING & <span className="text-[#C89D29]">RETURNS</span>
          </h1>
        </div>
      </section>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl space-y-12">
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: Truck, title: "FREE SHIPPING", desc: "On orders over EGP 1,500" },
              { icon: RotateCcw, title: "14-DAY RETURNS", desc: "Hassle-free returns" },
              { icon: Shield, title: "SECURE PAYMENTS", desc: "Stripe-protected checkout" },
            ].map((item, i) => (
              <div key={i} className="ohanna-card p-5 text-center">
                <item.icon className="h-8 w-8 text-[#C89D29] mx-auto mb-3" />
                <p className="font-black hieroglyph-font text-sm mb-1">{item.title}</p>
                <p className="text-xs text-[#1B1B1B]/50">{item.desc}</p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-2xl font-black hieroglyph-font mb-4">EGYPT DELIVERY <span className="text-[#C89D29]">RATES</span></h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#1B1B1B] text-[#FDF8EF]">
                    <th className="text-left p-3 font-black hieroglyph-font text-xs tracking-wider">ZONE</th>
                    <th className="text-left p-3 font-black hieroglyph-font text-xs tracking-wider">TIME</th>
                    <th className="text-left p-3 font-black hieroglyph-font text-xs tracking-wider">COST</th>
                    <th className="text-left p-3 font-black hieroglyph-font text-xs tracking-wider">EXPRESS</th>
                  </tr>
                </thead>
                <tbody>
                  {EGYPT_ZONES.map((z, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#FDF8EF]"}>
                      <td className="p-3 font-medium">{z.zone}</td>
                      <td className="p-3 text-[#1B1B1B]/70">{z.time}</td>
                      <td className="p-3 font-bold text-[#C89D29]">{z.cost}</td>
                      <td className="p-3 text-[#1B1B1B]/50 text-xs">{z.express}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black hieroglyph-font mb-4">INTERNATIONAL <span className="text-[#C89D29]">SHIPPING</span></h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#1B1B1B] text-[#FDF8EF]">
                    <th className="text-left p-3 font-black hieroglyph-font text-xs tracking-wider">DESTINATION</th>
                    <th className="text-left p-3 font-black hieroglyph-font text-xs tracking-wider">TIME</th>
                    <th className="text-left p-3 font-black hieroglyph-font text-xs tracking-wider">COST</th>
                  </tr>
                </thead>
                <tbody>
                  {INTERNATIONAL_ZONES.map((z, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#FDF8EF]"}>
                      <td className="p-3 font-medium">{z.zone}</td>
                      <td className="p-3 text-[#1B1B1B]/70">{z.time}</td>
                      <td className="p-3 font-bold text-[#C89D29]">{z.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="ohanna-card p-6">
            <h2 className="text-xl font-black hieroglyph-font mb-4">RETURN <span className="text-[#C89D29]">POLICY</span></h2>
            <div className="space-y-3 text-sm text-[#1B1B1B]/70 leading-relaxed">
              <p>We accept returns within <strong>14 days</strong> of delivery for unworn, unwashed items with original tags attached.</p>
              <p>To initiate a return, email <strong>returns@ohanna.store</strong> with your order ID and reason for return.</p>
              <p>Once we receive and inspect your return, we'll process a full refund within 5–7 business days.</p>
              <p>Sale items and custom pieces are final sale.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
