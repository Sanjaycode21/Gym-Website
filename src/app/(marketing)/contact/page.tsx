"use client";

import { useState } from "react";
import { MapPin, Phone, Clock, Mail, Send, Check } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!formState.name.trim()) tempErrors.name = "Name is required";
    if (!formState.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      tempErrors.email = "Invalid email format";
    }
    if (!formState.subject.trim()) tempErrors.subject = "Subject is required";
    if (!formState.message.trim()) tempErrors.message = "Message is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormState({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-10 px-6 md:px-grid-margin overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-start gap-4">
            <span className="font-dm-sans text-xs font-bold text-primary tracking-widest bg-primary/10 px-4 py-1">
              CONNECT WITH US
            </span>
            <h1 className="font-bebas text-6xl md:text-8xl text-on-surface max-w-4xl leading-tight uppercase">
              REACH THE <span className="text-primary italic font-cormorant capitalize">Forge</span>
            </h1>
            <div className="w-24 h-1 line-glow mt-4"></div>
          </div>
        </div>
      </section>

      {/* Info & Form Section */}
      <section className="py-12 px-6 md:px-grid-margin max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Info cards (col-span-5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <ScrollReveal>
              <div className="bg-surface-container border border-outline-variant/30 p-8 rounded-sm hover:border-primary/40 transition-all duration-300">
                <div className="flex items-start gap-5">
                  <div className="p-3 bg-primary/10 text-primary rounded-sm mt-1">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bebas text-xl text-on-surface mb-2 tracking-wider">LOCATION</h4>
                    <p className="font-dm-sans text-sm text-on-surface-variant leading-relaxed">
                      1200 Elite Ave, Platinum District<br />
                      Suite 400, Mumbai, MH 400001
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <div className="bg-surface-container border border-outline-variant/30 p-8 rounded-sm hover:border-primary/40 transition-all duration-300">
                <div className="flex items-start gap-5">
                  <div className="p-3 bg-primary/10 text-primary rounded-sm mt-1">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bebas text-xl text-on-surface mb-2 tracking-wider">PHONE & EMAIL</h4>
                    <p className="font-dm-sans text-sm text-on-surface-variant leading-relaxed mb-1">
                      +1 (555) IRON-FORGE
                    </p>
                    <p className="font-dm-sans text-sm text-primary underline underline-offset-4 decoration-primary/30">
                      info@ironforge.fit
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="bg-surface-container border border-outline-variant/30 p-8 rounded-sm hover:border-primary/40 transition-all duration-300">
                <div className="flex items-start gap-5">
                  <div className="p-3 bg-primary/10 text-primary rounded-sm mt-1">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bebas text-xl text-on-surface mb-2 tracking-wider">HOURS OF OPERATION</h4>
                    <p className="font-dm-sans text-sm text-on-surface-variant leading-relaxed">
                      Monday &ndash; Saturday: 05:00 AM &ndash; 11:00 PM<br />
                      Sunday: 07:00 AM &ndash; 08:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Form (col-span-7) */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.15}>
              <div className="bg-surface-container border border-outline-variant/30 p-8 md:p-10 rounded-sm relative">
                {submitted ? (
                  <div className="py-16 text-center flex flex-col items-center justify-center gap-6 animate-fade-up">
                    <div className="w-16 h-16 rounded-full bg-primary/15 text-primary flex items-center justify-center border border-primary/40">
                      <Check size={32} />
                    </div>
                    <div>
                      <h3 className="font-bebas text-3xl text-on-surface mb-2 tracking-wider">
                        MESSAGE TRANSMITTED
                      </h3>
                      <p className="font-dm-sans text-sm text-on-surface-variant max-w-sm mx-auto leading-relaxed">
                        Thank you for reaching out to IronForge Fitness. Our membership relations advisor will contact you within the next 12 hours.
                      </p>
                    </div>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 border border-primary text-primary font-bebas text-lg px-8 py-3 hover:bg-primary hover:text-on-primary transition-all duration-300 uppercase tracking-widest"
                    >
                      SEND ANOTHER MESSAGE
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="font-dm-sans text-xs font-bold text-on-surface-variant tracking-wider uppercase">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleInputChange}
                          className={`bg-[#0A0A0A] border ${
                            errors.name ? "border-error" : "border-outline-variant/50"
                          } focus:border-primary text-on-surface text-sm px-4 py-3 outline-none rounded-sm transition-all font-dm-sans`}
                          placeholder="Sanjay Kumar"
                        />
                        {errors.name && (
                          <span className="text-error text-xs font-dm-sans mt-1">{errors.name}</span>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="font-dm-sans text-xs font-bold text-on-surface-variant tracking-wider uppercase">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleInputChange}
                          className={`bg-[#0A0A0A] border ${
                            errors.email ? "border-error" : "border-outline-variant/50"
                          } focus:border-primary text-on-surface text-sm px-4 py-3 outline-none rounded-sm transition-all font-dm-sans`}
                          placeholder="sanjay@domain.com"
                        />
                        {errors.email && (
                          <span className="text-error text-xs font-dm-sans mt-1">{errors.email}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="subject" className="font-dm-sans text-xs font-bold text-on-surface-variant tracking-wider uppercase">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleInputChange}
                        className={`bg-[#0A0A0A] border ${
                          errors.subject ? "border-error" : "border-outline-variant/50"
                        } focus:border-primary text-on-surface text-sm px-4 py-3 outline-none rounded-sm transition-all font-dm-sans`}
                        placeholder="Membership inquiry, private session bookings..."
                      />
                      {errors.subject && (
                        <span className="text-error text-xs font-dm-sans mt-1">{errors.subject}</span>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="font-dm-sans text-xs font-bold text-on-surface-variant tracking-wider uppercase">
                        Message Details
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formState.message}
                        onChange={handleInputChange}
                        className={`bg-[#0A0A0A] border ${
                          errors.message ? "border-error" : "border-outline-variant/50"
                        } focus:border-primary text-on-surface text-sm px-4 py-3 outline-none rounded-sm transition-all font-dm-sans resize-none`}
                        placeholder="How can we assist your athletic performance goals?"
                      />
                      {errors.message && (
                        <span className="text-error text-xs font-dm-sans mt-1">{errors.message}</span>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary text-on-primary font-bebas text-xl py-4 gold-shimmer shadow-lg flex items-center justify-center gap-3 group cursor-pointer tracking-widest uppercase disabled:opacity-50"
                    >
                      {loading ? (
                        <span>TRANSMITTING...</span>
                      ) : (
                        <>
                          <span>SEND INQUIRY</span>
                          <Send size={18} className="transform group-hover:translate-x-1.5 transition-transform duration-300" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Styled Map Placeholder Section */}
      <section className="py-12 px-6 md:px-grid-margin max-w-7xl mx-auto mb-20">
        <ScrollReveal>
          <div className="relative aspect-[21/9] w-full border border-outline-variant/30 bg-surface-container rounded-sm overflow-hidden flex flex-col items-center justify-center text-center p-8 group">
            {/* Map styling grid lines placeholder */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#C9A84C_1px,transparent_1px),linear-gradient(to_bottom,#C9A84C_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none group-hover:scale-105 transition-transform duration-700"></div>

            {/* Glowing spot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 bg-primary/10 text-primary border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <MapPin size={24} />
              </div>
              <h3 className="font-bebas text-3xl text-on-surface tracking-wider">IRONFORGE PLATINUM ATHLETICS</h3>
              <p className="font-dm-sans text-xs text-on-surface-variant tracking-widest uppercase">
                1200 Elite Ave, Platinum District, Mumbai
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-4 border border-outline-variant px-6 py-2.5 hover:border-primary text-on-surface font-dm-sans text-xs font-bold tracking-widest rounded-sm transition-all duration-300"
              >
                OPEN IN GOOGLE MAPS
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
