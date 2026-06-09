"use client";

import { useState } from "react";
import { Sparkles, Calendar, Lock, Check, Clock, User } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { gymClasses } from "@/lib/mockData";
import { GymClass, ClassType } from "@/types";

const weekDays = [
  { name: "MON", date: "12", dayNum: 1 },
  { name: "TUE", date: "13", dayNum: 2 },
  { name: "WED", date: "14", dayNum: 3 },
  { name: "THU", date: "15", dayNum: 4 },
  { name: "FRI", date: "16", dayNum: 5 },
  { name: "SAT", date: "17", dayNum: 6 },
  { name: "SUN", date: "18", dayNum: 0 },
];

const categories = ["ALL", "YOGA", "HIIT", "CROSSFIT", "BOXING", "STRENGTH"];

export default function ClassesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [bookedClasses, setBookedClasses] = useState<string[]>([]);
  const [bookingMessage, setBookingMessage] = useState<string | null>(null);

  const handleBookClass = (classId: string, className: string, slotsLeft: number) => {
    if (slotsLeft === 0) return;
    if (bookedClasses.includes(classId)) {
      // Unbook
      setBookedClasses(bookedClasses.filter((id) => id !== classId));
      triggerMessage(`Booking cancelled for ${className}`);
    } else {
      // Book
      setBookedClasses([...bookedClasses, classId]);
      triggerMessage(`Success! You have booked a spot in ${className}`);
    }
  };

  const triggerMessage = (msg: string) => {
    setBookingMessage(msg);
    setTimeout(() => {
      setBookingMessage(null);
    }, 4000);
  };

  // Helper to determine border color based on class type
  const getTypeColor = (type: ClassType) => {
    switch (type) {
      case "YOGA":
        return "border-l-tertiary";
      case "HIIT":
        return "border-l-primary";
      case "CROSSFIT":
        return "border-l-primary";
      case "BOXING":
        return "border-l-secondary";
      case "STRENGTH":
        return "border-l-secondary";
      default:
        return "border-l-primary";
    }
  };

  return (
    <div className="pt-20">
      {/* Toast Alert Feedback */}
      {bookingMessage && (
        <div className="fixed bottom-8 right-8 bg-[#221f19] border border-primary text-primary px-6 py-4 rounded-sm shadow-[0_0_30px_rgba(201,168,76,0.2)] z-50 flex items-center gap-3 animate-fade-up font-dm-sans text-sm">
          <Check size={18} className="shrink-0" />
          <span>{bookingMessage}</span>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-6 md:px-grid-margin overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between border-b border-outline-variant/30 pb-12">
          <div className="w-full md:w-2/3">
            <span className="font-dm-sans text-xs font-bold text-primary mb-4 block tracking-[0.3em] uppercase">
              REDEFINE YOUR LIMITS
            </span>
            <h1 className="font-bebas text-6xl md:text-8xl leading-tight uppercase">
              Group Classes
            </h1>
          </div>
          <div className="hidden md:block w-1/3 text-right">
            <p className="font-cormorant text-2xl text-on-surface-variant italic">
              &ldquo;Discipline is the bridge between goals and accomplishment.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Featured Bento Grid */}
      <section className="px-6 md:px-grid-margin mb-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Large Featured Card (CrossFit AMRAP) */}
          <div className="md:col-span-8 group relative aspect-[16/9] overflow-hidden border border-outline-variant/30 bg-surface-container-low rounded-sm">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8LuNheH21q5pKpQlxwaEvcDD24HmVRtGmoO6PSMWL8YMsJY_SHCvrxZun65RH63L4Mmq03gs4-B0mVv72qtxTjel-JmcpRnZT1CWjhqTC83u6i5ZjOHeYThZdM9gEkgfEqvSUr-5PZP3F3KBjiFEVdAHG0YKcfJufxgCWlmNemRpU_PpU5KPf0pS3Ew7JqqZwY0x2MeOrWL_b22uO0-4TJrLxFi7qIkXuM2QXYVV0O8jILrgKWdQ6cGBqdwTEa16XGES9-9gpLl_L"
              alt="CrossFit Athlete"
              className="absolute inset-0 w-full h-full object-cover grayscale brightness-50 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-background to-transparent z-10">
              <span className="font-dm-sans text-xs font-bold bg-primary text-on-primary px-3 py-1 w-fit mb-4 tracking-widest uppercase">
                MOST POPULAR
              </span>
              <h3 className="font-bebas text-3xl md:text-4xl mb-2 uppercase tracking-wide">
                Elite CrossFit AMRAP
              </h3>
              <p className="font-dm-sans text-sm text-on-surface-variant max-w-md mb-6 leading-relaxed">
                Master technical movements and push your aerobic capacity with our flagship high-intensity conditioning class.
              </p>
              <div className="flex items-center gap-6">
                <button
                  onClick={() =>
                    handleBookClass(
                      "class-crossfit",
                      "Elite CrossFit AMRAP",
                      5
                    )
                  }
                  className={`font-bebas text-lg px-8 py-3 gold-shimmer transition-all duration-300 cursor-pointer ${
                    bookedClasses.includes("class-crossfit")
                      ? "bg-primary/20 text-primary border border-primary"
                      : "bg-primary text-on-primary"
                  }`}
                >
                  {bookedClasses.includes("class-crossfit") ? "BOOKED" : "BOOK SPOT"}
                </button>
                <span className="font-mono text-2xl font-medium text-primary">07:00 AM</span>
              </div>
            </div>
          </div>

          {/* Secondary Featured Card (Yoga Flow) */}
          <div className="md:col-span-4 group relative flex flex-col justify-between p-8 border border-outline-variant/30 bg-surface-container rounded-sm">
            <div>
              <div className="flex justify-between items-start mb-12">
                <Sparkles className="text-primary w-8 h-8" />
                <span className="font-dm-sans text-[10px] font-bold text-primary tracking-wider bg-primary/10 px-2.5 py-1 uppercase rounded-sm">
                  {bookedClasses.includes("class-yoga-flow-zenith")
                    ? "BOOKED"
                    : "02 SLOTS LEFT"}
                </span>
              </div>
              <h3 className="font-bebas text-2xl md:text-3xl mb-4 tracking-wide">
                ZENITH YOGA FLOW
              </h3>
              <p className="font-dm-sans text-sm text-on-surface-variant leading-relaxed">
                A meditative yet physically demanding Vinyasa flow designed to increase flexibility, restore joint biomechanics, and develop mental clarity under athletic stress.
              </p>
            </div>
            <button
              onClick={() =>
                handleBookClass(
                  "class-yoga-flow-zenith",
                  "Zenith Yoga Flow",
                  2
                )
              }
              className={`w-full font-dm-sans text-xs font-bold py-4 hover:bg-primary hover:text-on-primary transition-all duration-300 tracking-wider uppercase ${
                bookedClasses.includes("class-yoga-flow-zenith")
                  ? "bg-primary/20 text-primary border border-primary"
                  : "border border-primary text-primary"
              }`}
            >
              {bookedClasses.includes("class-yoga-flow-zenith")
                ? "CANCEL SLOT"
                : "JOIN CLASS"}
            </button>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="px-6 md:px-grid-margin mb-12 max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-4 items-center">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`font-dm-sans text-xs font-bold px-6 py-2.5 border transition-all duration-300 cursor-pointer tracking-wider ${
                  isActive
                    ? "bg-primary text-on-primary border-primary"
                    : "border-outline-variant/30 text-on-surface-variant hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Schedule Calendar Grid */}
      <section className="px-6 md:px-grid-margin mb-24 max-w-7xl mx-auto">
        <div className="border border-outline-variant/30 rounded-sm overflow-hidden">
          {/* Calendar Header Row */}
          <div className="grid grid-cols-1 md:grid-cols-7 bg-surface-container border-b border-outline-variant/30">
            {weekDays.map((day) => (
              <div
                key={day.name}
                className={`p-6 text-center border-r last:border-r-0 border-outline-variant/30 ${
                  day.name === "MON" ? "bg-primary/10" : ""
                }`}
              >
                <span
                  className={`font-dm-sans text-xs font-bold block tracking-wider ${
                    day.name === "MON" ? "text-primary" : "text-on-surface-variant"
                  }`}
                >
                  {day.name}
                </span>
                <span className="font-mono text-2xl font-medium mt-1 block">
                  {day.date}
                </span>
              </div>
            ))}
          </div>

          {/* Schedule Columns Content */}
          <div className="grid grid-cols-1 md:grid-cols-7 min-h-[600px] bg-[#0A0A0A]">
            {weekDays.map((day) => {
              // Filter classes matching dayOfWeek and selected category
              const dayClasses = gymClasses.filter((c) => {
                const dayMatch = c.dayOfWeek === day.dayNum;
                const catMatch =
                  selectedCategory === "ALL" ||
                  c.type === selectedCategory ||
                  (selectedCategory === "CROSSFIT" && c.type === "CROSSFIT") ||
                  (selectedCategory === "YOGA" && c.type === "YOGA") ||
                  (selectedCategory === "HIIT" && c.type === "HIIT") ||
                  (selectedCategory === "BOXING" && c.type === "BOXING") ||
                  (selectedCategory === "STRENGTH" && c.type === "STRENGTH");
                return dayMatch && catMatch;
              });

              const isMonday = day.name === "MON";

              return (
                <div
                  key={day.name}
                  className={`border-r last:border-r-0 border-outline-variant/30 p-4 space-y-4 ${
                    isMonday ? "bg-surface-container-lowest" : ""
                  }`}
                >
                  {dayClasses.length > 0 ? (
                    dayClasses.map((item) => {
                      const isFull = item.slotsLeft === 0;
                      const isBooked = bookedClasses.includes(item.id);

                      return (
                        <div
                          key={item.id}
                          onClick={() =>
                            handleBookClass(item.id, item.name, item.slotsLeft)
                          }
                          className={`p-4 border-l-4 bg-surface-container hover:bg-surface-container-high transition-all duration-300 group cursor-pointer rounded-sm ${getTypeColor(
                            item.type
                          )} ${isBooked ? "ring-1 ring-primary" : ""}`}
                        >
                          <span className="font-mono text-xs text-on-surface-variant block mb-1">
                            {item.startTime}
                          </span>
                          <h4 className="font-bebas text-lg leading-tight mb-2 tracking-wide text-on-surface group-hover:text-primary transition-colors">
                            {item.name}
                          </h4>
                          <div className="flex justify-between items-center mt-4">
                            <span
                              className={`font-dm-sans text-[9px] font-bold tracking-wider ${
                                isBooked
                                  ? "text-primary"
                                  : isFull
                                  ? "text-on-surface-variant/40"
                                  : "text-primary/80"
                              }`}
                            >
                              {isBooked
                                ? "BOOKED"
                                : isFull
                                ? "FULL"
                                : `${String(item.slotsLeft).padStart(2, "0")} SLOTS LEFT`}
                            </span>
                            {isFull ? (
                              <Lock className="w-3.5 h-3.5 text-on-surface-variant/40" />
                            ) : (
                              <Calendar
                                className={`w-3.5 h-3.5 transition-transform group-hover:scale-110 ${
                                  isBooked ? "text-primary" : "text-on-surface-variant"
                                }`}
                              />
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : day.name === "SUN" ? (
                    <div className="p-4 text-center h-full flex items-center justify-center">
                      <span className="font-dm-sans text-xs text-on-surface-variant/30 uppercase italic tracking-widest block py-8">
                        Rest Day
                      </span>
                    </div>
                  ) : (
                    <div className="p-4 text-center">
                      <span className="font-dm-sans text-[10px] text-on-surface-variant/20 uppercase tracking-wider block py-4">
                        No Classes
                      </span>
                    </div>
                  )}

                  {/* Hardcoded Saturday Community Event from Stitch Mockup */}
                  {day.name === "SAT" && selectedCategory === "ALL" && (
                    <div className="p-4 border-l-4 border-l-secondary bg-surface-container-high rounded-sm">
                      <span className="font-mono text-xs text-on-surface-variant block mb-1">
                        10:00
                      </span>
                      <h4 className="font-bebas text-lg leading-tight mb-2 tracking-wide text-on-surface">
                        COMMUNITY WALK
                      </h4>
                      <span className="font-dm-sans text-[9px] font-bold text-primary tracking-wider">
                        OPEN EVENT
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Bottom Section */}
      <section className="relative py-20 bg-surface-container-lowest overflow-hidden border-t border-outline-variant/30">
        <div className="relative z-10 px-6 md:px-grid-margin max-w-7xl mx-auto text-center">
          <h2 className="font-bebas text-5xl md:text-6xl mb-6 uppercase tracking-wide">
            Not finding your fit?
          </h2>
          <p className="font-dm-sans text-lg text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed">
            Our trainers offer specialized 1-on-1 sessions tailored to your unique biomechanics, performance metrics, and fitness journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-primary text-on-primary font-bebas text-xl px-10 py-4 gold-shimmer tracking-wider">
              BOOK CONSULTATION
            </button>
            <button className="border border-outline text-on-surface font-bebas text-xl px-10 py-4 hover:bg-surface-variant transition-all duration-300 tracking-wider">
              VIEW TRAINERS
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
