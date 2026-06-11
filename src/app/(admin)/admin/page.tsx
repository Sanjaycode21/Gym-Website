"use client";

import { useEffect, useState } from "react";
import { Users, CalendarRange, Landmark, ShieldCheck, Flame, BookOpen } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    activeMembers: 0,
    classesBooked: 0,
    monthlyRevenue: 0,
    attendanceRate: "88%",
  });
  const [classesList, setClassesList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch members count
        const membersRes = await fetch("/api/admin/members");
        const membersData = await membersRes.json();
        
        // Fetch revenue analytics
        const revenueRes = await fetch("/api/admin/revenue");
        const revenueData = await revenueRes.json();

        // Fetch classes
        const classesRes = await fetch("/api/classes");
        const classesData = await classesRes.json();

        const activeM = membersData.members ? membersData.members.length : 0;
        const totalPayments = revenueData.totalRevenue || 0;
        const classesCount = classesData.classes || [];

        // Count all bookings from database
        let totalBookings = 0;
        classesCount.forEach((c: any) => {
          totalBookings += (c.capacity - c.slotsLeft);
        });

        setStats({
          activeMembers: activeM,
          classesBooked: totalBookings,
          monthlyRevenue: totalPayments,
          attendanceRate: "92%",
        });

        setClassesList(classesCount);
      } catch (err) {
        console.error("Failed to load admin stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3 text-primary">
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
        <span className="font-dm-sans text-xs tracking-widest uppercase">Aggregating Admin KPIs...</span>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* KPI Cards Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface-container border border-outline-variant/30 p-6 rounded-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="font-dm-sans text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">
              Total Members
            </span>
            <h4 className="font-mono text-3xl font-medium text-on-background">
              {stats.activeMembers}
            </h4>
          </div>
          <div className="p-3 bg-primary/10 text-primary rounded-sm">
            <Users size={24} />
          </div>
        </div>

        <div className="bg-surface-container border border-outline-variant/30 p-6 rounded-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="font-dm-sans text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">
              Today&apos;s Bookings
            </span>
            <h4 className="font-mono text-3xl font-medium text-on-background">
              {stats.classesBooked}
            </h4>
          </div>
          <div className="p-3 bg-primary/10 text-primary rounded-sm">
            <CalendarRange size={24} />
          </div>
        </div>

        <div className="bg-surface-container border border-outline-variant/30 p-6 rounded-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="font-dm-sans text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">
              Gross Revenue
            </span>
            <h4 className="font-mono text-3xl font-medium text-primary">
              ₹{stats.monthlyRevenue.toLocaleString()}
            </h4>
          </div>
          <div className="p-3 bg-primary/10 text-primary rounded-sm">
            <Landmark size={24} />
          </div>
        </div>

        <div className="bg-surface-container border border-outline-variant/30 p-6 rounded-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="font-dm-sans text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">
              Attendance Rate
            </span>
            <h4 className="font-mono text-3xl font-medium text-on-background">
              {stats.attendanceRate}
            </h4>
          </div>
          <div className="p-3 bg-primary/10 text-primary rounded-sm">
            <ShieldCheck size={24} />
          </div>
        </div>
      </section>

      {/* SVG Analytics Chart Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-surface-container border border-outline-variant/30 p-6 md:p-8 rounded-sm">
          <div className="flex justify-between items-center mb-8 border-b border-outline-variant/20 pb-4">
            <h3 className="font-bebas text-xl md:text-2xl tracking-wider uppercase">
              WEEKLY CHECK-IN DENSITY
            </h3>
            <span className="font-dm-sans text-xs font-bold text-primary flex items-center gap-1.5">
              <Flame size={14} className="fill-primary text-primary" />
              PEAK ATTENDANCE
            </span>
          </div>

          {/* SVG Line Graph */}
          <div className="h-64 w-full relative">
            <svg viewBox="0 0 700 250" className="w-full h-full">
              {/* Grid Lines */}
              <line x1="50" y1="50" x2="650" y2="50" stroke="#4d4637" strokeOpacity="0.2" strokeWidth="1" />
              <line x1="50" y1="100" x2="650" y2="100" stroke="#4d4637" strokeOpacity="0.2" strokeWidth="1" />
              <line x1="50" y1="150" x2="650" y2="150" stroke="#4d4637" strokeOpacity="0.2" strokeWidth="1" />
              <line x1="50" y1="200" x2="650" y2="200" stroke="#4d4637" strokeOpacity="0.2" strokeWidth="1" />

              {/* Graph Line */}
              <path
                d="M 50 180 L 150 120 L 250 150 L 350 80 L 450 110 L 550 60 L 650 160"
                fill="none"
                stroke="#C9A84C"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Shading Area */}
              <path
                d="M 50 180 L 150 120 L 250 150 L 350 80 L 450 110 L 550 60 L 650 160 L 650 200 L 50 200 Z"
                fill="url(#goldGradient)"
                opacity="0.1"
              />

              {/* Gradients */}
              <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C9A84C" />
                  <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Dots */}
              <circle cx="50" cy="180" r="4" fill="#E6C364" />
              <circle cx="150" cy="120" r="4" fill="#E6C364" />
              <circle cx="250" cy="150" r="4" fill="#E6C364" />
              <circle cx="350" cy="80" r="4" fill="#E6C364" />
              <circle cx="450" cy="110" r="4" fill="#E6C364" />
              <circle cx="550" cy="60" r="4" fill="#E6C364" />
              <circle cx="650" cy="160" r="4" fill="#E6C364" />

              {/* X Axis Labels */}
              <text x="50" y="225" fill="#99907e" fontSize="11" textAnchor="middle" fontFamily="sans-serif">MON</text>
              <text x="150" y="225" fill="#99907e" fontSize="11" textAnchor="middle" fontFamily="sans-serif">TUE</text>
              <text x="250" y="225" fill="#99907e" fontSize="11" textAnchor="middle" fontFamily="sans-serif">WED</text>
              <text x="350" y="225" fill="#99907e" fontSize="11" textAnchor="middle" fontFamily="sans-serif">THU</text>
              <text x="450" y="225" fill="#99907e" fontSize="11" textAnchor="middle" fontFamily="sans-serif">FRI</text>
              <text x="550" y="225" fill="#99907e" fontSize="11" textAnchor="middle" fontFamily="sans-serif">SAT</text>
              <text x="650" y="225" fill="#99907e" fontSize="11" textAnchor="middle" fontFamily="sans-serif">SUN</text>
            </svg>
          </div>
        </div>

        {/* Classes Occupancy list (col-span-4) */}
        <div className="lg:col-span-4 bg-surface-container border border-outline-variant/30 p-6 rounded-sm">
          <div className="flex justify-between items-center mb-6 border-b border-outline-variant/20 pb-4">
            <h3 className="font-bebas text-xl tracking-wider uppercase">
              CLASS CAPACITY
            </h3>
            <BookOpen size={16} className="text-primary" />
          </div>

          <div className="space-y-5">
            {classesList.slice(0, 5).map((c) => {
              const booked = c.capacity - c.slotsLeft;
              const percent = Math.round((booked / c.capacity) * 100);

              return (
                <div key={c.id} className="space-y-2">
                  <div className="flex justify-between text-xs font-dm-sans">
                    <span className="font-bold text-on-surface uppercase">{c.name}</span>
                    <span className="text-on-surface-variant font-mono">
                      {booked}/{c.capacity} ({percent}%)
                    </span>
                  </div>
                  <div className="w-full bg-[#0A0A0A] h-2 rounded-sm overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-sm transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
