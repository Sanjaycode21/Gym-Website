"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, ChevronDown, Utensils, Lock, Dumbbell } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GoldDivider from "@/components/ui/GoldDivider";
import { useAuth } from "@/components/providers/AuthProvider";

const plans = [
  {
    id: "starter",
    tier: "BASIC ACCESS",
    name: "STARTER",
    monthlyPrice: 999,
    annualPrice: 799,
    featured: false,
    features: [
      { text: "Access to open gym and barbell platforms", included: true },
      { text: "Full locker room and shower access", included: true },
      { text: "Complimentary sweat towel service", included: true },
      { text: "No guest passes", included: false },
    ],
    cta: "Select Starter",
  },
  {
    id: "pro",
    tier: "STANDARD MEMBERSHIP",
    name: "PRO",
    monthlyPrice: 1799,
    annualPrice: 1439,
    featured: true,
    features: [
      { text: "All Starter tier access", included: true },
      { text: "Unlimited access to group classes", included: true },
      { text: "Infrared sauna and cold plunge access", included: true },
      { text: "2 guest day-passes per month", included: true },
    ],
    cta: "Select Pro",
  },
  {
    id: "elite",
    tier: "PREMIUM ACCESS",
    name: "ELITE",
    monthlyPrice: 2999,
    annualPrice: 2399,
    featured: false,
    features: [
      { text: "All Pro tier access", included: true },
      { text: "Private day locker and laundry service", included: true },
      { text: "1-on-1 monthly training assessment", included: true },
      { text: "10% discount on guest passes and retail", included: true },
    ],
    cta: "Select Elite",
  },
];

const comparisonRows = [
  { feature: "24/7 Gym Access", starter: "✓", pro: "✓", elite: "✓" },
  { feature: "Olympic Lifting Platform", starter: "✗", pro: "✓", elite: "✓" },
  { feature: "High-Intensity Classes", starter: "2 / Mo", pro: "Unlimited", elite: "Unlimited" },
  { feature: "Sauna & Steam Bath", starter: "Pay per use", pro: "✓", elite: "✓" },
  { feature: "Coach Consultation", starter: "No", pro: "Monthly", elite: "Weekly" },
];

const addons = [
  {
    icon: <Dumbbell size={40} />,
    title: "PERSONAL TRAINING",
    desc: "Get customized instruction and workout plans from our certified strength coaches.",
    price: "From ₹1,200 / hr",
    span: "col-span-2",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxKZYzKOKQ9iNOCI79TLv6OdmgAWT7QeNNMsYJoI3ciV1UJunF1ivi2pfYlinXbtEKTOPRmwnCAFFQTUQEGA4lHfG4-qDvYAy787Lu-C5EHBCXqpto2b8zyF-D2TcFO-4t98y_HzeUGLriKoYTxqky_XD9ei5KbhbZybpMy3UxuXfSv9jP1NAhpBi3mn_fMcRvL0nWVGgtsdXnf27DLwOMLnZ0nX4CrFL5i97qaEuJqq07TNhU9apd83LSyM4smA_BhTG1ctW3Jtz5",
  },
  {
    icon: <Utensils size={40} />,
    title: "NUTRITION",
    desc: "Get structured meal plans and calorie guides from our nutrition coaches.",
    price: "+₹500 / MO",
    span: "col-span-1",
  },
  {
    icon: <Lock size={40} />,
    title: "LOCKER",
    desc: "Keep your lifting belt, shoes, and gear in a secure, designated locker.",
    price: "+₹300 / MO",
    span: "col-span-1",
  },
];

const faqs = [
  {
    q: "Can I pause my membership?",
    a: "Yes, members can pause their membership for up to 3 months in a calendar year for a small administrative fee.",
  },
  {
    q: "What are the guest pass rules?",
    a: "Pro and Elite members receive complimentary guest passes each month. Guests need to check in at reception and sign a safety waiver.",
  },
  {
    q: "Is there a cancellation fee?",
    a: "Monthly plans can be cancelled anytime with a 30-day notice. Annual memberships are a 12-month commitment and cannot be cancelled early without a fee.",
  },
  {
    q: "How do I book personal training?",
    a: "You can schedule training sessions directly with your coach, through the member portal, or at the front desk.",
  },
  {
    q: "Is parking provided?",
    a: "Complimentary parking is available for all members in our designated parking lot. Just scan your membership card at the gate.",
  },
];

