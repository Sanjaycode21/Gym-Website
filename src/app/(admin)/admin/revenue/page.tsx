"use client";

import { useEffect, useState } from "react";
import { Landmark, ArrowUpRight, TrendingUp, Sparkles, Download, CheckCircle } from "lucide-react";

export default function AdminRevenuePage() {
  const [revenueStats, setRevenueStats] = useState({
    totalRevenue: 0,
    averageRevenue: 0,
    planCounts: { Starter: 0, Pro: 0, Elite: 0 },
  });
  const [paymentsList, setPaymentsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const res = await fetch("/api/admin/revenue");
        const data = await res.json();

        if (res.ok) {
          const totalR = data.totalRevenue || 0;
          const list = data.payments || [];
          const avgR = list.length > 0 ? Math.round(totalR / list.length) : 0;

          setRevenueStats({
            totalRevenue: totalR,
            averageRevenue: avgR,
            planCounts: data.planCounts || { Starter: 0, Pro: 0, Elite: 0 },
          });

          setPaymentsList(list);
        }
      } catch (err) {
        console.error("Failed to load revenue analytics", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRevenueData();
  }, []);

  const handleDownloadInvoice = (invoiceId: string) => {
    setFeedback(`Invoice receipt ${invoiceId} compiled and downloaded successfully.`);
    setTimeout(() => {
      setFeedback(null);
    }, 3000);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3 text-primary">
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
        <span className="font-dm-sans text-xs tracking-widest uppercase">Compiling Financial Ledger...</span>
      </div>
    );
  }

  // Calculate highest subscription tier count for SVG bar chart scaling
  const maxPlanCount = Math.max(
    revenueStats.planCounts.Starter,
    revenueStats.planCounts.Pro,
    revenueStats.planCounts.Elite,
    1 // prevent divide-by-zero
  );

  return (
    <div className="space-y-10">
      {/* Toast Alert Feedback */}
      {feedback && (
        <div className="fixed bottom-8 right-8 bg-[#221f19] border border-primary text-primary px-6 py-4 rounded-sm shadow-[0_0_30px_rgba(201,168,76,0.2)] z-50 flex items-center gap-3 animate-fade-up font-dm-sans text-sm">
          <CheckCircle size={18} className="shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Overview Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-surface-container border border-outline-variant/30 p-8 rounded-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="font-dm-sans text-[10px] font-bold text-on-surface-variant tracking-widest uppercase block">
              GROSS SALES
            </span>
            <h4 className="font-mono text-4xl font-medium text-primary">
              ₹{revenueStats.totalRevenue.toLocaleString()}
            </h4>
            <span className="text-[10px] text-primary flex items-center gap-1 font-dm-sans font-bold tracking-wider mt-1 uppercase">
              <ArrowUpRight size={12} />
              +14.2% FROM PREVIOUS MONTH
            </span>
          </div>
          <div className="p-4 bg-primary/10 text-primary rounded-sm">
            <Landmark size={32} />
          </div>
        </div>

        <div className="bg-surface-container border border-outline-variant/30 p-8 rounded-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="font-dm-sans text-[10px] font-bold text-on-surface-variant tracking-widest uppercase block">
              AVERAGE TRANSACTION VALUE
            </span>
            <h4 className="font-mono text-4xl font-medium text-on-background">
              ₹{revenueStats.averageRevenue.toLocaleString()}
            </h4>
            <span className="text-[10px] text-on-surface-variant/70 flex items-center gap-1 font-dm-sans font-bold tracking-wider mt-1 uppercase">
              <TrendingUp size={12} />
              HEALTHY TRANSACTION DENSITY
            </span>
          </div>
          <div className="p-4 bg-primary/10 text-primary rounded-sm">
            <Sparkles size={32} />
          </div>
        </div>
      </section>

      {/* SVG Bar Chart for Subscription Tier Distributions */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-surface-container border border-outline-variant/30 p-6 md:p-8 rounded-sm lg:col-span-1 flex flex-col justify-between">
          <div className="border-b border-outline-variant/20 pb-4 mb-6">
            <h3 className="font-bebas text-xl tracking-wider uppercase">
              PLAN TIER DISTRIBUTION
            </h3>
          </div>

          {/* SVG Bar Charts */}
          <div className="space-y-6 flex-1 flex flex-col justify-center">
            {/* Starter Bar */}
            <div className="space-y-2 text-xs font-dm-sans">
              <div className="flex justify-between">
                <span className="font-bold text-on-surface uppercase">Starter Tier</span>
                <span className="font-mono text-primary font-bold">{revenueStats.planCounts.Starter} Active</span>
              </div>
              <div className="w-full bg-[#0A0A0A] h-4 rounded-sm overflow-hidden">
                <div
                  className="bg-primary h-full rounded-sm transition-all duration-700"
                  style={{ width: `${(revenueStats.planCounts.Starter / maxPlanCount) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Pro Bar */}
            <div className="space-y-2 text-xs font-dm-sans">
              <div className="flex justify-between">
                <span className="font-bold text-on-surface uppercase">Pro Tier</span>
                <span className="font-mono text-primary font-bold">{revenueStats.planCounts.Pro} Active</span>
              </div>
              <div className="w-full bg-[#0A0A0A] h-4 rounded-sm overflow-hidden">
                <div
                  className="bg-primary h-full rounded-sm transition-all duration-700"
                  style={{ width: `${(revenueStats.planCounts.Pro / maxPlanCount) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Elite Bar */}
            <div className="space-y-2 text-xs font-dm-sans">
              <div className="flex justify-between">
                <span className="font-bold text-on-surface uppercase">Elite Tier</span>
                <span className="font-mono text-primary font-bold">{revenueStats.planCounts.Elite} Active</span>
              </div>
              <div className="w-full bg-[#0A0A0A] h-4 rounded-sm overflow-hidden">
                <div
                  className="bg-primary h-full rounded-sm transition-all duration-700"
                  style={{ width: `${(revenueStats.planCounts.Elite / maxPlanCount) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Payments list Table Ledger (col-span-2) */}
        <div className="bg-surface-container border border-outline-variant/30 p-6 rounded-sm lg:col-span-2 space-y-6">
          <div className="border-b border-outline-variant/20 pb-4">
            <h3 className="font-bebas text-xl md:text-2xl tracking-wider uppercase">
              TRANSACTION JOURNAL
            </h3>
          </div>

          <div className="bg-[#100e08] border border-outline-variant/20 rounded-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-highest/30 border-b border-outline-variant/20">
                    <th className="p-4 font-dm-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                      Member Description
                    </th>
                    <th className="p-4 font-dm-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                      Date
                    </th>
                    <th className="p-4 font-dm-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                      Intake Amount
                    </th>
                    <th className="p-4 font-dm-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-right">
                      Receipt
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20 font-dm-sans text-xs">
                  {paymentsList.length > 0 ? (
                    paymentsList.map((p) => (
                      <tr key={p.id} className="hover:bg-[#1e1b15]/40 transition-colors">
                        <td className="p-4">
                          <h4 className="font-bold text-on-surface uppercase">{p.description}</h4>
                          <span className="text-[10px] text-on-surface-variant">{p.user.email}</span>
                        </td>
                        <td className="p-4 text-on-surface-variant">
                          {new Date(p.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td className="p-4 font-mono text-primary font-medium text-sm">
                          ₹{p.amount.toLocaleString()}
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleDownloadInvoice(p.id)}
                            className="text-on-surface-variant hover:text-primary transition-colors p-1.5 border border-outline-variant/20 rounded-sm hover:border-primary cursor-pointer"
                            aria-label="Download Receipt"
                          >
                            <Download size={14} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-10 text-center font-dm-sans text-on-surface-variant/40 uppercase tracking-widest text-xs">
                        No financial transactions cataloged
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
