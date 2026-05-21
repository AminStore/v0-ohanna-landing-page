import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ShoppingBag, Package } from "lucide-react";
import { Link, useSearch } from "wouter";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { useCart } from "@/contexts/cart-context";

export default function CheckoutSuccessPage() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const orderId = params.get("order_id") ?? params.get("session_id") ?? `OHN-${Date.now()}`;
  const total = params.get("total");
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-[#FDF8EF] flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          className="text-center max-w-md w-full"
        >
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 250 }} className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-full bg-[#C89D29] flex items-center justify-center shadow-lg">
              <CheckCircle2 className="h-12 w-12 text-[#1B1B1B]" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="space-y-5">
            <div>
              <div className="text-4xl text-[#C89D29]/50 mb-3 select-none">𓋹</div>
              <h1 className="text-3xl font-black hieroglyph-font mb-2">ORDER CONFIRMED!</h1>
              <p className="text-[#1B1B1B]/55 text-sm leading-relaxed">
                Your sacred streetwear is being prepared. The pharaohs approve your choice.
              </p>
            </div>

            <div className="ohanna-card p-5 text-left space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-black hieroglyph-font text-xs tracking-wider text-[#1B1B1B]/50">ORDER ID</span>
                <span className="font-bold text-[#C89D29] text-sm">{orderId.toString().slice(0, 22)}</span>
              </div>
              {total && (
                <div className="flex justify-between items-center border-t border-[#1B1B1B]/6 pt-3">
                  <span className="font-black hieroglyph-font text-xs tracking-wider text-[#1B1B1B]/50">TOTAL PAID</span>
                  <span className="font-bold text-sm">EGP {parseInt(total).toLocaleString("en-EG")}</span>
                </div>
              )}
              <div className="flex justify-between items-center border-t border-[#1B1B1B]/6 pt-3">
                <span className="font-black hieroglyph-font text-xs tracking-wider text-[#1B1B1B]/50">STATUS</span>
                <span className="text-[#1D4D4F] font-black text-xs">✓ CONFIRMED</span>
              </div>
              <div className="flex justify-between items-center border-t border-[#1B1B1B]/6 pt-3">
                <span className="font-black hieroglyph-font text-xs tracking-wider text-[#1B1B1B]/50">EST. DELIVERY</span>
                <span className="text-xs text-[#1B1B1B]/60 font-semibold">3–5 business days</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href="/collection" className="flex-1 bg-[#1B1B1B] text-[#FDF8EF] hover:bg-[#C89D29] hover:text-[#1B1B1B] px-6 py-3 font-black hieroglyph-font text-xs sketchy-button transition-all flex items-center justify-center gap-2">
                <ShoppingBag className="h-4 w-4" /> SHOP MORE
              </Link>
              <Link href="/track-order" className="flex-1 border-2 border-[#1B1B1B] text-[#1B1B1B] hover:bg-[#1B1B1B] hover:text-[#FDF8EF] px-6 py-3 font-black hieroglyph-font text-xs rounded-md transition-all flex items-center justify-center gap-2">
                <Package className="h-4 w-4" /> TRACK ORDER
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
