"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Search, Trash2, Calendar, User, BookOpen } from "lucide-react";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/admin/bookings");
      const data = await res.json();
      if (data.bookings) {
        setBookings(data.bookings);
      }
    } catch (err) {
      console.error("Failed to load bookings", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleRevokeBooking = async (bookingId: string, memberName: string, className: string) => {
    if (!confirm(`Are you sure you want to revoke the booking for ${memberName} in "${className}"?`)) return;

    try {
      const res = await fetch(`/api/admin/bookings?id=${bookingId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setBookings(bookings.filter((b) => b.id !== bookingId));
        triggerFeedback(`Successfully revoked check-in for ${memberName}`);
      }
    } catch (err) {
      console.error("Failed to revoke booking", err);
    }
  };

  const triggerFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => {
      setFeedback(null);
    }, 3000);
  };

  // Filter bookings
  const filteredBookings = bookings.filter(
    (b) =>
      b.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.gymClass.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3 text-primary">
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
        <span className="font-dm-sans text-xs tracking-widest uppercase">Fetching Check-in Records...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toast Alert Feedback */}
      {feedback && (
        <div className="fixed bottom-8 right-8 bg-[#221f19] border border-primary text-primary px-6 py-4 rounded-sm shadow-[0_0_30px_rgba(201,168,76,0.2)] z-50 flex items-center gap-3 animate-fade-up font-dm-sans text-sm">
          <CheckCircle size={18} className="shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/20 pb-4">
        <h3 className="font-bebas text-2xl md:text-3xl tracking-wider uppercase">
          LIVE BOOKINGS TRACKER
        </h3>
        <div className="relative flex items-center w-full md:w-80">
          <Search className="absolute left-4 w-4 h-4 text-on-surface-variant/50" />
          <input
            type="text"
            placeholder="Search member or class..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#100e08] border border-outline-variant/30 focus:border-primary text-on-surface text-xs pl-12 pr-4 py-3 outline-none rounded-sm transition-all font-dm-sans"
          />
        </div>
      </div>

      {/* Bookings Table Ledger */}
      <div className="bg-surface-container border border-outline-variant/30 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-highest/30 border-b border-outline-variant/20">
                <th className="p-5 font-dm-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                  Member Details
                </th>
                <th className="p-5 font-dm-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                  Reserved Class
                </th>
                <th className="p-5 font-dm-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                  Check-in Time
                </th>
                <th className="p-5 font-dm-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                  Status
                </th>
                <th className="p-5 font-dm-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-right">
                  System Commands
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((b) => (
                  <tr
                    key={b.id}
                    className="hover:bg-[#1e1b15]/50 transition-colors font-dm-sans text-sm"
                  >
                    {/* User Profile */}
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                          {b.user.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-on-surface uppercase leading-none">{b.user.name}</h4>
                          <span className="text-[11px] text-on-surface-variant">{b.user.email}</span>
                        </div>
                      </div>
                    </td>

                    {/* Class */}
                    <td className="p-5 text-on-surface-variant">
                      <div className="flex items-center gap-2 text-on-surface font-semibold uppercase">
                        <BookOpen size={14} className="text-primary/70" />
                        <span>{b.gymClass.name}</span>
                      </div>
                      <span className="text-[10px] font-bold text-primary tracking-wider uppercase block mt-1">
                        {b.gymClass.type}
                      </span>
                    </td>

                    {/* Check-in details */}
                    <td className="p-5">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-bold text-xs uppercase text-on-surface tracking-wider">
                          {b.classDate}
                        </span>
                        <span className="text-xs text-on-surface-variant font-mono flex items-center gap-1">
                          <Calendar size={12} /> {b.startTime}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="p-5">
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold px-2.5 py-1 tracking-wider uppercase rounded-full bg-primary/20 text-primary border border-primary/30">
                        {b.status}
                      </span>
                    </td>

                    {/* Commands */}
                    <td className="p-5 text-right">
                      <button
                        onClick={() => handleRevokeBooking(b.id, b.user.name, b.gymClass.name)}
                        className="p-2 border border-outline-variant hover:border-error text-on-surface-variant hover:text-error rounded-sm transition-all duration-300 cursor-pointer"
                        title="Revoke Booking Check-in"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-10 text-center font-dm-sans text-on-surface-variant/40 uppercase tracking-widest text-xs">
                    No active class check-ins found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
