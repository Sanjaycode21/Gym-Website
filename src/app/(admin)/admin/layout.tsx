"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Dumbbell,
  BadgeCent,
  LogOut,
  ShieldAlert,
} from "lucide-react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sessionUser, setSessionUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/auth/session");
        const data = await res.json();
        
        if (!data.user || data.user.role !== "ADMIN") {
          // Redirect to login if not authenticated or not an admin
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
    { label: "Overview", href: "/admin", icon: <LayoutDashboard size={20} /> },
    { label: "Members", href: "/admin/members", icon: <Users size={20} /> },
    { label: "Bookings", href: "/admin/bookings", icon: <CalendarDays size={20} /> },
    { label: "Classes", href: "/admin/classes", icon: <Dumbbell size={20} /> },
    { label: "Revenue", href: "/admin/revenue", icon: <BadgeCent size={20} /> },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center gap-4 text-primary">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <span className="font-dm-sans text-xs tracking-widest uppercase">Verifying Credentials...</span>
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
            <Logo textSize="text-xl" iconSize={26} isAdmin />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 space-y-2 mt-8">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
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

      {/* Main Viewport */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Top Header */}
        <header className="h-20 flex items-center justify-between px-6 md:px-grid-margin border-b border-[#4d4637]/10 z-30">
          <div className="flex flex-col">
            <h2 className="font-bebas text-2xl md:text-3xl text-on-background tracking-wide uppercase">
              Control Panel
            </h2>
            <p className="font-dm-sans text-xs text-on-surface-variant opacity-70">
              Logged in as {sessionUser.name} ({sessionUser.role})
            </p>
          </div>
          <div className="flex items-center gap-4 bg-primary/15 border border-primary/30 px-4 py-1.5 rounded-sm">
            <ShieldAlert size={16} className="text-primary" />
            <span className="font-dm-sans text-[10px] font-bold text-primary tracking-widest uppercase">
              SECURED ACCESS
            </span>
          </div>
        </header>

        {/* Dashboard Canvas */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-grid-margin pb-24 md:pb-16">
          {children}
        </div>
      </main>
    </div>
  );
}
