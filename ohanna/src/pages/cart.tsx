import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft, ArrowRight, Loader2, Tag } from "lucide-react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import { useCart } from "@/contexts/cart-context";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { fmt } from "@/lib/products-data";
import { SEO } from "@/components/seo/seo";
import { SEO_DATA } from "@/lib/seo-data";
import { useLang } from "@/contexts/lang-context";

const FREE_SHIPPING_THRESHOLD = 1500;

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [, navigate] = useLocation();
  const { t } = useLang();

  const shippingFee = total >= FREE_SHIPPING_THRESHOLD ? 0 : 60;
  const orderTotal = total + shippingFee;
  const remaining = FREE_SHIPPING_THRESHOLD - total;

  const handleCheckout = async () => {
    if (!items.length) return;
    setLoading(true);
    try {
      const origin = window.location.origin;
      const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
      const res = await fetch(`${basePath}/api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          customerEmail: "",
          customerName: "Guest",
          successUrl: `${origin}${basePath}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${origin}${basePath}/cart`,
        }),
      });
      if (!res.ok && res.headers.get("content-type")?.includes("text/html")) {
        throw new Error("Server error — please try again");
      }
      const data = await res.json();
      if (data.url) {
        if (data.url.startsWith("https://checkout.stripe.com")) {
          window.location.href = data.url;
        } else {
          clearCart();
          const path = data.url.replace(origin, "").replace(basePath, "") || "/checkout/success";
          navigate(path);
        }
      } else {
        throw new Error(data.error ?? "Checkout failed");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Checkout failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF8EF] dark:bg-[#1A1410] flex flex-col">
      <SEO {...(SEO_DATA.cart as any)} />
      <Navbar />

      <section className="py-12 bg-gradient-to-b from-[#E4D5B7]/40 to-[#FDF8EF] dark:from-[#2A1E14]/40 dark:to-[#1A1410]">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-7 w-7 text-[#C89D29]" />
            <h1 className="text-3xl font-black hieroglyph-font text-[#1B1B1B] dark:text-[#FDF8EF]">{t("cart.cartPageTitle")}</h1>
            <span className="text-sm text-[#1B1B1B]/40 dark:text-[#FDF8EF]/40 font-semibold">
              ({items.length} {items.length !== 1 ? t("cart.itemCountPlural") : t("cart.itemCount")})
            </span>
          </div>
        </div>
      </section>

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {items.length === 0 ? (
              <div className="ohanna-card text-center py-24 px-8">
                <span className="text-7xl block mb-6 text-[#C89D29]/30">𓋹</span>
                <p className="font-black hieroglyph-font text-[#1B1B1B]/30 dark:text-[#FDF8EF]/30 tracking-widest text-sm mb-2">{t("cart.noItems")}</p>
                <Link href="/collection" className="inline-flex items-center gap-2 bg-[#1B1B1B] dark:bg-[#FDF8EF] text-[#FDF8EF] dark:text-[#1B1B1B] hover:bg-[#C89D29] hover:text-[#1B1B1B] dark:hover:bg-[#C89D29] px-6 py-3 font-black hieroglyph-font text-sm sketchy-button transition-all mt-6">
                  <ShoppingBag className="h-4 w-4" /> {t("cart.browseCollection")}
                </Link>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-3">
                  {remaining > 0 && (
                    <div className="bg-[#C89D29]/10 dark:bg-[#C89D29]/15 border border-[#C89D29]/30 rounded-xl p-3.5 flex items-center gap-3 text-sm">
                      <Tag className="h-4 w-4 text-[#C89D29] shrink-0" />
                      <span className="text-[#1B1B1B]/70 dark:text-[#FDF8EF]/70">
                        Add <strong className="text-[#1B1B1B] dark:text-[#FDF8EF]">{fmt(remaining)}</strong> more for free shipping!
                      </span>
                    </div>
                  )}
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={`${item.product.id}-${item.size ?? "default"}`}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20, height: 0 }}
                        className="ohanna-card flex gap-4 p-4"
                      >
                        <Link
                          href={`/product/${item.product.slug ?? item.product.id}`}
                          className="relative w-24 h-28 flex-shrink-0 rounded-lg overflow-hidden bg-[#E4D5B7] dark:bg-[#2A1E14]"
                        >
                          <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                        </Link>
                        <div className="flex-1">
                          <span className="text-[10px] font-black hieroglyph-font text-[#C89D29] tracking-widest">{item.product.category}</span>
                          <h3 className="font-black hieroglyph-font text-sm mt-0.5 text-[#1B1B1B] dark:text-[#FDF8EF]">{item.product.name}</h3>
                          {item.size && (
                            <p className="text-xs text-[#1B1B1B]/40 dark:text-[#FDF8EF]/40 mt-0.5">
                              {t("cart.sizeLabel")}: {item.size}
                            </p>
                          )}
                          <p className="font-black text-[#C89D29] text-base mt-1">{fmt(item.product.price * item.quantity)}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center border border-[#1B1B1B]/15 dark:border-[#FDF8EF]/15 rounded-lg overflow-hidden">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.size)}
                                className="w-8 h-8 flex items-center justify-center text-[#1B1B1B] dark:text-[#FDF8EF] hover:bg-[#1B1B1B]/5 dark:hover:bg-[#FDF8EF]/5 transition-colors"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-8 text-center text-sm font-bold border-x border-[#1B1B1B]/10 dark:border-[#FDF8EF]/10 text-[#1B1B1B] dark:text-[#FDF8EF]">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.size)}
                                className="w-8 h-8 flex items-center justify-center text-[#1B1B1B] dark:text-[#FDF8EF] hover:bg-[#1B1B1B]/5 dark:hover:bg-[#FDF8EF]/5 transition-colors"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <button
                              onClick={() => {
                                removeFromCart(item.product.id, item.size);
                                toast.success(`${item.product.name} ${t("cart.removed")}`);
                              }}
                              className="flex items-center gap-1 text-xs text-[#1B1B1B]/35 dark:text-[#FDF8EF]/35 hover:text-[#AE1C1C] dark:hover:text-[#F87171] transition-colors"
                            >
                              <Trash2 className="h-3.5 w-3.5" /> {t("cart.remove")}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <Link href="/collection" className="inline-flex items-center gap-2 text-sm text-[#1B1B1B]/45 dark:text-[#FDF8EF]/45 hover:text-[#C89D29] transition-colors font-semibold mt-2">
                    <ArrowLeft className="h-4 w-4" /> {t("cart.continueShopping")}
                  </Link>
                </div>

                <div className="ohanna-card p-6 h-fit space-y-4">
                  <h2 className="font-black hieroglyph-font tracking-wider text-sm text-[#1B1B1B] dark:text-[#FDF8EF] pb-3 border-b border-[#1B1B1B]/8 dark:border-[#FDF8EF]/8">
                    {t("cart.orderSummary")}
                  </h2>
                  <div className="border-t border-[#1B1B1B]/8 dark:border-[#FDF8EF]/8 pt-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#1B1B1B]/55 dark:text-[#FDF8EF]/55">{t("cart.subtotal")}</span>
                      <span className="font-bold text-[#1B1B1B] dark:text-[#FDF8EF]">{fmt(total)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#1B1B1B]/55 dark:text-[#FDF8EF]/55">{t("cart.shipping")}</span>
                      <span className={`font-bold ${shippingFee === 0 ? "text-[#1D4D4F] dark:text-[#4A9EA1]" : "text-[#1B1B1B] dark:text-[#FDF8EF]"}`}>
                        {shippingFee === 0 ? t("common.free") : fmt(shippingFee)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-[#1B1B1B]/8 dark:border-[#FDF8EF]/8">
                      <span className="font-black hieroglyph-font text-sm tracking-wider text-[#1B1B1B] dark:text-[#FDF8EF]">{t("cart.total")}</span>
                      <span className="font-black text-[#C89D29] text-2xl">{fmt(orderTotal)}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full bg-[#1B1B1B] dark:bg-[#FDF8EF] text-[#FDF8EF] dark:text-[#1B1B1B] hover:bg-[#C89D29] hover:text-[#1B1B1B] dark:hover:bg-[#C89D29] py-3.5 px-6 font-black hieroglyph-font text-sm sketchy-button transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <><Loader2 className="h-4 w-4 animate-spin" /> {t("cart.proceedCheckout")}</>
                    ) : (
                      <><ArrowRight className="h-4 w-4" /> {t("cart.proceedCheckout")}</>
                    )}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
