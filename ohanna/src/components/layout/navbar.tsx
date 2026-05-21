import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye, ShoppingBag, Menu, X, Bell, User, Sun, Moon, Globe,
  Crown, Pyramid,
} from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { useTheme } from "@/contexts/theme-context";
import { useLang } from "@/contexts/lang-context";

export default function Navbar() {
  const [location] = useLocation();
  const { itemCount, openCart } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLang();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "register">("login");
  const [unread, setUnread] = useState(2);

  const notifRef = useRef<HTMLDivElement>(null);

  const NAV_LINKS = [
    { href: "/collection", key: "nav.collection" },
    { href: "/story",      key: "nav.story" },
    { href: "/culture",    key: "nav.culture" },
    { href: "/contact",    key: "nav.contact" },
  ];

  const NOTIFICATIONS = [
    { id: 1, titleKey: "notif.n1Title", msgKey: "notif.n1Msg", timeKey: "notif.n1Time", unread: true },
    { id: 2, titleKey: "notif.n2Title", msgKey: "notif.n2Msg", timeKey: "notif.n2Time", unread: true },
    { id: 3, titleKey: "notif.n3Title", msgKey: "notif.n3Msg", timeKey: "notif.n3Time", unread: false },
  ];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  useEffect(() => {
    if (!accountOpen && !notifOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setAccountOpen(false); setNotifOpen(false); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [accountOpen, notifOpen]);

  useEffect(() => {
    if (!notifOpen) return;
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [notifOpen]);

  const navBase =
    "sticky top-0 z-40 transition-all duration-300 " +
    "bg-[#FDF8EF] dark:bg-[#1A1410] " +
    "border-b border-[#1B1B1B]/12 dark:border-[#FDF8EF]/8 " +
    (scrolled ? "shadow-md dark:shadow-black/30" : "");

  const iconBtn =
    "p-2 rounded-lg transition-all " +
    "text-[#1B1B1B]/70 dark:text-[#FDF8EF]/60 " +
    "hover:text-[#C89D29] hover:bg-[#1B1B1B]/5 dark:hover:bg-[#FDF8EF]/5";

  return (
    <>
      <nav className={navBase}>
        <div className="container mx-auto flex items-center justify-between px-4 py-3 gap-4">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <Eye className="h-6 w-6 text-[#C89D29] transition-transform group-hover:scale-110" />
            <span className="text-lg font-black hieroglyph-font tracking-widest text-[#1B1B1B] dark:text-[#FDF8EF]">
              OHANNA
            </span>
          </Link>

          {/* ── Desktop Nav Links ── */}
          <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={
                  "text-[11px] font-bold hieroglyph-font tracking-wider transition-colors relative " +
                  "after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:bg-[#C89D29] after:transition-all after:duration-200 " +
                  (location === l.href
                    ? "text-[#C89D29] after:w-full"
                    : "text-[#1B1B1B]/65 dark:text-[#FDF8EF]/60 hover:text-[#C89D29] after:w-0 hover:after:w-full")
                }
              >
                {t(l.key)}
              </Link>
            ))}
          </div>

          {/* ── Right Controls ── */}
          <div className="flex items-center gap-0.5 shrink-0">

            {/* Lang toggle */}
            <button
              onClick={toggleLang}
              className={
                "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-black hieroglyph-font " +
                "border border-[#1B1B1B]/12 dark:border-[#FDF8EF]/12 " +
                "text-[#1B1B1B]/65 dark:text-[#FDF8EF]/60 " +
                "hover:border-[#C89D29] hover:text-[#C89D29] transition-all"
              }
              aria-label="Toggle language"
            >
              <Globe className="h-3 w-3" />
              {lang === "en" ? "AR" : "EN"}
            </button>

            {/* Theme toggle */}
            <button onClick={toggleTheme} className={iconBtn} aria-label="Toggle theme">
              {theme === "dark"
                ? <Sun className="h-[18px] w-[18px]" />
                : <Moon className="h-[18px] w-[18px]" />}
            </button>

            {/* Notification bell */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => { setNotifOpen((v) => !v); setAccountOpen(false); }}
                className={`${iconBtn} relative`}
                aria-label="Notifications"
              >
                <Bell className="h-[18px] w-[18px]" />
                {unread > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#C89D29] ring-2 ring-[#FDF8EF] dark:ring-[#1A1410] animate-pulse" />
                )}
              </button>

              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.96 }}
                    transition={{ duration: 0.14 }}
                    className={
                      "absolute top-full mt-2 w-80 z-50 rounded-xl overflow-hidden shadow-xl " +
                      "bg-[#FDF8EF] dark:bg-[#221A12] " +
                      "border border-[#1B1B1B]/10 dark:border-[#FDF8EF]/8 " +
                      (lang === "ar" ? "left-0" : "right-0")
                    }
                  >
                    <div className="flex items-center justify-between px-4 py-3 border-b border-[#1B1B1B]/6 dark:border-[#FDF8EF]/6">
                      <span className="font-black hieroglyph-font text-[11px] tracking-wider text-[#1B1B1B] dark:text-[#FDF8EF]">
                        {t("notif.title")}
                        {unread > 0 && (
                          <span className="ms-2 bg-[#C89D29] text-[#1B1B1B] text-[9px] font-black px-1.5 py-0.5 rounded-full">
                            {unread}
                          </span>
                        )}
                      </span>
                      {unread > 0 && (
                        <button onClick={() => setUnread(0)} className="text-[10px] text-[#C89D29] font-bold hover:underline">
                          {t("notif.markAll")}
                        </button>
                      )}
                    </div>
                    <div className="divide-y divide-[#1B1B1B]/5 dark:divide-[#FDF8EF]/5">
                      {NOTIFICATIONS.map((n) => (
                        <div
                          key={n.id}
                          className={
                            "px-4 py-3 flex gap-3 items-start cursor-pointer transition-colors " +
                            "hover:bg-[#1B1B1B]/4 dark:hover:bg-[#FDF8EF]/4 " +
                            (n.unread && unread > 0 ? "bg-[#C89D29]/6 dark:bg-[#C89D29]/8" : "")
                          }
                        >
                          <div className={"w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 " + (n.unread && unread > 0 ? "bg-[#C89D29]" : "bg-[#1B1B1B]/20 dark:bg-[#FDF8EF]/20")} />
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-black text-[#1B1B1B] dark:text-[#FDF8EF] leading-tight">{t(n.titleKey)}</p>
                            <p className="text-[11px] text-[#1B1B1B]/55 dark:text-[#FDF8EF]/55 mt-0.5 leading-relaxed">{t(n.msgKey)}</p>
                          </div>
                          <span className="text-[10px] text-[#1B1B1B]/30 dark:text-[#FDF8EF]/30 shrink-0 mt-0.5">{t(n.timeKey)}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Account avatar */}
            <button
              onClick={() => { setAccountOpen(true); setNotifOpen(false); }}
              className={iconBtn}
              aria-label="Account"
            >
              <User className="h-[18px] w-[18px]" />
            </button>

            {/* Cart */}
            <button onClick={openCart} className={`${iconBtn} relative`} aria-label={`Cart (${itemCount} items)`}>
              <ShoppingBag className="h-[18px] w-[18px]" />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 bg-[#C89D29] text-[#1B1B1B] text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full"
                  >
                    {itemCount > 9 ? "9+" : itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile hamburger */}
            <button className={`${iconBtn} md:hidden`} onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu">
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden sticky top-[57px] z-30 overflow-hidden bg-[#FDF8EF] dark:bg-[#1A1410] border-b border-[#1B1B1B]/10 dark:border-[#FDF8EF]/8"
          >
            <div className="flex flex-col p-4 gap-1">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={
                    "text-sm font-black hieroglyph-font tracking-wider py-3 px-2 rounded-lg transition-colors border-b border-[#1B1B1B]/6 dark:border-[#FDF8EF]/6 last:border-0 " +
                    (location === l.href
                      ? "text-[#C89D29]"
                      : "text-[#1B1B1B]/70 dark:text-[#FDF8EF]/65 hover:text-[#C89D29]")
                  }
                >
                  {t(l.key)}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Account Modal ── */}
      <AnimatePresence>
        {accountOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setAccountOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Modal — centered via flex on the fixed overlay */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.97 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="w-full max-w-[480px] sm:max-w-[560px] pointer-events-auto"
              >
                <div className="bg-[#FDF8EF] dark:bg-[#221A12] rounded-2xl shadow-2xl overflow-hidden">

                  {/* Gold top bar */}
                  <div className="h-1 w-full bg-gradient-to-r from-[#C89D29]/60 via-[#C89D29] to-[#C89D29]/60" />

                  {/* Inner grid: brand panel + form */}
                  <div className="grid sm:grid-cols-[180px,1fr]">

                    {/* ── Left brand panel (desktop only) ── */}
                    <div className="hidden sm:flex flex-col items-center justify-center bg-[#1B1B1B] dark:bg-[#0D0B09] p-6 gap-5 text-center">
                      <div className="w-14 h-14 rounded-full bg-[#C89D29]/15 flex items-center justify-center">
                        <Eye className="h-8 w-8 text-[#C89D29]" />
                      </div>
                      <p className="font-black hieroglyph-font text-[#FDF8EF] text-base tracking-widest leading-tight">
                        OHANNA
                      </p>
                      <div className="flex gap-3 text-2xl text-[#C89D29]/50">
                        <span>𓋹</span>
                        <span>𓂀</span>
                        <span>𓅃</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[#FDF8EF]/40 text-[10px]">
                          <Crown className="h-3 w-3 text-[#C89D29]/60" />
                          <span>Ancient Power</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#FDF8EF]/40 text-[10px]">
                          <Pyramid className="h-3 w-3 text-[#C89D29]/60" />
                          <span>Modern Rebellion</span>
                        </div>
                      </div>
                    </div>

                    {/* ── Right: header + form ── */}
                    <div>
                      {/* Header row: tabs + close */}
                      <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-[#1B1B1B]/8 dark:border-[#FDF8EF]/8">
                        <div className="flex gap-1 p-0.5 bg-[#1B1B1B]/6 dark:bg-[#FDF8EF]/6 rounded-xl">
                          {(["login", "register"] as const).map((tab) => (
                            <button
                              key={tab}
                              onClick={() => setAuthTab(tab)}
                              className={
                                "px-4 py-1.5 text-[11px] font-black hieroglyph-font rounded-lg transition-all " +
                                (authTab === tab
                                  ? "bg-[#1B1B1B] dark:bg-[#C89D29] text-[#FDF8EF] dark:text-[#1B1B1B] shadow-sm"
                                  : "text-[#1B1B1B]/45 dark:text-[#FDF8EF]/45 hover:text-[#1B1B1B] dark:hover:text-[#FDF8EF]")
                              }
                            >
                              {t(`auth.${tab}`)}
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={() => setAccountOpen(false)}
                          className="p-1.5 rounded-lg hover:bg-[#1B1B1B]/6 dark:hover:bg-[#FDF8EF]/6 text-[#1B1B1B]/45 dark:text-[#FDF8EF]/45 hover:text-[#1B1B1B] dark:hover:text-[#FDF8EF] transition-all"
                          aria-label="Close"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Form body */}
                      <div className="px-5 py-5">
                        <AnimatePresence mode="wait">
                          {authTab === "login" ? (
                            <motion.form
                              key="login"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 10 }}
                              transition={{ duration: 0.15 }}
                              className="space-y-3"
                              onSubmit={(e) => { e.preventDefault(); setAccountOpen(false); }}
                            >
                              <div>
                                <label className="block text-[10px] font-black hieroglyph-font text-[#1B1B1B]/50 dark:text-[#FDF8EF]/50 tracking-wider mb-1.5">
                                  {t("auth.email")}
                                </label>
                                <input type="email" className="ohanna-input" placeholder="your@email.com" required />
                              </div>
                              <div>
                                <div className="flex items-center justify-between mb-1.5">
                                  <label className="text-[10px] font-black hieroglyph-font text-[#1B1B1B]/50 dark:text-[#FDF8EF]/50 tracking-wider">
                                    {t("auth.password")}
                                  </label>
                                  <button type="button" className="text-[10px] text-[#C89D29] font-semibold hover:underline">
                                    {t("auth.forgotPassword")}
                                  </button>
                                </div>
                                <input type="password" className="ohanna-input" placeholder="••••••••" required />
                              </div>
                              <button
                                type="submit"
                                className="w-full bg-[#1B1B1B] dark:bg-[#C89D29] text-[#FDF8EF] dark:text-[#1B1B1B] py-3 font-black hieroglyph-font text-xs tracking-widest rounded-lg hover:bg-[#C89D29] hover:text-[#1B1B1B] dark:hover:bg-[#1B1B1B] dark:hover:text-[#FDF8EF] sketchy-button transition-all mt-1"
                              >
                                {t("auth.submitLogin")}
                              </button>
                              <p className="text-center text-[11px] text-[#1B1B1B]/40 dark:text-[#FDF8EF]/40 pt-1">
                                {t("auth.loginFooter")}{" "}
                                <button type="button" onClick={() => setAuthTab("register")} className="text-[#C89D29] font-bold hover:underline">
                                  {t("auth.register")}
                                </button>
                              </p>
                            </motion.form>
                          ) : (
                            <motion.form
                              key="register"
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              transition={{ duration: 0.15 }}
                              className="space-y-3"
                              onSubmit={(e) => { e.preventDefault(); setAccountOpen(false); }}
                            >
                              <div className="grid grid-cols-2 gap-3">
                                <div className="col-span-2">
                                  <label className="block text-[10px] font-black hieroglyph-font text-[#1B1B1B]/50 dark:text-[#FDF8EF]/50 tracking-wider mb-1.5">
                                    {t("auth.fullName")}
                                  </label>
                                  <input type="text" className="ohanna-input" placeholder="Ahmed Mohamed" required />
                                </div>
                                <div className="col-span-2">
                                  <label className="block text-[10px] font-black hieroglyph-font text-[#1B1B1B]/50 dark:text-[#FDF8EF]/50 tracking-wider mb-1.5">
                                    {t("auth.email")}
                                  </label>
                                  <input type="email" className="ohanna-input" placeholder="your@email.com" required />
                                </div>
                                <div className="col-span-2">
                                  <label className="block text-[10px] font-black hieroglyph-font text-[#1B1B1B]/50 dark:text-[#FDF8EF]/50 tracking-wider mb-1.5">
                                    {t("auth.password")}
                                  </label>
                                  <input type="password" className="ohanna-input" placeholder="••••••••" required />
                                </div>
                              </div>
                              <button
                                type="submit"
                                className="w-full bg-[#C89D29] text-[#1B1B1B] py-3 font-black hieroglyph-font text-xs tracking-widest rounded-lg hover:bg-[#1B1B1B] hover:text-[#FDF8EF] sketchy-button transition-all mt-1"
                              >
                                {t("auth.submitRegister")}
                              </button>
                              <p className="text-center text-[11px] text-[#1B1B1B]/40 dark:text-[#FDF8EF]/40 pt-1">
                                {t("auth.registerFooter")}{" "}
                                <button type="button" onClick={() => setAuthTab("login")} className="text-[#C89D29] font-bold hover:underline">
                                  {t("auth.login")}
                                </button>
                              </p>
                            </motion.form>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
