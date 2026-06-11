"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  Download,
  Check,
  TrendingUp,
  CalendarCheck,
  Award,
  CreditCard,
  Dumbbell,
  Mail,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/components/providers/AuthProvider";

interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface MembershipData {
  status: string;
  endDate: string | null;
  plan: {
    name: string;
    monthlyPrice: number;
    features: string;
  } | null;
}

interface BookingData {
  id: string;
  classDate: string;
  startTime: string;
  status: string;
  gymClass: {
    name: string;
    type: string;
    trainerName: string;
    duration: number;
  };
}

interface PaymentData {
  id: string;
  description: string;
  amount: number;
  status: string;
  createdAt: string;
}

export default function DashboardPage() {
  const { user: sessionUser, membership, loading: authLoading } = useAuth();
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [payments, setPayments] = useState<PaymentData[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const triggerFeedback = (msg: string) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!sessionUser) return;
      setDataLoading(true);
      try {
        const [bookingsRes, paymentsRes] = await Promise.all([
          fetch("/api/bookings"),
          fetch("/api/payments"),
        ]);

        const bookingsData = await bookingsRes.json();
        const paymentsData = await paymentsRes.json();

        if (bookingsData.bookings) setBookings(bookingsData.bookings);
        if (paymentsData.payments) setPayments(paymentsData.payments);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setDataLoading(false);
      }
    };

    fetchDashboardData();
  }, [sessionUser]);

  const handleCancelBooking = async (bookingId: string, className: string) => {
    if (!confirm(`Cancel your booking for "${className}"?`)) return;
    setCancellingId(bookingId);
    try {
      const res = await fetch(`/api/bookings?id=${bookingId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b.id !== bookingId));
        triggerFeedback(`Booking for "${className}" cancelled successfully.`);
      }
    } catch (err) {
      console.error("Cancel failed", err);
    } finally {
      setCancellingId(null);
    }
  };

  const handleDownload = (invoiceId: string) => {
    triggerFeedback(`Receipt ${invoiceId.slice(0, 8)}… prepared for download.`);
  };

  // Compute days left on membership
  const daysLeft = (() => {
    if (!membership?.endDate) return 0;
    const diff =
      new Date(membership.endDate).getTime() - new Date().getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  })();

  const totalDays = 30;
  const progressPct = membership?.status === "ACTIVE" ? Math.min(
    100,
    Math.round(((totalDays - daysLeft) / totalDays) * 100)
  ) : 0;

  // SVG circle math (r=34, circumference ≈ 213.6)
  const circ = 213.628;
  const dashOffset = circ - (progressPct / 100) * circ;

  const hasActiveMembership = membership && membership.status === "ACTIVE";

  const loading = authLoading || (sessionUser && dataLoading);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3 text-primary">
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
        <span className="font-dm-sans text-xs tracking-widest uppercase">
          Loading Your Forge Profile...
        </span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-16">
      {/* Toast Feedback */}
      {feedbackMessage && (
        <div className="fixed bottom-8 right-8 bg-[#221f19] border border-primary text-primary px-6 py-4 rounded-sm shadow-[0_0_30px_rgba(201,168,76,0.2)] z-50 flex items-center gap-3 animate-fade-up font-dm-sans text-sm">
          <Check size={18} className="shrink-0" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* Hero Bento Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Membership Status Card */}
        <div className="lg:col-span-8 bg-surface-container border border-outline-variant/30 rounded-sm p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8">
            <span
              className={`px-4 py-1 font-dm-sans text-[10px] font-bold tracking-widest rounded-full uppercase ${
                hasActiveMembership
                  ? "bg-primary text-on-primary"
                  : "bg-error/20 text-error border border-error/30"
              }`}
            >
              {hasActiveMembership ? "Active Membership Plan" : "No Active Membership"}
            </span>
          </div>
          <div className="relative z-10 space-y-4">
            <h3 className="font-dm-sans text-xs font-bold text-on-surface-variant uppercase tracking-[0.2em]">
              CURRENT PLAN
            </h3>
            <h4 className="font-bebas text-4xl md:text-5xl text-primary tracking-wide">
              {hasActiveMembership && membership?.plan?.name
                ? `${membership.plan.name.toUpperCase()} MEMBER`
                : "NO ACTIVE MEMBERSHIP"}
            </h4>
            <p className="font-dm-sans text-sm md:text-base max-w-md opacity-80 leading-relaxed text-on-surface-variant">
              {hasActiveMembership && membership?.plan
                ? `Full access to all IronForge facilities, premium coaching, and unlimited class bookings with your ${membership.plan.name} tier.`
                : "You don't have an active membership. Visit the membership page to subscribe to a plan."}
            </p>
            <div className="pt-8 flex flex-wrap gap-12">
              <div className="flex flex-col">
                <span className="font-dm-sans text-[10px] font-bold text-on-surface-variant tracking-wider uppercase">
                  MEMBER
                </span>
                <span className="font-mono text-xl text-on-background">
                  {sessionUser?.name?.split(" ")[0] ?? "—"}
                </span>
              </div>
              {hasActiveMembership && membership?.plan && (
                <div className="flex flex-col">
                  <span className="font-dm-sans text-[10px] font-bold text-on-surface-variant tracking-wider uppercase">
                     MONTHLY RATE
                  </span>
                  <span className="font-mono text-xl text-primary">
                    ₹{membership.plan.monthlyPrice.toLocaleString()}
                  </span>
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-dm-sans text-[10px] font-bold text-on-surface-variant tracking-wider uppercase">
                  SESSIONS
                </span>
                <span className="font-mono text-xl text-on-background">
                  {bookings.length}
                </span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-1/2 h-full opacity-5 pointer-events-none bg-[linear-gradient(to_top_right,#C9A84C_1px,transparent_1px)] bg-[size:20px_20px] transition-opacity group-hover:opacity-10 duration-700"></div>
        </div>

        {/* Quick Stats */}
        <div className="lg:col-span-4 flex flex-col gap-gutter">
          <div className="bg-surface-container-high border border-outline-variant/30 p-6 rounded-sm flex flex-col justify-between h-full group hover:border-primary/30 transition-all duration-300">
            <div className="flex justify-between items-start">
              <CalendarCheck className="text-primary w-6 h-6" />
              <span className="font-dm-sans text-[10px] text-on-surface-variant tracking-wider font-bold">
                LIFETIME
              </span>
            </div>
            <div className="mt-4">
              <h5 className="font-dm-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                Classes Booked
              </h5>
              <span className="font-mono text-4xl font-medium text-on-background">
                {String(bookings.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          <div className="bg-surface-container-high border border-outline-variant/30 p-6 rounded-sm flex flex-col justify-between h-full group hover:border-primary/30 transition-all duration-300">
            <div className="flex justify-between items-start">
              <TrendingUp className="text-primary w-6 h-6" />
              <span className="font-dm-sans text-[10px] text-on-surface-variant tracking-wider font-bold">
                BILLING
              </span>
            </div>
            <div className="mt-4">
              <h5 className="font-dm-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                Transactions
              </h5>
              <span className="font-mono text-4xl font-medium text-on-background">
                {String(payments.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Profile & Renewal Section */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
        {/* Days Left Progress */}
        <div className="bg-surface-container border border-outline-variant/30 rounded-sm p-6 flex items-center justify-between col-span-1 md:col-span-2">
          {hasActiveMembership ? (
            <>
              <div className="space-y-1">
                <h5 className="font-dm-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                  Days Until Renewal
                </h5>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-4xl font-medium text-primary">
                    {daysLeft}
                  </span>
                  <span className="font-dm-sans text-[10px] font-bold text-on-surface-variant uppercase">
                    DAYS LEFT
                  </span>
                </div>
              </div>
              <div className="w-20 h-20 relative flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    fill="transparent"
                    r="34"
                    stroke="#1E1B15"
                    strokeWidth="4"
                  ></circle>
                  <circle
                    cx="40"
                    cy="40"
                    fill="transparent"
                    r="34"
                    stroke="#C9A84C"
                    strokeDasharray={circ}
                    strokeDashoffset={dashOffset}
                    strokeWidth="4"
                    className="transition-all duration-1000 ease-out"
                  ></circle>
                </svg>
                <span className="absolute font-mono text-base text-on-background font-medium">
                  {progressPct}%
                </span>
              </div>
            </>
          ) : (
            <div className="space-y-2 flex-1">
              <h5 className="font-dm-sans text-[10px] font-bold text-error uppercase tracking-widest">
                MEMBERSHIP STATUS
              </h5>
              <p className="font-dm-sans text-xs text-on-surface-variant leading-relaxed">
                No active membership. Subscribing to an athletic plan will unlock bookings, billing history, and recovery zones.
              </p>
            </div>
          )}
        </div>

        <a
          href="/membership"
          className="md:col-span-2 bg-primary text-on-primary font-bebas text-xl md:text-2xl uppercase tracking-widest rounded-sm gold-shimmer transition-all duration-300 flex items-center justify-center gap-4 py-6 group cursor-pointer"
        >
          {hasActiveMembership ? "UPGRADE / RENEW MEMBERSHIP" : "VIEW MEMBERSHIP PLANS"}
          <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
        </a>
      </section>

      {/* User Profile Details section */}
      <section className="bg-surface-container/50 border border-outline-variant/30 p-8 rounded-sm">
        <h3 className="font-bebas text-2xl tracking-wider uppercase border-b border-primary/20 pb-4 mb-6">
          PROFILE INFORMATION
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-4 bg-surface-container p-4 rounded-sm">
            <User className="text-primary w-5 h-5 shrink-0" />
            <div>
              <span className="font-dm-sans text-[10px] font-bold text-on-surface-variant tracking-wider uppercase block">
                FULL NAME
              </span>
              <span className="font-dm-sans text-sm font-medium text-on-surface">
                {sessionUser?.name}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-surface-container p-4 rounded-sm">
            <Mail className="text-primary w-5 h-5 shrink-0" />
            <div>
              <span className="font-dm-sans text-[10px] font-bold text-on-surface-variant tracking-wider uppercase block">
                EMAIL ADDRESS
              </span>
              <span className="font-dm-sans text-sm font-medium text-on-surface">
                {sessionUser?.email}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-surface-container p-4 rounded-sm">
            <Award className="text-primary w-5 h-5 shrink-0" />
            <div>
              <span className="font-dm-sans text-[10px] font-bold text-on-surface-variant tracking-wider uppercase block">
                MEMBERSHIP STATUS
              </span>
              <span className="font-dm-sans text-sm font-medium text-on-surface">
                {hasActiveMembership ? "Active Membership Plan" : "No Active Membership"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Data Tables */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        {/* Booked Classes */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-primary/20 pb-4">
            <h3 className="font-bebas text-2xl tracking-wider uppercase">
              MY BOOKED CLASSES
            </h3>
            {hasActiveMembership && (
              <a
                href="/classes"
                className="font-dm-sans text-xs font-bold text-primary cursor-pointer hover:underline flex items-center gap-1"
              >
                <Dumbbell size={12} /> BROWSE ALL
              </a>
            )}
          </div>
          <div className="space-y-4">
            {hasActiveMembership ? (
              bookings.length > 0 ? (
                bookings.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    className="group bg-surface-container/50 border border-outline-variant/30 p-5 rounded-sm flex flex-col sm:flex-row sm:items-center gap-6 hover:bg-surface-container transition-all duration-300"
                  >
                    <div className="flex flex-row sm:flex-col items-center justify-center w-full sm:w-16 h-16 bg-surface-container-highest border border-primary/30 rounded-sm gap-2 sm:gap-0">
                      <span className="font-dm-sans text-[10px] font-bold text-on-surface-variant uppercase">
                        {item.classDate.split(" ")[0]}
                      </span>
                      <span className="font-mono text-2xl leading-none text-primary">
                        {item.classDate.split(" ")[1] ?? item.classDate}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bebas text-xl tracking-wide group-hover:text-primary transition-colors text-on-surface uppercase">
                        {item.gymClass.name}
                      </h4>
                      <div className="flex items-center gap-4 text-on-surface-variant text-xs font-dm-sans mt-2">
                        <span className="flex items-center gap-1">
                          <Clock size={14} className="text-primary/70" />
                          {item.startTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <User size={14} className="text-primary/70" />
                          {item.gymClass.trainerName}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        handleCancelBooking(item.id, item.gymClass.name)
                      }
                      disabled={cancellingId === item.id}
                      className="px-4 py-2.5 border border-outline-variant hover:border-error text-on-background hover:text-error font-dm-sans text-[10px] font-bold tracking-widest rounded-sm transition-all duration-300 uppercase shrink-0 cursor-pointer disabled:opacity-50"
                    >
                      {cancellingId === item.id ? "CANCELLING..." : "CANCEL"}
                    </button>
                  </div>
                ))
              ) : (
                <div className="border border-outline-variant/20 rounded-sm p-10 text-center space-y-3">
                  <Calendar size={32} className="text-primary/30 mx-auto" />
                  <p className="font-dm-sans text-xs text-on-surface-variant uppercase tracking-widest">
                    No classes booked yet
                  </p>
                  <a
                    href="/classes"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 text-primary font-dm-sans text-xs font-bold tracking-wider uppercase rounded-sm hover:bg-primary/20 transition-all"
                  >
                    <Dumbbell size={12} /> Browse Classes
                  </a>
                </div>
              )
            ) : (
              <div className="border border-error/20 bg-error/5 rounded-sm p-8 text-center space-y-4">
                <ShieldAlert size={32} className="text-error mx-auto" />
                <p className="font-dm-sans text-xs text-on-surface-variant uppercase tracking-widest">
                  Gym Booking Access Blocked
                </p>
                <p className="font-dm-sans text-xs text-on-surface-variant max-w-sm mx-auto leading-relaxed normal-case">
                  Please subscribe to one of our premium tiers to enable booking permissions.
                </p>
                <a
                  href="/membership"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-on-primary font-dm-sans text-xs font-bold tracking-wider uppercase rounded-sm hover:opacity-90 transition-all cursor-pointer"
                >
                  View Membership Plans
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Billing History */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-primary/20 pb-4">
            <h3 className="font-bebas text-2xl tracking-wider uppercase">
              BILLING HISTORY
            </h3>
            <span className="font-dm-sans text-xs font-bold text-primary flex items-center gap-1">
              <CreditCard size={12} /> REPORTS
            </span>
          </div>
          <div className="bg-surface-container/50 border border-outline-variant/30 rounded-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-highest/30 border-b border-outline-variant/20">
                    <th className="p-5 font-dm-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                      Description
                    </th>
                    <th className="p-5 font-dm-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                      Date
                    </th>
                    <th className="p-5 font-dm-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                      Amount
                    </th>
                    <th className="p-5 font-dm-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-right">
                      Receipt
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {payments.length > 0 ? (
                    payments.map((row) => (
                      <tr
                        key={row.id}
                        className="hover:bg-surface-container/80 transition-colors font-dm-sans text-sm"
                      >
                        <td className="p-5 text-on-surface font-medium">
                          {row.description}
                        </td>
                        <td className="p-5 text-on-surface-variant">
                          {new Date(row.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td className="p-5 font-mono text-primary font-medium text-base">
                          ₹{row.amount.toLocaleString()}
                        </td>
                        <td className="p-5 text-right">
                          <button
                            onClick={() => handleDownload(row.id)}
                            className="text-on-surface-variant hover:text-primary transition-colors p-1 cursor-pointer"
                            aria-label="Download Receipt"
                          >
                            <Download size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="p-10 text-center font-dm-sans text-on-surface-variant/40 uppercase tracking-widest text-xs"
                      >
                        No billing transactions found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
