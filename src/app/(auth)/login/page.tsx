"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, ShieldAlert, ArrowRight, Eye, EyeOff } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useAuth } from "@/components/providers/AuthProvider";

function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";
  const { refreshSession } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill out all fields");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Refresh page context to propagate cookies
      router.refresh();

      // Update client session state instantly
      await refreshSession();

      // Redirect depending on user role
      if (data.user.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push(redirect);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const autofillCredentials = (type: "member" | "admin") => {
    if (type === "admin") {
      setEmail("admin@ironforge.fit");
      setPassword("AdminPass123");
    } else {
      setEmail("sanjay@ironforge.fit");
      setPassword("MemberPass123");
    }
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col justify-center items-center px-6 py-12 relative">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#e6c364]/5 rounded-full blur-3xl pointer-events-none"></div>

      <ScrollReveal className="w-full max-w-md relative z-10">
        <div className="bg-[#1e1b15] border border-[#4d4637]/30 p-8 md:p-10 rounded-sm shadow-2xl space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="font-bebas text-5xl md:text-6xl text-on-surface tracking-wider uppercase">
              LOGIN TO THE <span className="text-primary italic font-cormorant capitalize font-normal">Forge</span>
            </h1>
            <p className="font-dm-sans text-xs text-on-surface-variant uppercase tracking-widest">
              Enter your credentials to access your portal
            </p>
          </div>

          {/* Error panel */}
          {error && (
            <div className="bg-error/10 border border-error/30 text-error p-4 rounded-sm flex items-center gap-3 text-xs font-dm-sans leading-relaxed">
              <ShieldAlert size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-dm-sans text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-4 w-4 h-4 text-on-surface-variant/50" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  className="w-full bg-[#0A0A0A] border border-outline-variant/50 focus:border-primary text-on-surface text-sm pl-12 pr-4 py-3.5 outline-none rounded-sm transition-all font-dm-sans placeholder:text-on-surface-variant/35"
                  placeholder="sanjay@ironforge.fit"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="font-dm-sans text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                Security Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-4 w-4 h-4 text-on-surface-variant/50" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(null);
                  }}
                  className="w-full bg-[#0A0A0A] border border-outline-variant/50 focus:border-primary text-on-surface text-sm pl-12 pr-12 py-3.5 outline-none rounded-sm transition-all font-dm-sans placeholder:text-on-surface-variant/35"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-on-surface-variant/50 hover:text-primary transition-colors cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary font-bebas text-xl py-4 gold-shimmer shadow-lg flex items-center justify-center gap-3 group cursor-pointer tracking-widest uppercase disabled:opacity-50"
            >
              {loading ? (
                <span>AUTHORIZING...</span>
              ) : (
                <>
                  <span>ENTER THE FORGE</span>
                  <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </button>
          </form>

          {/* Quick Login Autofills */}
          <div className="pt-6 border-t border-outline-variant/20 space-y-4">
            <h5 className="font-dm-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-center">
              DEMO CREDENTIALS AUTOFILL
            </h5>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => autofillCredentials("member")}
                className="py-2.5 border border-outline-variant hover:border-primary text-on-surface font-dm-sans text-xs font-bold tracking-wider rounded-sm transition-all duration-300 uppercase cursor-pointer"
              >
                MEMBER DEMO
              </button>
              <button
                type="button"
                onClick={() => autofillCredentials("admin")}
                className="py-2.5 border border-outline-variant hover:border-primary text-on-surface font-dm-sans text-xs font-bold tracking-wider rounded-sm transition-all duration-300 uppercase cursor-pointer"
              >
                ADMIN DEMO
              </button>
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="text-center">
            <p className="font-dm-sans text-xs text-on-surface-variant">
              Don&apos;t have an account?{" "}
              <Link href={`/register${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ""}`} className="text-primary hover:underline font-bold transition-colors">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0A0A0A] flex flex-col justify-center items-center text-primary">
          <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
