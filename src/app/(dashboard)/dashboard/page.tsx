"use client";

import { useState } from "react";
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
} from "lucide-react";
import { mockDashboardBookings, mockBillingHistory } from "@/lib/mockData";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function DashboardPage() {
  const [isTitanium, setIsTitanium] = useState(false);
  const [classesList, setClassesList] = useState(mockDashboardBookings);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const handleUpgrade = () => {
    setIsTitanium(true);
    triggerFeedback("Welcome to Titanium Status! Tier updated successfully.");
  };

  const handleReschedule = (bookingId: string, className: string) => {
    triggerFeedback(`Reschedule request submitted for ${className}`);
  };

  const handleDownload = (invoiceId: string) => {
    triggerFeedback(`Receipt ${invoiceId} downloaded successfully.`);
  };

  const triggerFeedback = (msg: string) => {
    setFeedbackMessage(msg);
    setTimeout(() => {
      setFeedbackMessage(null);
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Toast Alert Feedback */}
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
            <span className="px-4 py-1 bg-primary text-on-primary font-dm-sans text-[10px] font-bold tracking-widest rounded-full uppercase">
              ACTIVE
            </span>
          </div>
          <div className="relative z-10 space-y-4">
            <h3 className="font-dm-sans text-xs font-bold text-on-surface-variant uppercase tracking-[0.2em]">
              CURRENT PLAN
            </h3>
            <h4 className="font-bebas text-4xl md:text-5xl text-primary tracking-wide">
              {isTitanium ? "TITANIUM MEMBER" : "PRO MEMBER"}
            </h4>
            <p className="font-dm-sans text-sm md:text-base max-w-md opacity-80 leading-relaxed text-on-surface-variant">
              {isTitanium
                ? "Full unrestricted access to global Titanium lounges, private coaching modules, biometric analysis labs, and specialized recovery chambers."
                : "Access to all elite locations, private recovery suites, and unlimited high-intensity tactical training classes."}
            </p>
            <div className="pt-8 flex flex-wrap gap-12">
              <div className="flex flex-col">
                <span className="font-dm-sans text-[10px] font-bold text-on-surface-variant tracking-wider uppercase">
                  JOINED
                </span>
                <span className="font-mono text-2xl text-on-background">MAR &apos;23</span>
              </div>
              <div className="flex flex-col">
                <span className="font-dm-sans text-[10px] font-bold text-on-surface-variant tracking-wider uppercase">
                  TIER
                </span>
                <span className="font-cormorant text-2xl text-on-background italic font-semibold capitalize">
                  {isTitanium ? "Titanium Elite" : "Elite"}
                </span>
              </div>
            </div>
          </div>

          {/* Visual abstract lines background overlay */}
          <div className="absolute bottom-0 right-0 w-1/2 h-full opacity-5 pointer-events-none bg-[linear-gradient(to_top_right,#C9A84C_1px,transparent_1px)] bg-[size:20px_20px] transition-opacity group-hover:opacity-10 duration-700"></div>
        </div>

        {/* Quick Stats Cards */}
        <div className="lg:col-span-4 flex flex-col gap-gutter">
          <div className="bg-surface-container-high border border-outline-variant/30 p-6 rounded-sm flex flex-col justify-between h-full group hover:border-primary/30 transition-all duration-300">
            <div className="flex justify-between items-start">
              <CalendarCheck className="text-primary w-6 h-6" />
              <span className="font-dm-sans text-[10px] text-on-surface-variant tracking-wider font-bold">MONTHLY</span>
            </div>
            <div className="mt-4">
              <h5 className="font-dm-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                Classes Booked
              </h5>
              <span className="font-mono text-4xl font-medium text-on-background">08</span>
            </div>
          </div>

          <div className="bg-surface-container-high border border-outline-variant/30 p-6 rounded-sm flex flex-col justify-between h-full group hover:border-primary/30 transition-all duration-300">
            <div className="flex justify-between items-start">
              <TrendingUp className="text-primary w-6 h-6" />
              <span className="font-dm-sans text-[10px] text-on-surface-variant tracking-wider font-bold">LIFETIME</span>
            </div>
            <div className="mt-4">
              <h5 className="font-dm-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                Sessions Attended
              </h5>
              <span className="font-mono text-4xl font-medium text-on-background">24</span>
            </div>
          </div>
        </div>
      </section>

      {/* Renewal Section */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
        <div className="bg-surface-container border border-outline-variant/30 rounded-sm p-6 flex items-center justify-between col-span-1 md:col-span-2">
          <div className="space-y-1">
            <h5 className="font-dm-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
              Days Until Renewal
            </h5>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-4xl font-medium text-primary">18</span>
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
                strokeDasharray="213.6"
                strokeDashoffset="59.8"
                strokeWidth="4"
                className="transition-all duration-1000 ease-out"
              ></circle>
            </svg>
            <span className="absolute font-mono text-base text-on-background font-medium">72%</span>
          </div>
        </div>

        {!isTitanium ? (
          <button
            onClick={handleUpgrade}
            className="md:col-span-2 bg-primary text-on-primary font-bebas text-xl md:text-2xl uppercase tracking-widest rounded-sm gold-shimmer transition-all duration-300 flex items-center justify-center gap-4 py-6 group cursor-pointer"
          >
            UPGRADE TO TITANIUM
            <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
          </button>
        ) : (
          <div className="md:col-span-2 border border-primary/30 bg-primary/10 rounded-sm flex items-center justify-center py-6 text-primary gap-3">
            <Award className="w-6 h-6 animate-bounce" />
            <span className="font-bebas text-xl md:text-2xl tracking-widest">TITANIUM MEMBERSHIP ACTIVE</span>
          </div>
        )}
      </section>

      {/* Data Tables */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        {/* Upcoming Classes */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-primary/20 pb-4">
            <h3 className="font-bebas text-2xl tracking-wider uppercase">UPCOMING CLASSES</h3>
            <span className="font-dm-sans text-xs font-bold text-primary cursor-pointer hover:underline">
              VIEW ALL
            </span>
          </div>
          <div className="space-y-4">
            {classesList.map((item) => (
              <div
                key={item.id}
                className="group bg-surface-container/50 border border-outline-variant/30 p-5 rounded-sm flex flex-col sm:flex-row sm:items-center gap-6 hover:bg-surface-container transition-all duration-300"
              >
                <div className="flex flex-row sm:flex-col items-center justify-center w-full sm:w-16 h-16 bg-surface-container-highest border border-primary/30 rounded-sm gap-2 sm:gap-0">
                  <span className="font-dm-sans text-[10px] font-bold text-on-surface-variant uppercase">
                    {item.classDate.split(" ")[0]}
                  </span>
                  <span className="font-mono text-2xl leading-none text-primary">
                    {item.classDate.split(" ")[1]}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bebas text-xl tracking-wide group-hover:text-primary transition-colors text-on-surface uppercase">
                    {item.className}
                  </h4>
                  <div className="flex items-center gap-4 text-on-surface-variant text-xs font-dm-sans mt-2">
                    <span className="flex items-center gap-1">
                      <Clock size={14} className="text-primary/70" />
                      {item.startTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <User size={14} className="text-primary/70" />
                      {item.trainerName}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleReschedule(item.id, item.className)}
                  className="px-4 py-2.5 border border-outline-variant hover:border-primary text-on-background font-dm-sans text-[10px] font-bold tracking-widest rounded-sm transition-all duration-300 uppercase shrink-0"
                >
                  RESCHEDULE
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Payments (Billing History) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-primary/20 pb-4">
            <h3 className="font-bebas text-2xl tracking-wider uppercase">BILLING HISTORY</h3>
            <span className="font-dm-sans text-xs font-bold text-primary cursor-pointer hover:underline">
              REPORTS
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
                  {mockBillingHistory.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-surface-container/80 transition-colors font-dm-sans text-sm"
                    >
                      <td className="p-5 text-on-surface font-medium">{row.description}</td>
                      <td className="p-5 text-on-surface-variant">{row.date}</td>
                      <td className="p-5 font-mono text-primary font-medium text-base">
                        ₹{(row.amount * 80).toLocaleString()}
                      </td>
                      <td className="p-5 text-right">
                        <button
                          onClick={() => handleDownload(row.id)}
                          className="text-on-surface-variant hover:text-primary transition-colors p-1"
                          aria-label="Download Receipt"
                        >
                          <Download size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
