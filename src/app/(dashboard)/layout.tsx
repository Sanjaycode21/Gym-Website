"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";
import {
  LayoutDashboard,
  CreditCard,
  Dumbbell,
  User,
  LogOut,
  Flame,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sessionUser, setSessionUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/auth/session");
        const data = await res.json();
        
        if (!data.user) {
          router.push("/login");
        } else {
          setSessionUser(data.user);
        }
      } catch (err) {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { label: "Membership", href: "/membership", icon: <CreditCard size={20} /> },
    { label: "Classes", href: "/classes", icon: <Dumbbell size={20} /> },
    { label: "Profile", href: "/dashboard", icon: <User size={20} /> },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center gap-4 text-primary">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <span className="font-dm-sans text-xs tracking-widest uppercase">Authorizing Session...</span>
      </div>
    );
  }

  if (!sessionUser) return null;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#e9e1d7] antialiased overflow-hidden flex h-screen relative">
      {/* Sidebar Navigation */}
      <aside className="w-72 h-full bg-[#100e08] border-r border-[#4d4637]/30 hidden md:flex flex-col flex-shrink-0 z-40">
        {/* Logo */}
        <div className="p-8">
          <Link
            href="/"
            className="hover:opacity-90 transition-opacity"
          >
            <Logo textSize="text-2xl" iconSize={28} />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 space-y-2 mt-8">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href && item.label === "Dashboard";
            return (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-md transition-all duration-300 font-dm-sans text-xs font-bold uppercase tracking-widest ${
                  isActive
                    ? "text-primary bg-primary/10 border-l-4 border-primary"
                    : "text-on-surface-variant hover:text-primary hover:bg-surface-variant/30"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-6 mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-md text-error hover:bg-error/10 transition-all duration-300 border border-transparent hover:border-error/20 font-dm-sans text-xs font-bold uppercase tracking-widest cursor-pointer text-left"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Top Bar */}
        <header className="h-20 flex items-center justify-between px-6 md:px-grid-margin border-b border-[#4d4637]/10 z-30">
          <div className="flex flex-col">
            <h2 className="font-bebas text-2xl md:text-3xl text-on-background tracking-wide uppercase">
              Good morning, {sessionUser.name.split(" ")[0]} 👋
            </h2>
            <p className="font-dm-sans text-xs text-on-surface-variant opacity-70">
              Focus is your only fuel today.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex flex-col items-end">
              <span className="font-dm-sans text-[10px] font-bold text-primary tracking-widest flex items-center gap-1">
                <Flame size={12} className="text-primary fill-primary" />
                STREAK
              </span>
              <span className="font-mono text-xl text-on-background leading-none">
                12 DAYS
              </span>
            </div>
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/50 relative">
              <img
                alt="Profile Headshot"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRIq3_C_pIfYcAEvJdtSOS5zwtYF9LpSX7qcY7TV7bQZs5Tnl5PGk8k2eZ-RczIrIqjRBCUxtB8jJCEtwF1-RwC8wRCQY9YROuNZAUbzkVzgy-9UUnwiPF7_XV8yNklS5Rz1IsCTxLyoDF9wNh-lkrVg8_t2jCc28EmZdfyw3V25euv6PpgM3IamvWB9FyqMV-kZ5TdBbQovq5Ks_wAW7YumrTRlvLm2Jlv2mOEdGerajJnw-38oJZ8nmQ8FK-xzL8C2D1qxzh2xjJ"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* Dashboard Canvas */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-grid-margin z-20 pb-28 md:pb-20">
          {children}
        </div>

        {/* Footer Shell */}
        <footer className="h-16 bg-[#111111]/40 backdrop-blur-xl border-t border-[#4d4637]/30 hidden md:flex items-center justify-between px-6 md:px-grid-margin z-40 mt-auto">
          <p className="font-dm-sans text-[10px] font-bold text-on-surface-variant tracking-[0.2em] uppercase">
            © 2026 IRONFORGE FITNESS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            <Link
              href="/"
              className="font-dm-sans text-[10px] font-bold text-on-surface-variant hover:text-primary transition-colors tracking-widest uppercase"
            >
              Support
            </Link>
            <Link
              href="/"
              className="font-dm-sans text-[10px] font-bold text-on-surface-variant hover:text-primary transition-colors tracking-widest uppercase"
            >
              Terms
            </Link>
          </div>
        </footer>

        {/* Mobile Navigation Bottom Shell */}
        <nav className="fixed bottom-0 left-0 right-0 h-20 bg-[#111111]/60 backdrop-blur-xl border-t border-[#4d4637]/30 md:hidden flex items-center justify-around px-4 z-50">
          <Link href="/dashboard" className="flex flex-col items-center gap-1 text-primary">
            <LayoutDashboard size={20} />
            <span className="font-dm-sans text-[10px] font-bold tracking-wider uppercase">Home</span>
          </Link>
          <Link href="/classes" className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary transition-colors">
            <Dumbbell size={20} />
            <span className="font-dm-sans text-[10px] font-bold tracking-wider uppercase">Classes</span>
          </Link>
          <Link href="/membership" className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary transition-colors">
            <CreditCard size={20} />
            <span className="font-dm-sans text-[10px] font-bold tracking-wider uppercase">Billing</span>
          </Link>
          <Link href="/dashboard" className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary transition-colors">
            <User size={20} />
            <span className="font-dm-sans text-[10px] font-bold tracking-wider uppercase">Me</span>
          </Link>
        </nav>
      </main>
    </div>
  );
}
