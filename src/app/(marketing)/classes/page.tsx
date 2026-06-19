"use client";

import { useState, useEffect } from "react";
import {
  Sparkles,
  Calendar,
  Lock,
  Check,
  Clock,
  User,
  Dumbbell,
  LogIn,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/components/providers/AuthProvider";

const weekDays = [
  { name: "MON", dayNum: 1 },
  { name: "TUE", dayNum: 2 },
  { name: "WED", dayNum: 3 },
  { name: "THU", dayNum: 4 },
  { name: "FRI", dayNum: 5 },
  { name: "SAT", dayNum: 6 },
  { name: "SUN", dayNum: 0 },
];

const categories = ["ALL", "YOGA", "HIIT", "CROSSFIT", "BOXING", "STRENGTH"];

interface GymClass {
  id: string;
  name: string;
  description: string;
  type: string;
  trainerName: string;
  dayOfWeek: number;
  startTime: string;
  duration: number;
  capacity: number;
  slotsLeft: number;
}

export default function ClassesPage() {
  const { user: sessionUser, membership, loading: authLoading } = useAuth();
  const [classes, setClasses] = useState<GymClass[]>([]);
  const [userBookings, setUserBookings] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [bookingMessage, setBookingMessage] = useState<string | null>(null);
  const [loadingBookId, setLoadingBookId] = useState<string | null>(null);
  const [classesLoading, setClassesLoading] = useState(true);
  const [showNoMembershipModal, setShowNoMembershipModal] = useState(false);
  const router = useRouter();

  const triggerMessage = (msg: string) => {
    setBookingMessage(msg);
    setTimeout(() => setBookingMessage(null), 4000);
  };

  // Get this week's monday date string for booking
  const getDateForDay = (dayNum: number): string => {
    const today = new Date();
    const todayDay = today.getDay(); // 0 = Sun
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((todayDay + 6) % 7));
    const daysFromMonday = dayNum === 0 ? 6 : dayNum - 1;
    const targetDate = new Date(monday);
    targetDate.setDate(monday.getDate() + daysFromMonday);
    return targetDate.toISOString().split("T")[0];
  };

  // Load classes on mount
  useEffect(() => {
    const loadClasses = async () => {
      try {
        const res = await fetch("/api/classes");
        const data = await res.json();
        if (data.classes) {
          setClasses(data.classes);
        }
      } catch (err) {
        console.error("Failed to load classes", err);
      } finally {
        setClassesLoading(false);
      }
    };
    loadClasses();
  }, []);

  // Load user bookings when sessionUser changes
  useEffect(() => {
    const loadBookings = async () => {
      if (!sessionUser) {
        setUserBookings(new Set());
        return;
      }
      try {
        const bookingsRes = await fetch("/api/bookings");
        const bookingsData = await bookingsRes.json();
        if (bookingsData.bookings) {
          const bookedIds = new Set<string>(
            bookingsData.bookings.map((b: any) => b.classId as string)
          );
          setUserBookings(bookedIds);
        }
      } catch (err) {
        console.error("Failed to load user bookings", err);
      }
    };
    loadBookings();
  }, [sessionUser]);

  const handleBookClass = async (classItem: GymClass) => {
    // Guest redirect rule
    if (!sessionUser) {
      router.push("/login?redirect=/classes");
      return;
    }

    // Registered user with no membership warning rule
    const hasMembership = membership && membership.status === "ACTIVE";
    if (!hasMembership) {
      setShowNoMembershipModal(true);
      return;
    }

    if (classItem.slotsLeft <= 0 && !userBookings.has(classItem.id)) return;

    const alreadyBooked = userBookings.has(classItem.id);
    setLoadingBookId(classItem.id);

    try {
      if (alreadyBooked) {
        const bookingsRes = await fetch("/api/bookings");
        const bookingsData = await bookingsRes.json();
        const booking = bookingsData.bookings?.find(
          (b: any) => b.classId === classItem.id
        );
        if (booking) {
          const res = await fetch(`/api/bookings?id=${booking.id}`, {
            method: "DELETE",
          });
          if (res.ok) {
            setUserBookings((prev) => {
              const next = new Set(prev);
              next.delete(classItem.id);
              return next;
            });
            setClasses((prev) =>
              prev.map((c) =>
                c.id === classItem.id
                  ? { ...c, slotsLeft: c.slotsLeft + 1 }
                  : c
              )
            );
            triggerMessage(`Booking cancelled for "${classItem.name}".`);
          }
        }
      } else {
        const classDate = getDateForDay(classItem.dayOfWeek);
        const res = await fetch("/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            classId: classItem.id,
            classDate,
            startTime: classItem.startTime,
          }),
        });
        const data = await res.json();
        if (res.ok) {
          setUserBookings((prev) => new Set([...prev, classItem.id]));
          setClasses((prev) =>
            prev.map((c) =>
              c.id === classItem.id ? { ...c, slotsLeft: c.slotsLeft - 1 } : c
            )
          );
          triggerMessage(`Success! You booked a spot in "${classItem.name}".`);
        } else {
          triggerMessage(data.error || "Booking failed. Please try again.");
        }
      }
    } catch (err) {
      triggerMessage("An error occurred. Please try again.");
    } finally {
      setLoadingBookId(null);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "YOGA":
        return "border-l-[#88d5c2]";
      case "HIIT":
        return "border-l-primary";
      case "CROSSFIT":
        return "border-l-primary";
      case "BOXING":
        return "border-l-[#a07bc4]";
      case "STRENGTH":
        return "border-l-[#7bb4e3]";
      default:
        return "border-l-primary";
    }
  };

  const filteredClasses = (dayNum: number) =>
    classes.filter(
      (c) =>
          c.dayOfWeek === dayNum &&
          (selectedCategory === "ALL" || c.type === selectedCategory)
    );

  const featuredClass = classes.find((c) => c.type === "CROSSFIT");
  const featuredYoga = classes.find((c) => c.type === "YOGA");

  return (
    <div className="pt-20">
      {/* Toast Alert */}
      {bookingMessage && (
        <div className="fixed bottom-8 right-8 bg-[#221f19] border border-primary text-primary px-6 py-4 rounded-sm shadow-[0_0_30px_rgba(201,168,76,0.2)] z-50 flex items-center gap-3 animate-fade-up font-dm-sans text-sm">
          <Check size={18} className="shrink-0" />
          <span>{bookingMessage}</span>
        </div>
      )}

      {/* No Membership Warning Modal */}
      <AnimatePresence>
        {showNoMembershipModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#1e1b15] border border-primary/30 p-8 max-w-md w-full rounded-sm shadow-2xl relative space-y-6"
            >
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center mx-auto text-primary">
                  <Lock size={32} />
                </div>
                <h3 className="font-bebas text-3xl tracking-wide uppercase text-on-surface">
                  MEMBERSHIP REQUIRED
                </h3>
                <p className="font-dm-sans text-sm text-on-surface-variant leading-relaxed">
                  An active membership is required to book classes at <span className="text-primary font-bold">IRONFORGE</span>. Explore our premium plans and unlock your access today.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Link href="/membership" className="w-full">
                  <button className="w-full bg-primary text-on-primary font-bebas text-lg py-4 gold-shimmer uppercase tracking-wider rounded-sm cursor-pointer">
                    VIEW MEMBERSHIP PLANS
                  </button>
                </Link>
                <button
                  onClick={() => setShowNoMembershipModal(false)}
                  className="w-full border border-outline hover:border-primary text-on-surface font-dm-sans text-xs font-bold py-3 uppercase tracking-widest rounded-sm cursor-pointer transition-colors"
                >
                  CLOSE
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section className="relative pt-20 pb-16 px-6 md:px-grid-margin overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between border-b border-outline-variant/30 pb-12">
          <div className="w-full md:w-2/3">
            <span className="font-dm-sans text-xs font-bold text-primary mb-4 block tracking-[0.3em] uppercase">
              STRUCTURED GROUP TRAINING
            </span>
            <h1 className="font-bebas text-6xl md:text-8xl leading-tight uppercase">
              Group Classes
            </h1>
          </div>
          <div className="hidden md:block w-1/3 text-right">
            <p className="font-cormorant text-2xl text-on-surface-variant italic">
              &ldquo;Discipline is the bridge between goals and
              accomplishment.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Guest Banner */}
      {!sessionUser && !classesLoading && !authLoading && (
        <section className="px-6 md:px-grid-margin mb-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-between bg-primary/10 border border-primary/30 px-6 py-4 rounded-sm">
            <div className="flex items-center gap-3">
              <LogIn size={18} className="text-primary shrink-0" />
              <span className="font-dm-sans text-sm text-on-surface">
                <span className="font-bold text-primary">Log in</span> to book
                class slots and track your sessions.
              </span>
            </div>
            <Link
              href="/login?redirect=/classes"
              className="font-bebas text-lg px-6 py-2 bg-primary text-on-primary tracking-wider hover:opacity-90 transition-opacity shrink-0"
            >
              SIGN IN
            </Link>
          </div>
        </section>
      )}

      {/* Registered User No Membership Banner */}
      {sessionUser && !classesLoading && !authLoading && !(membership && membership.status === "ACTIVE") && (
        <section className="px-6 md:px-grid-margin mb-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-between bg-error/10 border border-error/30 px-6 py-4 rounded-sm">
            <div className="flex items-center gap-3">
              <ShieldAlert size={18} className="text-error shrink-0" />
              <span className="font-dm-sans text-sm text-on-surface">
                You do not have an active membership yet. An active plan is required to reserve class slots.
              </span>
            </div>
            <Link
              href="/membership"
              className="font-bebas text-lg px-6 py-2 bg-primary text-on-primary tracking-wider hover:opacity-90 transition-opacity shrink-0"
            >
              CHOOSE PLAN
            </Link>
          </div>
        </section>
      )}

      {/* Featured Bento Grid */}
      {!classesLoading && !authLoading && (featuredClass || featuredYoga) && (
        <section className="px-6 md:px-grid-margin mb-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {/* Large Featured Card */}
            {featuredClass && (
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
                    {featuredClass.name}
                  </h3>
                  <p className="font-dm-sans text-sm text-on-surface-variant max-w-md mb-6 leading-relaxed">
                    {featuredClass.description ||
                      "Master technical movements and push your aerobic capacity with our flagship high-intensity conditioning class."}
                  </p>
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => handleBookClass(featuredClass)}
                      disabled={loadingBookId === featuredClass.id}
                      className={`font-bebas text-lg px-8 py-3 gold-shimmer transition-all duration-300 cursor-pointer disabled:opacity-50 ${
                        userBookings.has(featuredClass.id)
                          ? "bg-primary/20 text-primary border border-primary"
                          : "bg-primary text-on-primary"
                      }`}
                    >
                      {loadingBookId === featuredClass.id
                        ? "BOOKING..."
                        : userBookings.has(featuredClass.id)
                        ? "BOOKED ✓"
                        : "BOOK SPOT"}
                    </button>
                    <span className="font-mono text-2xl font-medium text-primary">
                      {featuredClass.startTime}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Secondary Featured Card */}
            {featuredYoga && (
              <div className="md:col-span-4 group relative flex flex-col justify-between p-8 border border-outline-variant/30 bg-surface-container rounded-sm">
                <div>
                  <div className="flex justify-between items-start mb-12">
                    <Sparkles className="text-primary w-8 h-8" />
                    <span className="font-dm-sans text-[10px] font-bold text-primary tracking-wider bg-primary/10 px-2.5 py-1 uppercase rounded-sm">
                      {userBookings.has(featuredYoga.id)
                        ? "BOOKED"
                        : `${featuredYoga.slotsLeft} SLOTS LEFT`}
                    </span>
                  </div>
                  <h3 className="font-bebas text-2xl md:text-3xl mb-4 tracking-wide uppercase">
                    {featuredYoga.name}
                  </h3>
                  <p className="font-dm-sans text-sm text-on-surface-variant leading-relaxed">
                    {featuredYoga.description ||
                      "A meditative yet physically demanding Vinyasa flow designed to increase flexibility and develop mental clarity."}
                  </p>
                </div>
                <button
                  onClick={() => handleBookClass(featuredYoga)}
                  disabled={loadingBookId === featuredYoga.id}
                  className={`w-full font-dm-sans text-xs font-bold py-4 hover:bg-primary hover:text-on-primary transition-all duration-300 tracking-wider uppercase disabled:opacity-50 cursor-pointer ${
                    userBookings.has(featuredYoga.id)
                      ? "bg-primary/20 text-primary border border-primary"
                      : "border border-primary text-primary"
                  }`}
                >
                  {loadingBookId === featuredYoga.id
                    ? "PROCESSING..."
                    : userBookings.has(featuredYoga.id)
                    ? "CANCEL SLOT"
                    : "JOIN CLASS"}
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Loading State */}
      {(classesLoading || authLoading) && (
        <section className="px-6 md:px-grid-margin mb-24 max-w-7xl mx-auto flex items-center justify-center py-32 gap-3 text-primary">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="font-dm-sans text-xs tracking-widest uppercase">
            Loading Class Schedule...
          </span>
        </section>
      )}

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
            {weekDays.map((day) => {
              const date = new Date();
              const todayDay = date.getDay();
              const monday = new Date(date);
              monday.setDate(date.getDate() - ((todayDay + 6) % 7));
              const daysFromMonday = day.dayNum === 0 ? 6 : day.dayNum - 1;
              const targetDate = new Date(monday);
              targetDate.setDate(monday.getDate() + daysFromMonday);
              const isToday = targetDate.toDateString() === date.toDateString();

              return (
                <div
                  key={day.name}
                  className={`p-6 text-center border-r last:border-r-0 border-outline-variant/30 ${
                    isToday ? "bg-primary/10" : ""
                  }`}
                >
                  <span
                    className={`font-dm-sans text-xs font-bold block tracking-wider ${
                      isToday ? "text-primary" : "text-on-surface-variant"
                    }`}
                  >
                    {day.name}
                  </span>
                  <span className="font-mono text-2xl font-medium mt-1 block">
                    {targetDate.getDate()}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Schedule Columns Content */}
          <div className="grid grid-cols-1 md:grid-cols-7 min-h-[600px] bg-[#0A0A0A]">
            {weekDays.map((day) => {
              const dayClasses = filteredClasses(day.dayNum);
              const date = new Date();
              const todayDay = date.getDay();
              const monday = new Date(date);
              monday.setDate(date.getDate() - ((todayDay + 6) % 7));
              const daysFromMonday = day.dayNum === 0 ? 6 : day.dayNum - 1;
              const targetDate = new Date(monday);
              targetDate.setDate(monday.getDate() + daysFromMonday);
              const isToday = targetDate.toDateString() === date.toDateString();

              return (
                <div
                  key={day.name}
                  className={`border-r last:border-r-0 border-outline-variant/30 p-4 space-y-4 ${
                    isToday ? "bg-surface-container-lowest" : ""
                  }`}
                >
                  {dayClasses.length > 0 ? (
                    dayClasses.map((item) => {
                      const isFull = item.slotsLeft <= 0;
                      const isBooked = userBookings.has(item.id);
                      const isLoading = loadingBookId === item.id;

                      return (
                        <div
                          key={item.id}
                          onClick={() => handleBookClass(item)}
                          className={`p-4 border-l-4 bg-surface-container hover:bg-surface-container-high transition-all duration-300 group rounded-sm ${getTypeColor(item.type)} ${
                            isBooked ? "ring-1 ring-primary" : ""
                          } ${isFull && !isBooked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
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
                              {isLoading
                                ? "..."
                                : isBooked
                                ? "BOOKED ✓"
                                : isFull
                                ? "FULL"
                                : `${String(item.slotsLeft).padStart(2, "0")} SLOTS LEFT`}
                            </span>
                            {isFull && !isBooked ? (
                              <Lock className="w-3.5 h-3.5 text-on-surface-variant/40" />
                            ) : (
                              <Calendar
                                className={`w-3.5 h-3.5 transition-transform group-hover:scale-110 ${
                                  isBooked
                                    ? "text-primary"
                                    : "text-on-surface-variant"
                                }`}
                              />
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : day.dayNum === 0 ? (
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

                  {/* Saturday Community Event */}
                  {day.dayNum === 6 && selectedCategory === "ALL" && (
                    <div className="p-4 border-l-4 border-l-[#a07bc4] bg-surface-container-high rounded-sm">
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
            Looking for 1-on-1 coaching?
          </h2>
          <p className="font-dm-sans text-lg text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed">
            Our coaches offer private training sessions tailored to your specific goals, lifting experience, and schedule.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/contact"
              className="bg-primary text-on-primary font-bebas text-xl px-10 py-4 gold-shimmer tracking-wider text-center"
            >
              BOOK CONSULTATION
            </Link>
            <Link
              href="/trainers"
              className="border border-outline text-on-surface font-bebas text-xl px-10 py-4 hover:bg-surface-variant transition-all duration-300 tracking-wider text-center"
            >
              VIEW TRAINERS
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
