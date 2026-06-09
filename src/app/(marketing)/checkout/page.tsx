"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, CreditCard, Lock, ShieldCheck } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const steps = [
  { label: "Plan", done: true },
  { label: "Your Details", active: true },
  { label: "Add-ons" },
  { label: "Payment" },
];

const addOns = [
  { id: "pt", label: "Personal Training (4 sessions)", price: 4800 },
  { id: "nutrition", label: "Nutrition Plan", price: 500 },
  { id: "locker", label: "Private Locker", price: 300 },
  { id: "parking", label: "Parking Pass", price: 200 },
];

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    emergencyName: "",
    emergencyPhone: "",
  });

  const basePrice = 1799;
  const addOnTotal = addOns
    .filter((a) => selectedAddOns.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0);
  const total = basePrice + addOnTotal;

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <main className="max-w-7xl mx-auto px-10 py-16 md:py-28">
      {/* ─── Stepper ─── */}
      <div className="mb-16">
        <div className="flex justify-between items-center max-w-3xl mx-auto relative">
          <div className="absolute top-5 left-0 w-full h-[1px] bg-[#4d4637]/30 -z-10" />
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center gap-4">
              <button
                type="button"
                onClick={() => i <= currentStep && setCurrentStep(i)}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-[family-name:var(--font-mono)] text-sm font-medium transition-all duration-300
                  ${step.done
                    ? "border border-[#e6c364] bg-[#0A0A0A] text-[#e6c364]"
                    : i === currentStep
                    ? "bg-[#e6c364] text-[#3d2e00] ring-4 ring-[#e6c364]/20 shadow-[0_0_15px_rgba(230,195,100,0.4)]"
                    : "border border-[#4d4637] bg-[#1e1b15] text-[#99907e]"
                  }`}
              >
                {step.done ? <CheckCircle size={18} /> : `0${i + 1}`}
              </button>
              <span
                className={`font-[family-name:var(--font-dm-sans)] text-[10px] font-bold uppercase tracking-[0.1em]
                  ${i === currentStep ? "text-[#e6c364]" : "text-[#99907e]"}`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ─── Main Form / Add-ons Panel ─── */}
        <div className="lg:col-span-8 bg-[#1e1b15] p-8 md:p-12 border border-[#4d4637]/20 rounded-lg">
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="font-[family-name:var(--font-bebas-neue)] text-5xl text-[#e6c364] mb-12 tracking-wider">
                PERSONAL INFORMATION
              </h1>
              <form className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                  {[
                    { label: "Full Name", key: "fullName", type: "text", placeholder: "ALEXANDER VANCE" },
                    { label: "Email Address", key: "email", type: "email", placeholder: "ALEXANDER.V@FORGE.COM" },
                    { label: "Phone Number", key: "phone", type: "tel", placeholder: "+91 (555) 000-0000" },
                    { label: "Date of Birth", key: "dob", type: "date", placeholder: "" },
                    { label: "Emergency Contact Name", key: "emergencyName", type: "text", placeholder: "CONTACT NAME" },
                    { label: "Emergency Contact Phone", key: "emergencyPhone", type: "tel", placeholder: "+91 (555) 000-0000" },
                  ].map((field) => (
                    <div key={field.key} className="flex flex-col gap-2">
                      <label className="font-[family-name:var(--font-dm-sans)] text-[10px] font-bold uppercase tracking-[0.1em] text-[#99907e]">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={form[field.key as keyof typeof form]}
                        onChange={(e) => setForm((p) => ({ ...p, [field.key]: e.target.value }))}
                        className="bg-[#111111] border-0 border-b border-[#99907e]/50 focus:border-[#e6c364] text-[#e9e1d7] font-[family-name:var(--font-dm-sans)] text-sm py-4 outline-none transition-all focus:shadow-[0_0_15px_rgba(201,168,76,0.3)] placeholder:text-[#4d4637]"
                      />
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-1 accent-[#e6c364]" />
                    <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[#99907e]">
                      I have read and agree to the{" "}
                      <span className="text-[#e6c364] underline cursor-pointer">Terms of Service</span> and{" "}
                      <span className="text-[#e6c364] underline cursor-pointer">Health Liability Waiver</span>.
                    </span>
                  </label>
                </div>
              </form>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="font-[family-name:var(--font-bebas-neue)] text-5xl text-[#e6c364] mb-12 tracking-wider">
                ENHANCE YOUR PLAN
              </h2>
              <div className="space-y-4">
                {addOns.map((addon) => (
                  <label
                    key={addon.id}
                    className={`flex items-center justify-between p-6 border cursor-pointer transition-all duration-300
                      ${selectedAddOns.includes(addon.id)
                        ? "border-[#e6c364] bg-[#e6c364]/5"
                        : "border-[#4d4637]/30 hover:border-[#e6c364]/50"
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={selectedAddOns.includes(addon.id)}
                        onChange={() => toggleAddOn(addon.id)}
                        className="w-5 h-5 accent-[#e6c364]"
                      />
                      <span className="font-[family-name:var(--font-dm-sans)] text-sm">{addon.label}</span>
                    </div>
                    <span className="font-[family-name:var(--font-mono)] text-[#e6c364] font-medium">
                      +₹{addon.price.toLocaleString()}
                    </span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="font-[family-name:var(--font-bebas-neue)] text-5xl text-[#e6c364] mb-12 tracking-wider">
                PAYMENT DETAILS
              </h2>
              <div className="space-y-8">
                <div className="flex flex-col gap-2">
                  <label className="font-[family-name:var(--font-dm-sans)] text-[10px] font-bold uppercase tracking-[0.1em] text-[#99907e]">Card Number</label>
                  <input
                    type="text"
                    placeholder="4242 4242 4242 4242"
                    className="bg-[#111111] border-0 border-b border-[#99907e]/50 focus:border-[#e6c364] text-[#e9e1d7] font-[family-name:var(--font-mono)] text-sm py-4 outline-none transition-all placeholder:text-[#4d4637]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="font-[family-name:var(--font-dm-sans)] text-[10px] font-bold uppercase tracking-[0.1em] text-[#99907e]">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM / YY"
                      className="bg-[#111111] border-0 border-b border-[#99907e]/50 focus:border-[#e6c364] text-[#e9e1d7] font-[family-name:var(--font-mono)] text-sm py-4 outline-none transition-all placeholder:text-[#4d4637]"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-[family-name:var(--font-dm-sans)] text-[10px] font-bold uppercase tracking-[0.1em] text-[#99907e]">CVV</label>
                    <input
                      type="text"
                      placeholder="•••"
                      className="bg-[#111111] border-0 border-b border-[#99907e]/50 focus:border-[#e6c364] text-[#e9e1d7] font-[family-name:var(--font-mono)] text-sm py-4 outline-none transition-all placeholder:text-[#4d4637]"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[#99907e]">
                  <Lock size={14} />
                  <span className="font-[family-name:var(--font-dm-sans)] text-xs">256-bit SSL encrypted. Your data is never stored.</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation */}
          <div className="mt-12 flex justify-between items-center">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((s) => s - 1)}
                className="font-[family-name:var(--font-dm-sans)] text-sm text-[#99907e] hover:text-[#e6c364] transition-colors cursor-pointer"
              >
                ← Back
              </button>
            ) : (
              <Link href="/membership" className="font-[family-name:var(--font-dm-sans)] text-sm text-[#99907e] hover:text-[#e6c364] transition-colors cursor-pointer">
                ← Change Plan
              </Link>
            )}
            <button
              type="button"
              onClick={() => {
                if (currentStep < 3) setCurrentStep((s) => s + 1);
              }}
              className="flex items-center gap-3 bg-[#e6c364] text-[#3d2e00] font-[family-name:var(--font-bebas-neue)] text-xl px-10 py-4 gold-shimmer tracking-widest uppercase transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              {currentStep === 3 ? "Complete Purchase" : "Continue"}
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* ─── Order Summary ─── */}
        <ScrollReveal className="lg:col-span-4" delay={0.1}>
          <div className="bg-[#1e1b15] border border-[#4d4637]/20 rounded-lg p-8 sticky top-28">
            <h3 className="font-[family-name:var(--font-bebas-neue)] text-2xl tracking-wider mb-8 pb-4 border-b border-[#4d4637]/30">
              ORDER SUMMARY
            </h3>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-[family-name:var(--font-dm-sans)] text-sm text-[#d0c5b2]">PRO Membership</span>
                <span className="font-[family-name:var(--font-mono)] font-medium">₹{basePrice.toLocaleString()}</span>
              </div>
              <span className="font-[family-name:var(--font-dm-sans)] text-[10px] font-bold uppercase tracking-[0.1em] text-[#e6c364] bg-[#e6c364]/10 px-2 py-1 w-fit">
                FULL EXPERIENCE
              </span>

              {selectedAddOns.length > 0 && (
                <div className="pt-4 border-t border-[#4d4637]/20 space-y-2">
                  {addOns
                    .filter((a) => selectedAddOns.includes(a.id))
                    .map((a) => (
                      <div key={a.id} className="flex justify-between items-center">
                        <span className="font-[family-name:var(--font-dm-sans)] text-xs text-[#99907e]">{a.label}</span>
                        <span className="font-[family-name:var(--font-mono)] text-sm text-[#e6c364]">+₹{a.price}</span>
                      </div>
                    ))}
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-[#4d4637]/30">
              <div className="flex justify-between items-baseline mb-8">
                <span className="font-[family-name:var(--font-dm-sans)] text-xs font-bold uppercase tracking-[0.1em] text-[#99907e]">MONTHLY TOTAL</span>
                <motion.span
                  key={total}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-[family-name:var(--font-mono)] text-3xl font-medium text-[#e6c364]"
                >
                  ₹{total.toLocaleString()}
                </motion.span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#99907e]">
                  <ShieldCheck size={14} className="text-[#e6c364]" />
                  <span className="font-[family-name:var(--font-dm-sans)] text-xs">30-day money-back guarantee</span>
                </div>
                <div className="flex items-center gap-2 text-[#99907e]">
                  <CreditCard size={14} className="text-[#e6c364]" />
                  <span className="font-[family-name:var(--font-dm-sans)] text-xs">All major cards accepted</span>
                </div>
                <div className="flex items-center gap-2 text-[#99907e]">
                  <Lock size={14} className="text-[#e6c364]" />
                  <span className="font-[family-name:var(--font-dm-sans)] text-xs">Cancel anytime, no hidden fees</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
