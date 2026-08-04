"use client";

import Link from "next/link";
import { Zap, Github, ExternalLink } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 backdrop-blur-xl bg-background/80">
      <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-epicenter-500 to-epicenter-700 flex items-center justify-center group-hover:animate-pulse-glow transition-all">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-white font-bold text-lg tracking-tight">EpiCenter</span>
            <span className="text-muted-foreground text-[10px] tracking-widest uppercase">
              Find the Fault. Prove the Fix.
            </span>
          </div>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { label: "Dashboard", href: "/" },
            { label: "Incidents", href: "/incidents" },
            { label: "Docs", href: "https://github.com/Jacksonfio/EpiCenter#readme", external: true },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-white hover:bg-white/5 transition-all"
            >
              {item.label}
              {item.external && <ExternalLink className="w-3 h-3" />}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="https://github.com/Jacksonfio/EpiCenter"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-white border border-white/10 hover:border-white/20 transition-all"
          >
            <Github className="w-4 h-4" />
            <span className="hidden sm:inline">GitHub</span>
          </Link>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-epicenter-500/10 border border-epicenter-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-epicenter-400 animate-pulse" />
            <span className="text-xs text-epicenter-400 font-medium">TDAR Active</span>
          </div>
        </div>
      </div>
    </header>
  );
}
