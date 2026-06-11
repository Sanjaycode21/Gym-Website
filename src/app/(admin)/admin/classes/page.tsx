"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Dumbbell, Trash2, CalendarPlus, Clock, User, Users } from "lucide-react";

export default function AdminClassesPage() {
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("CROSSFIT");
  const [trainerName, setTrainerName] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("1"); // Mon
  const [startTime, setStartTime] = useState("06:00");
  const [duration, setDuration] = useState("60");
  const [capacity, setCapacity] = useState("15");
  const [submitting, setSubmitting] = useState(false);

  const fetchClasses = async () => {
    try {
      const res = await fetch("/api/classes");
      const data = await res.json();
      if (data.classes) {
        setClasses(data.classes);
      }
    } catch (err) {
      console.error("Failed to load classes", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleCreateClass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !trainerName || !startTime || !capacity) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          type,
          trainerName,
          dayOfWeek,
          startTime,
          duration,
          capacity,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setClasses([data.class, ...classes]);
        setName("");
        setDescription("");
        setTrainerName("");
        triggerFeedback(`Successfully created class "${name}"`);
      }
    } catch (err) {
      console.error("Failed to create class", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteClass = async (classId: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the class "${name}"? This will cancel all bookings.`)) return;

    try {
      const res = await fetch(`/api/admin/classes?id=${classId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setClasses(classes.filter((c) => c.id !== classId));
        triggerFeedback(`Successfully deleted class "${name}"`);
      }
    } catch (err) {
      console.error("Failed to delete class", err);
    }
  };

  const triggerFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => {
      setFeedback(null);
    }, 3000);
  };

  const getDayName = (dayNum: number) => {
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    return days[dayNum] || "MON";
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3 text-primary">
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
        <span className="font-dm-sans text-xs tracking-widest uppercase">Fetching Class Registers...</span>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Toast Alert Feedback */}
      {feedback && (
        <div className="fixed bottom-8 right-8 bg-[#221f19] border border-primary text-primary px-6 py-4 rounded-sm shadow-[0_0_30px_rgba(201,168,76,0.2)] z-50 flex items-center gap-3 animate-fade-up font-dm-sans text-sm">
          <CheckCircle size={18} className="shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Class Creator Panel (col-span-4) */}
        <div className="lg:col-span-4 bg-surface-container border border-outline-variant/30 p-6 rounded-sm">
          <div className="flex items-center gap-3 mb-6 border-b border-outline-variant/20 pb-4">
            <CalendarPlus className="text-primary w-5 h-5" />
            <h3 className="font-bebas text-xl tracking-wider uppercase">SCHEDULE NEW CLASS</h3>
          </div>

          <form onSubmit={handleCreateClass} className="space-y-4 text-xs font-dm-sans">
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-on-surface-variant uppercase">Class Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-[#0A0A0A] border border-outline-variant/30 focus:border-primary text-on-surface p-3 outline-none rounded-sm"
                placeholder="Elite AMRAP"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-on-surface-variant uppercase">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="bg-[#0A0A0A] border border-outline-variant/30 focus:border-primary text-on-surface p-3 outline-none rounded-sm resize-none"
                placeholder="High intensity circuits..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-on-surface-variant uppercase">Class Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="bg-[#0A0A0A] border border-outline-variant/30 focus:border-primary text-on-surface p-3 outline-none rounded-sm font-dm-sans"
                >
                  <option value="CROSSFIT">CROSSFIT</option>
                  <option value="HIIT">HIIT</option>
                  <option value="YOGA">YOGA</option>
                  <option value="STRENGTH">STRENGTH</option>
                  <option value="BOXING">BOXING</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-on-surface-variant uppercase">Coach Name</label>
                <input
                  type="text"
                  value={trainerName}
                  onChange={(e) => setTrainerName(e.target.value)}
                  className="bg-[#0A0A0A] border border-outline-variant/30 focus:border-primary text-on-surface p-3 outline-none rounded-sm"
                  placeholder="Coach Jaxson"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-on-surface-variant uppercase">Day of Week</label>
                <select
                  value={dayOfWeek}
                  onChange={(e) => setDayOfWeek(e.target.value)}
                  className="bg-[#0A0A0A] border border-outline-variant/30 focus:border-primary text-on-surface p-3 outline-none rounded-sm font-dm-sans"
                >
                  <option value="1">MONDAY</option>
                  <option value="2">TUESDAY</option>
                  <option value="3">WEDNESDAY</option>
                  <option value="4">THURSDAY</option>
                  <option value="5">FRIDAY</option>
                  <option value="6">SATURDAY</option>
                  <option value="0">SUNDAY</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-on-surface-variant uppercase">Start Time</label>
                <input
                  type="text"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="bg-[#0A0A0A] border border-outline-variant/30 focus:border-primary text-on-surface p-3 outline-none rounded-sm font-mono"
                  placeholder="07:00"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-on-surface-variant uppercase">Duration (Min)</label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="bg-[#0A0A0A] border border-outline-variant/30 focus:border-primary text-on-surface p-3 outline-none rounded-sm"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-on-surface-variant uppercase">Capacity</label>
                <input
                  type="number"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  className="bg-[#0A0A0A] border border-outline-variant/30 focus:border-primary text-on-surface p-3 outline-none rounded-sm"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary text-on-primary font-bebas text-lg py-3.5 gold-shimmer tracking-wider uppercase transition-all duration-300 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {submitting ? "SCHEDULING..." : "SCHEDULE CLASS"}
            </button>
          </form>
        </div>

        {/* Existing Schedules Ledger (col-span-8) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="border-b border-outline-variant/20 pb-4">
            <h3 className="font-bebas text-2xl md:text-3xl tracking-wider uppercase">
              ACTIVE CLASS SCHEDULES
            </h3>
          </div>

          <div className="bg-surface-container border border-outline-variant/30 rounded-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-highest/30 border-b border-outline-variant/20">
                    <th className="p-5 font-dm-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                      Class Details
                    </th>
                    <th className="p-5 font-dm-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                      Coach Name
                    </th>
                    <th className="p-5 font-dm-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                      Schedule Time
                    </th>
                    <th className="p-5 font-dm-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                      Registration Slots
                    </th>
                    <th className="p-5 font-dm-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {classes.map((c) => {
                    const booked = c.capacity - c.slotsLeft;
                    return (
                      <tr
                        key={c.id}
                        className="hover:bg-[#1e1b15]/50 transition-colors font-dm-sans text-sm"
                      >
                        {/* Class Details */}
                        <td className="p-5">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 text-primary border border-primary/20 rounded-sm">
                              <Dumbbell size={16} />
                            </div>
                            <div>
                              <h4 className="font-bold text-on-surface uppercase leading-none">{c.name}</h4>
                              <span className="text-[10px] font-bold text-primary tracking-wide uppercase mt-1 block">
                                {c.type}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Coach */}
                        <td className="p-5 text-on-surface-variant flex items-center gap-2.5 h-16">
                          <User size={14} className="text-primary/70" />
                          <span>{c.trainerName}</span>
                        </td>

                        {/* Time */}
                        <td className="p-5">
                          <div className="flex flex-col gap-0.5">
                            <span className="font-bold text-xs uppercase text-on-surface tracking-wider">
                              {getDayName(c.dayOfWeek)}
                            </span>
                            <span className="text-xs text-on-surface-variant font-mono flex items-center gap-1">
                              <Clock size={12} /> {c.startTime} ({c.duration} Mins)
                            </span>
                          </div>
                        </td>

                        {/* Registration Occupancy */}
                        <td className="p-5">
                          <div className="flex items-center gap-2">
                            <Users size={14} className="text-primary/70" />
                            <span className="text-xs font-mono">
                              {booked} / {c.capacity} Booked
                            </span>
                          </div>
                        </td>

                        {/* Commands */}
                        <td className="p-5 text-right">
                          <button
                            onClick={() => handleDeleteClass(c.id, c.name)}
                            className="p-2 border border-outline-variant hover:border-error text-on-surface-variant hover:text-error rounded-sm transition-all duration-300 cursor-pointer"
                            title="Cancel Class Schedule"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
