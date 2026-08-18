"use client";

import { useEffect, useState } from "react";
import { navItems, profile } from "@/data/profile";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-3 z-50 flex flex-col items-center px-4 transition-all duration-300">
      <nav
        aria-label="Main Navigation"
        className={`flex w-full max-w-2xl items-center justify-between gap-4 rounded-full px-5 py-2.5 transition-all duration-300 ${
          scrolled
            ? "stealth-pill shadow-[0_12px_36px_rgba(0,0,0,0.8)] ring-1 ring-white/10"
            : "bg-[#07080c]/80 backdrop-blur-xl border border-white/[0.08]"
        }`}
      >
        {/* Monogram / Brand */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-[13px] font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80 shrink-0"
        >
          <span className="flex size-6 items-center justify-center rounded-full bg-gradient-to-tr from-[#e11d48] to-[#f59e0b] text-[11px] font-bold text-white shadow-[0_0_10px_rgba(225,29,72,0.6)]">
            {profile.name.charAt(0)}
          </span>
          <span className="font-display tracking-normal text-[14px]">{profile.name}</span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden sm:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[12px] font-medium text-muted transition-colors hover:text-foreground hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right CTA / Mobile Toggle */}
        <div className="flex items-center gap-2.5">
          <a
            href="#contact"
            className="inline-flex items-center rounded-full bg-white/5 border border-white/10 px-3.5 py-1 text-[12px] font-medium text-foreground transition-all hover:border-rose-500/60 hover:bg-rose-500/10 hover:text-white"
          >
            Connect →
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="flex sm:hidden size-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted hover:text-foreground focus:outline-none focus:ring-1 focus:ring-rose-500"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="mt-2 flex sm:hidden w-full max-w-2xl flex-col gap-2 rounded-2xl border border-white/10 bg-[#07080c]/95 p-4 shadow-2xl backdrop-blur-2xl animate-stealth-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl px-4 py-2 text-[13px] font-medium text-muted hover:bg-white/5 hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