export default function MembershipPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { user, membership } = useAuth();

  return (
    <>
      {/* Hero & Breadcrumb */}
      <section className="pt-32 pb-0 px-10">
        <nav className="flex gap-2 font-[family-name:var(--font-dm-sans)] text-xs text-[#4d4637] mb-6 uppercase tracking-[0.1em]">
          <Link href="/" className="hover:text-[#e6c364] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#e6c364]">Membership</span>
        </nav>
        <h1 className="font-[family-name:var(--font-bebas-neue)] text-[80px] md:text-[96px] leading-none uppercase tracking-wider mb-12">
          Membership Plans
        </h1>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-6 mt-4 mb-20">
          <span
            className={`font-[family-name:var(--font-dm-sans)] text-xs tracking-[0.1em] font-bold uppercase transition-colors ${!isAnnual ? "text-[#e6c364]" : "text-[#99907e]"}`}
          >
            MONTHLY
          </span>
          <button
            id="billingToggle"
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative w-16 h-8 bg-[#221f19] rounded-full p-1 transition-all duration-300"
            aria-label="Toggle billing period"
          >
            <motion.div
              className="w-6 h-6 bg-[#e6c364] rounded-full"
              animate={{ x: isAnnual ? 32 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          </button>
          <span
            className={`font-[family-name:var(--font-dm-sans)] text-xs tracking-[0.1em] font-bold uppercase transition-colors ${isAnnual ? "text-[#e6c364]" : "text-[#99907e]"}`}
          >
            ANNUAL <span className="text-[#e6c364]">(Save 20%)</span>
          </span>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-10 max-w-7xl mx-auto mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {plans.map((plan, i) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
            
            const getPlanCTA = () => {
              if (!user) {
                return {
                  text: plan.cta,
                  href: `/login?redirect=/checkout?plan=${plan.id}`
                };
              }
              
              const hasActive = membership && membership.status === "ACTIVE";
              if (hasActive && membership.plan) {
                if (membership.plan.slug === plan.id) {
                  return {
                    text: "Renew Current Plan",
                    href: `/checkout?plan=${plan.id}`
                  };
                } else {
                  const tierOrder = ["starter", "pro", "elite"];
                  const currentIdx = tierOrder.indexOf(membership.plan.slug);
                  const planIdx = tierOrder.indexOf(plan.id);
                  if (planIdx > currentIdx) {
                    return {
                      text: `Upgrade to ${plan.name}`,
                      href: `/checkout?plan=${plan.id}`
                    };
                  } else {
                    return {
                      text: `Switch to ${plan.name}`,
                      href: `/checkout?plan=${plan.id}`
                    };
                  }
                }
              }
              
              return {
                text: plan.cta,
                href: `/checkout?plan=${plan.id}`
              };
            };

            const ctaInfo = getPlanCTA();

            return (
              <ScrollReveal key={plan.id} delay={i * 0.1}>
                <div
                  className={`relative flex flex-col p-10 border transition-all duration-500 h-full
                    ${plan.featured
                      ? "bg-[#221f19] border-2 border-[#e6c364] scale-105 shadow-2xl z-10"
                      : "bg-[#1e1b15] border-[#4d4637]/30 hover:border-[#e6c364]/50"
                    }`}
                >
                  {plan.featured && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#e6c364] text-[#3d2e00] font-[family-name:var(--font-dm-sans)] text-[10px] font-bold px-6 py-1 tracking-[0.2em] whitespace-nowrap uppercase">
                      MOST POPULAR
                    </div>
                  )}

                  <span
                    className={`font-[family-name:var(--font-dm-sans)] text-xs font-bold tracking-[0.1em] uppercase px-3 py-1 mb-6 w-fit
                      ${plan.featured ? "bg-[#e6c364]/20 text-[#e6c364]" : "bg-[#38342d] text-[#d0c5b2]"}`}
                  >
                    {plan.tier}
                  </span>

                  <h3 className="font-[family-name:var(--font-bebas-neue)] text-3xl tracking-wide mb-2">
                    {plan.name}
                  </h3>

                  <div className="flex items-baseline gap-1 mb-8">
                    <motion.span
                      key={`${plan.id}-${isAnnual}`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-[family-name:var(--font-mono)] text-[40px] font-medium leading-none text-[#e6c364]"
                    >
                      ₹{price.toLocaleString()}
                    </motion.span>
                    <span className="text-[#4d4637] font-[family-name:var(--font-dm-sans)] text-xs font-bold uppercase">/ MONTH</span>
                  </div>

                  <div className="space-y-4 mb-10 flex-1">
                    {plan.features.map((f, fi) => (
                      <div key={fi} className={`flex items-center gap-3 ${!f.included ? "opacity-30" : ""}`}>
                        {f.included
                          ? <CheckCircle size={20} className="text-[#e6c364] shrink-0" />
                          : <XCircle size={20} className="text-[#99907e] shrink-0" />
                        }
                        <span className="font-[family-name:var(--font-dm-sans)] text-sm">{f.text}</span>
                      </div>
                    ))}
                  </div>

                  <Link href={ctaInfo.href}>
                    <button
                      className={`w-full py-4 font-[family-name:var(--font-bebas-neue)] text-lg tracking-widest uppercase transition-all duration-300 cursor-pointer
                        ${plan.featured
                          ? "bg-[#e6c364] text-[#3d2e00] gold-shimmer"
                          : "border border-[#e6c364] text-[#e6c364] hover:bg-[#e6c364] hover:text-[#3d2e00]"
                        }`}
                    >
                      {ctaInfo.text}
                    </button>
                  </Link>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="px-10 py-24 bg-[#100e08]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="font-[family-name:var(--font-bebas-neue)] text-5xl text-center mb-16 uppercase tracking-wider">
              Detailed Comparison
            </h2>
          </ScrollReveal>
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left min-w-[650px] border-collapse">
              <thead>
                <tr className="border-b border-[#4d4637]/30">
                  <th className="py-6 pr-4 font-[family-name:var(--font-dm-sans)] text-xs font-bold uppercase tracking-[0.1em] text-[#4d4637] w-2/5">FEATURES</th>
                  <th className="py-6 px-4 font-[family-name:var(--font-bebas-neue)] text-2xl text-center w-1/5">STARTER</th>
                  <th className="py-6 px-4 font-[family-name:var(--font-bebas-neue)] text-2xl text-center text-[#e6c364] w-1/5">PRO</th>
                  <th className="py-6 px-4 font-[family-name:var(--font-bebas-neue)] text-2xl text-center w-1/5">ELITE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#4d4637]/10">
                {comparisonRows.map((row, i) => (
                  <tr key={i}>
                    <td className="py-6 pr-4 font-[family-name:var(--font-dm-sans)] text-sm">{row.feature}</td>
                    <td className="py-6 px-4 text-center font-[family-name:var(--font-dm-sans)] text-sm text-[#99907e]">
                      {row.starter === "✓" ? <CheckCircle size={18} className="mx-auto text-[#e6c364]" /> : row.starter === "✗" ? <XCircle size={18} className="mx-auto text-[#4d4637]" /> : row.starter}
                    </td>
                    <td className="py-6 px-4 text-center font-[family-name:var(--font-dm-sans)] text-sm">
                      {row.pro === "✓" ? <CheckCircle size={18} className="mx-auto text-[#e6c364]" /> : row.pro}
                    </td>
                    <td className="py-6 px-4 text-center font-[family-name:var(--font-dm-sans)] text-sm">
                      {row.elite === "✓" ? <CheckCircle size={18} className="mx-auto text-[#e6c364]" /> : row.elite}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Add-ons Bento */}
      <section className="px-10 py-24 max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 className="font-[family-name:var(--font-bebas-neue)] text-5xl mb-12 uppercase tracking-wider">
            Enhance Your Training
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Personal Training — spans 2 cols */}
          <ScrollReveal className="md:col-span-2">
            <div className="relative h-80 group overflow-hidden bg-[#221f19]">
              <div className="absolute inset-0 bg-black/40 z-10" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={addons[0].image}
                alt="Personal training"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                <h4 className="font-[family-name:var(--font-bebas-neue)] text-2xl text-white">{addons[0].title}</h4>
                <p className="text-[#d0c5b2] text-sm mb-4">{addons[0].desc}</p>
                <span className="text-[#e6c364] font-[family-name:var(--font-mono)] text-xl font-medium">{addons[0].price}</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Nutrition */}
          <ScrollReveal delay={0.1}>
            <div className="bg-[#221f19] p-8 flex flex-col justify-between border border-[#4d4637]/30 h-80">
              <Utensils size={40} className="text-[#e6c364]" />
              <div>
                <h4 className="font-[family-name:var(--font-bebas-neue)] text-2xl mb-2">NUTRITION</h4>
                <p className="text-[#d0c5b2] text-sm">Tailored meal plans and supplement guidance.</p>
              </div>
              <span className="text-[#e6c364] font-[family-name:var(--font-dm-sans)] text-xs font-bold uppercase tracking-[0.1em] mt-4">+₹500 / MO</span>
            </div>
          </ScrollReveal>

          {/* Locker */}
          <ScrollReveal delay={0.2}>
            <div className="bg-[#221f19] p-8 flex flex-col justify-between border border-[#4d4637]/30 h-80">
              <Lock size={40} className="text-[#e6c364]" />
              <div>
                <h4 className="font-[family-name:var(--font-bebas-neue)] text-2xl mb-2">LOCKER</h4>
                <p className="text-[#d0c5b2] text-sm">Personalized secure storage for your gear.</p>
              </div>
              <span className="text-[#e6c364] font-[family-name:var(--font-dm-sans)] text-xs font-bold uppercase tracking-[0.1em] mt-4">+₹300 / MO</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-10 py-24 bg-[#1e1b15]">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <h2 className="font-[family-name:var(--font-bebas-neue)] text-5xl text-center mb-16 uppercase tracking-wider">
              Frequently Asked Questions
            </h2>
          </ScrollReveal>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-[#4d4637]/30">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-[#38342d] transition-colors"
                >
                  <span className="font-[family-name:var(--font-bebas-neue)] text-xl tracking-wide">{faq.q}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="text-[#e6c364]" size={20} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden bg-[#0A0A0A] px-6"
                    >
                      <p className="py-6 text-[#d0c5b2] text-sm leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-10 text-center">
        <GoldDivider className="mb-12" />
        <ScrollReveal>
          <h2 className="font-[family-name:var(--font-bebas-neue)] text-[72px] md:text-[96px] leading-none uppercase mb-8">
            Ready to Train with Purpose?
          </h2>
          <p className="font-[family-name:var(--font-dm-sans)] text-lg text-[#99907e] max-w-2xl mx-auto mb-12">
            Train with professional-grade equipment, expert coaches, and structured programs designed to help you get results.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            {(() => {
              const getBottomCTA = () => {
                if (!user) {
                  return {
                    text: "Join The Forge",
                    href: "/login?redirect=/checkout?plan=pro"
                  };
                }
                const hasActive = membership && membership.status === "ACTIVE";
                if (hasActive) {
                  return {
                    text: "Go to Dashboard",
                    href: "/dashboard"
                  };
                }
                return {
                  text: "View Plans",
                  href: "#billingToggle"
                };
              };

              const bottomCTA = getBottomCTA();

              return (
                <Link href={bottomCTA.href}>
                  <button className="bg-[#e6c364] text-[#3d2e00] font-[family-name:var(--font-bebas-neue)] text-2xl px-12 py-5 gold-shimmer uppercase tracking-widest cursor-pointer">
                    {bottomCTA.text}
                  </button>
                </Link>
              );
            })()}
            <Link href="/contact">
              <button className="border border-white text-white font-[family-name:var(--font-bebas-neue)] text-2xl px-12 py-5 hover:bg-white hover:text-black transition-all uppercase tracking-widest cursor-pointer">
                Book A Tour
              </button>
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
