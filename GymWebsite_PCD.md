# PROJECT CONCEPT DOCUMENT (PCD)
## Premium Gym Website & Membership Booking Platform

---

> **Document Version:** 1.0  
> **Project Type:** Sample Portfolio Work / Real-World Applicable  
> **Framework:** Next.js latest (App Router)  
> **Status:** Pre-Development · Ready for Build

---

## 1. PROJECT OVERVIEW

### 1.1 Concept Statement
A premium, full-stack gym website that allows visitors to explore the facility, browse membership plans, and complete bookings online — without needing to visit in person or make a call. The platform positions the gym as an elite fitness destination through luxury-grade design, smooth micro-interactions, and a frictionless booking experience.

### 1.2 Target Audience
| Segment | Description |
|---|---|
| Primary | Fitness-focused individuals aged 20–45, urban or semi-urban |
| Secondary | Corporates looking for group/employee memberships |
| Tertiary | Personal training seekers, athletes |

### 1.3 Business Goals
- Convert website visitors into paid members
- Reduce dependency on walk-ins and phone calls for bookings
- Showcase the gym's premium identity visually
- Rank on Google for local gym-related searches

---

## 2. TECH STACK

| Layer | Technology |
|---|---|
| **Framework** | Next.js latest (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS + CSS Variables |
| **Animations** | Framer Motion |
| **UI Components** | Shadcn/UI (customized) |
| **Icons** | Lucide React |
| **Forms** | React Hook Form + Zod validation |
| **Database** | PostgreSQL (via Supabase or PlanetScale) |
| **ORM** | Prisma |
| **Auth** | NextAuth.js (OAuth + Email/Password) |
| **Payments** | Razorpay (India) / Stripe (International) |
| **Email** | Resend + React Email |
| **CMS** | Sanity.io (for blog/coaches content) |
| **Image Optimization** | Next.js Image + Cloudinary |
| **SEO** | Next.js Metadata API + Structured Data |
| **Analytics** | Vercel Analytics + Google Analytics 4 |
| **Deployment** | Vercel |
| **Calendar** | FullCalendar.io (class scheduling) |

---

## 3. DESIGN SYSTEM

### 3.1 Visual Identity

**Aesthetic Direction:** Dark luxury fitness — think editorial magazine meets elite athletic brand. Black-dominant, gold/amber accents, high contrast typography, cinematic photography, controlled negative space.

### 3.2 Color Palette

```
Primary Background:   #0A0A0A  (near-black)
Secondary BG:         #111111  
Surface:              #1A1A1A  
Border:               #2A2A2A  

Gold Accent:          #C9A84C  
Gold Light:           #E8C56A  
Gold Muted:           #A0844A  

White Primary:        #F5F5F5  
White Secondary:      #BDBDBD  
White Muted:          #757575  

Success:              #4CAF50  
Error:                #EF4444  
Warning:              #F59E0B  
```

### 3.3 Typography

```
Display Font:    "Bebas Neue" — bold headings, hero text, section titles
Body Font:       "DM Sans" — paragraphs, UI text, forms
Accent Font:     "Cormorant Garamond" italic — luxury pull quotes, subheadings
Mono Font:       "JetBrains Mono" — pricing numbers, stats
```

### 3.4 Motion Principles
- Page transitions: fade + slight Y-translate (300ms ease-out)
- Hero text: staggered reveal per word/line
- Cards: scale + shadow on hover (150ms)
- CTA buttons: shimmer sweep animation on hover
- Scroll-triggered: fade-up with Intersection Observer
- Loader: custom animated logo (1.2s, plays once)

---

## 4. SITEMAP & PAGE ARCHITECTURE

```
/                          → Home (Landing Page)
/about                     → About the Gym
/facilities                → Equipment & Amenities
/membership                → Plans & Pricing
/membership/checkout       → Booking Form + Payment
/membership/success        → Confirmation Page
/classes                   → Group Classes Schedule
/classes/[slug]            → Individual Class Detail
/trainers                  → Meet the Coaches
/trainers/[slug]           → Trainer Profile
/blog                      → Articles & Tips (CMS)
/blog/[slug]               → Individual Blog Post
/gallery                   → Photo / Video Gallery
/contact                   → Contact + Map
/faq                       → FAQs Accordion
/terms                     → Terms & Conditions
/privacy                   → Privacy Policy

/dashboard                 → Member Dashboard (Protected)
/dashboard/membership      → My Membership Details
/dashboard/bookings        → My Class Bookings
/dashboard/profile         → Edit Profile

/admin                     → Admin Panel (Protected)
/admin/members             → Manage Members
/admin/bookings            → Manage Bookings
/admin/classes             → Manage Classes Schedule
/admin/trainers            → Manage Trainers
/admin/revenue             → Revenue Reports
```

---

## 5. FEATURE LIST (COMPLETE)

### 5.1 Public-Facing Features

#### 🏠 Homepage
- [ ] Fullscreen hero with cinematic gym video/image background
- [ ] Animated headline with staggered word reveal
- [ ] Floating CTA: "Join Now" + "Book a Free Trial"
- [ ] Stats bar: Members count, Years active, Trainers, Equipment pieces (animated counters)
- [ ] Features/USP section (3-column dark cards)
- [ ] Featured membership plans (teaser)
- [ ] Trainers preview (horizontal scroll on mobile)
- [ ] Class schedule preview (next 3 upcoming classes)
- [ ] Testimonials carousel (photo + quote + rating)
- [ ] Photo gallery grid (masonry layout)
- [ ] Blog latest posts (3 cards)
- [ ] Final CTA banner with background parallax
- [ ] Footer with social links, quick links, contact info

#### 📋 Membership Page
- [ ] 3–4 tiered plan cards (Basic / Pro / Elite / Annual)
- [ ] Feature comparison table
- [ ] Toggle: Monthly / Annual pricing (with savings badge)
- [ ] "Most Popular" badge on featured plan
- [ ] Each plan shows: price, duration, list of inclusions, CTA button
- [ ] Add-ons section: Personal Training, Locker, Parking, Nutrition Consultation
- [ ] FAQ specific to memberships
- [ ] Social proof: "1200+ Active Members" trust badge

#### 🛒 Booking / Checkout Flow
- [ ] Step 1 — Plan Selection (pre-filled if coming from pricing page)
- [ ] Step 2 — Personal Details Form (Name, Phone, Email, DOB, Address)
- [ ] Step 3 — Add-ons Selection
- [ ] Step 4 — Payment (Razorpay/Stripe integration)
- [ ] Step 5 — Confirmation + Email receipt
- [ ] Promo code / referral code field
- [ ] Guest checkout (no account required to purchase)
- [ ] Auto-create account post-purchase option

#### 🗓️ Class Schedule
- [ ] Full weekly schedule (calendar view)
- [ ] Filter by class type (Yoga, HIIT, CrossFit, Zumba, etc.)
- [ ] Class cards: Time, Duration, Trainer, Capacity (slots left indicator)
- [ ] "Book Spot" button (members only, else prompt sign-up)
- [ ] Waitlist functionality when class is full
- [ ] iCal / Google Calendar export per class

#### 👥 Trainers Section
- [ ] Grid of trainer cards with name, specialization, experience
- [ ] Individual trainer profile: bio, certifications, schedule, Instagram link
- [ ] Book a PT session with a specific trainer
- [ ] Trainer rating from members

#### 📸 Gallery
- [ ] Masonry photo grid with lightbox
- [ ] Video embed section (gym tour, transformation stories)
- [ ] Filter tabs: Equipment / Classes / Events / Transformations

#### 📝 Blog
- [ ] Article cards with category tags, read time, thumbnail
- [ ] Individual post with table of contents, social share, related posts
- [ ] Categories: Nutrition / Training / Lifestyle / Gym News
- [ ] Author profiles linked to trainers
- [ ] Newsletter subscribe CTA inline

#### 📞 Contact Page
- [ ] Contact form (Name, Email, Message, Subject)
- [ ] Google Maps embed (gym location)
- [ ] Hours of operation
- [ ] Phone, email, WhatsApp CTA
- [ ] Social media links

#### ❓ FAQ Page
- [ ] Accordion-style questions
- [ ] Grouped by category: Membership / Classes / Facilities / Payment
- [ ] Search box to filter FAQs
- [ ] "Still have questions? Chat with us" floating WhatsApp button

---

### 5.2 Member Dashboard (Authenticated)

#### My Membership
- [ ] Current plan details (name, expiry date, status)
- [ ] Renewal reminder banner (14 days before expiry)
- [ ] Upgrade / Downgrade plan button
- [ ] Payment history & invoices (downloadable PDF)
- [ ] Pause membership option (1 month/year max)

#### Class Bookings
- [ ] Upcoming booked classes list
- [ ] Cancel booking (with cutoff policy enforced)
- [ ] Booking history
- [ ] Waitlisted classes status

#### Profile
- [ ] Edit personal info (name, phone, DOB, profile photo)
- [ ] Change password
- [ ] Notification preferences (email/SMS)
- [ ] Referral code to share

---

### 5.3 Admin Panel (Protected Route)

#### Dashboard
- [ ] KPIs: Active members, new this month, revenue this month, class fill rate
- [ ] Revenue chart (monthly, YoY comparison)
- [ ] Member growth graph
- [ ] Upcoming classes today

#### Member Management
- [ ] Full member list with search/filter/sort
- [ ] View individual member profile
- [ ] Manually create / edit / suspend members
- [ ] Export member list (CSV)
- [ ] Bulk email functionality

#### Booking Management
- [ ] View all class bookings
- [ ] Add/remove members from classes manually
- [ ] Attendance marking

#### Class & Schedule Management
- [ ] Create / Edit / Delete classes
- [ ] Assign trainer to class
- [ ] Set capacity limits
- [ ] Recurring class scheduling

#### Revenue & Reports
- [ ] Monthly revenue breakdown by plan
- [ ] New vs renewal payment ratio
- [ ] Refund tracking
- [ ] Export reports (CSV/PDF)

---

## 6. SEO STRATEGY (COMPLETE)

### 6.1 Technical SEO

```typescript
// app/layout.tsx — Root metadata
export const metadata: Metadata = {
  metadataBase: new URL('https://yourgym.com'),
  title: {
    template: '%s | IronForge Gym',
    default: 'IronForge Gym — Premium Fitness Club | Join Today',
  },
  description: 'IronForge is a world-class fitness center offering premium gym memberships, personal training, group classes, and state-of-the-art equipment. Join the elite.',
  keywords: ['gym membership', 'fitness center', 'personal training', 'group fitness classes', 'premium gym'],
  authors: [{ name: 'IronForge Gym' }],
  creator: 'IronForge Gym',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://yourgym.com',
    siteName: 'IronForge Gym',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ironforgeGym',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {
    google: 'google-site-verification-token',
  },
  alternates: {
    canonical: 'https://yourgym.com',
  },
}
```

### 6.2 Structured Data (JSON-LD)

Every page gets relevant schema markup injected via Next.js Script component:

```
Homepage:        LocalBusiness + Organization schema
Membership Page: Product + Offer schema per plan
Trainers:        Person schema per trainer
Blog Posts:      Article + BreadcrumbList schema
FAQ Page:        FAQPage schema (auto-rich results)
Classes:         Event schema per class
Contact:         LocalBusiness with address/coordinates
```

### 6.3 Page-Level SEO Checklist

| Page | Title Tag | Meta Description | H1 | Canonical |
|---|---|---|---|---|
| Home | Brand + primary keyword | 155 chars | One per page | Self |
| Membership | Plan name + gym | Pricing included | Membership Plans | Self |
| Trainers | Trainer name + specialty | Bio snippet | Trainer name | Self |
| Blog posts | Article title | Excerpt | Article title | Self |
| Classes | Class type + gym name | Schedule CTA | Class name | Self |

### 6.4 Performance SEO (Core Web Vitals Targets)

| Metric | Target |
|---|---|
| LCP (Largest Contentful Paint) | < 2.5s |
| FID / INP | < 100ms |
| CLS (Cumulative Layout Shift) | < 0.1 |
| TTI (Time to Interactive) | < 3.5s |
| PageSpeed Score (Mobile) | 90+ |
| PageSpeed Score (Desktop) | 95+ |

#### Optimization Techniques:
- All images via `next/image` (WebP + AVIF, lazy loading, priority on hero)
- Font optimization via `next/font` (preload, `display: swap`)
- Code splitting: dynamic imports for heavy components (Gallery, Calendar)
- Route-based prefetching with `<Link>` component
- API routes cached with ISR (Incremental Static Regeneration) where applicable
- `robots.txt` and `sitemap.xml` auto-generated via Next.js
- Preconnect to third-party origins (Razorpay, analytics, fonts)

### 6.5 Local SEO
- Google My Business schema integration
- NAP (Name, Address, Phone) consistent across all pages and footer
- Location-specific landing page if multi-branch
- Schema `geo` coordinates for maps
- Reviews schema pulling from Google Reviews API

### 6.6 Content SEO
- Blog with long-form fitness content (1500+ word posts)
- Target keywords: "gym near me", "best gym in [city]", "gym membership price [city]"
- Internal linking strategy: blog posts → membership page → checkout
- Breadcrumbs on all inner pages

---

## 7. FOLDER STRUCTURE

```
ironforge-gym/
├── app/
│   ├── (public)/
│   │   ├── page.tsx                  # Home
│   │   ├── about/page.tsx
│   │   ├── facilities/page.tsx
│   │   ├── membership/
│   │   │   ├── page.tsx
│   │   │   ├── checkout/page.tsx
│   │   │   └── success/page.tsx
│   │   ├── classes/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── trainers/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── gallery/page.tsx
│   │   ├── contact/page.tsx
│   │   └── faq/page.tsx
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── forgot-password/page.tsx
│   ├── (dashboard)/
│   │   └── dashboard/
│   │       ├── page.tsx
│   │       ├── membership/page.tsx
│   │       ├── bookings/page.tsx
│   │       └── profile/page.tsx
│   ├── (admin)/
│   │   └── admin/
│   │       ├── page.tsx
│   │       ├── members/page.tsx
│   │       ├── bookings/page.tsx
│   │       ├── classes/page.tsx
│   │       └── revenue/page.tsx
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── membership/route.ts
│   │   ├── bookings/route.ts
│   │   ├── payment/
│   │   │   ├── create-order/route.ts
│   │   │   └── verify/route.ts
│   │   ├── classes/route.ts
│   │   ├── trainers/route.ts
│   │   ├── contact/route.ts
│   │   └── newsletter/route.ts
│   ├── layout.tsx                    # Root layout with metadata
│   ├── sitemap.ts                    # Auto-generated sitemap
│   ├── robots.ts                     # Auto-generated robots.txt
│   └── globals.css
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── MobileMenu.tsx
│   │   └── PageLoader.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── StatsBar.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── MembershipPreview.tsx
│   │   ├── TrainersPreview.tsx
│   │   ├── ClassSchedulePreview.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── GalleryPreview.tsx
│   │   ├── BlogPreview.tsx
│   │   └── CTABanner.tsx
│   ├── membership/
│   │   ├── PlanCard.tsx
│   │   ├── ComparisonTable.tsx
│   │   ├── PricingToggle.tsx
│   │   └── CheckoutStepper.tsx
│   ├── classes/
│   │   ├── ClassCard.tsx
│   │   ├── WeeklySchedule.tsx
│   │   └── ClassFilter.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Accordion.tsx
│   │   ├── AnimatedCounter.tsx
│   │   ├── ScrollReveal.tsx
│   │   └── GoldDivider.tsx
│   └── seo/
│       ├── LocalBusinessSchema.tsx
│       ├── ProductSchema.tsx
│       ├── ArticleSchema.tsx
│       └── FAQSchema.tsx
│
├── lib/
│   ├── prisma.ts                     # Prisma client singleton
│   ├── auth.ts                       # NextAuth config
│   ├── razorpay.ts                   # Payment utils
│   ├── email.ts                      # Resend email functions
│   ├── validations/
│   │   ├── membership.ts             # Zod schemas
│   │   ├── booking.ts
│   │   └── contact.ts
│   └── utils.ts
│
├── prisma/
│   └── schema.prisma                 # DB schema (below)
│
├── public/
│   ├── images/
│   ├── videos/
│   ├── fonts/
│   ├── og-image.jpg
│   ├── favicon.ico
│   └── manifest.json
│
├── styles/
│   └── globals.css
│
├── types/
│   └── index.ts
│
├── .env.local
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 8. DATABASE SCHEMA (Prisma)

```prisma
// prisma/schema.prisma

model User {
  id                String        @id @default(cuid())
  email             String        @unique
  name              String
  phone             String?
  dateOfBirth       DateTime?
  profileImage      String?
  role              Role          @default(MEMBER)
  referralCode      String        @unique @default(cuid())
  referredBy        String?
  createdAt         DateTime      @default(now())
  updatedAt         DateTime      @updatedAt

  membership        Membership?
  classBookings     ClassBooking[]
  ptSessions        PTSession[]
  payments          Payment[]
  notifications     Notification[]
}

enum Role { MEMBER  TRAINER  ADMIN }

model MembershipPlan {
  id           String       @id @default(cuid())
  name         String                          // "Basic" | "Pro" | "Elite"
  slug         String       @unique
  monthlyPrice Float
  annualPrice  Float
  features     String[]
  isPopular    Boolean      @default(false)
  isActive     Boolean      @default(true)
  memberships  Membership[]
}

model Membership {
  id          String           @id @default(cuid())
  userId      String           @unique
  planId      String
  status      MembershipStatus @default(ACTIVE)
  startDate   DateTime
  endDate     DateTime
  isPaused    Boolean          @default(false)
  pausedAt    DateTime?
  autoRenew   Boolean          @default(true)
  createdAt   DateTime         @default(now())

  user        User             @relation(fields: [userId], references: [id])
  plan        MembershipPlan   @relation(fields: [planId], references: [id])
  payments    Payment[]
}

enum MembershipStatus { ACTIVE  EXPIRED  PAUSED  CANCELLED }

model GymClass {
  id          String         @id @default(cuid())
  name        String
  slug        String         @unique
  description String
  type        ClassType
  trainerId   String
  dayOfWeek   Int            // 0=Sun, 1=Mon ... 6=Sat
  startTime   String         // "07:00"
  duration    Int            // minutes
  capacity    Int
  imageUrl    String?
  isActive    Boolean        @default(true)

  trainer     Trainer        @relation(fields: [trainerId], references: [id])
  bookings    ClassBooking[]
}

enum ClassType { YOGA  HIIT  CROSSFIT  ZUMBA  PILATES  BOXING  CYCLING  STRENGTH }

model ClassBooking {
  id          String        @id @default(cuid())
  userId      String
  classId     String
  classDate   DateTime      // Specific date of the session
  status      BookingStatus @default(CONFIRMED)
  isWaitlisted Boolean      @default(false)
  createdAt   DateTime      @default(now())

  user        User          @relation(fields: [userId], references: [id])
  gymClass    GymClass      @relation(fields: [classId], references: [id])

  @@unique([userId, classId, classDate])
}

enum BookingStatus { CONFIRMED  CANCELLED  ATTENDED  NO_SHOW }

model Trainer {
  id             String      @id @default(cuid())
  name           String
  slug           String      @unique
  specialization String[]
  bio            String
  experience     Int         // years
  certifications String[]
  imageUrl       String
  instagramUrl   String?
  rating         Float       @default(0)
  isActive       Boolean     @default(true)

  classes        GymClass[]
  ptSessions     PTSession[]
}

model PTSession {
  id          String    @id @default(cuid())
  userId      String
  trainerId   String
  scheduledAt DateTime
  duration    Int       // minutes
  notes       String?
  status      BookingStatus @default(CONFIRMED)
  price       Float

  user        User      @relation(fields: [userId], references: [id])
  trainer     Trainer   @relation(fields: [trainerId], references: [id])
}

model Payment {
  id             String        @id @default(cuid())
  userId         String
  membershipId   String?
  amount         Float
  currency       String        @default("INR")
  status         PaymentStatus
  gateway        String        // "razorpay" | "stripe"
  gatewayOrderId String?
  gatewayPaymentId String?
  invoiceUrl     String?
  createdAt      DateTime      @default(now())

  user           User          @relation(fields: [userId], references: [id])
  membership     Membership?   @relation(fields: [membershipId], references: [id])
}

enum PaymentStatus { PENDING  SUCCESS  FAILED  REFUNDED }

model Notification {
  id        String   @id @default(cuid())
  userId    String
  title     String
  message   String
  isRead    Boolean  @default(false)
  type      String   // "renewal" | "booking" | "promo"
  createdAt DateTime @default(now())

  user      User     @relation(fields: [userId], references: [id])
}

model PromoCode {
  id            String   @id @default(cuid())
  code          String   @unique
  discountType  String   // "percentage" | "flat"
  discountValue Float
  maxUses       Int?
  usedCount     Int      @default(0)
  expiresAt     DateTime?
  isActive      Boolean  @default(true)
}
```

---

## 9. API ROUTES SPECIFICATION

### 9.1 Membership APIs

| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/api/membership/plans` | Public | List all active plans |
| POST | `/api/membership/subscribe` | User | Subscribe to a plan |
| GET | `/api/membership/my` | User | Get current membership |
| PATCH | `/api/membership/pause` | User | Pause membership |
| PATCH | `/api/membership/cancel` | User | Cancel membership |

### 9.2 Payment APIs

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/payment/create-order` | User | Create Razorpay order |
| POST | `/api/payment/verify` | User | Verify payment signature |
| POST | `/api/payment/webhook` | System | Handle payment webhooks |
| GET | `/api/payment/invoice/:id` | User | Get invoice PDF |

### 9.3 Class Booking APIs

| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/api/classes` | Public | List all classes |
| GET | `/api/classes/:slug` | Public | Get class details |
| POST | `/api/bookings` | User | Book a class slot |
| DELETE | `/api/bookings/:id` | User | Cancel a booking |
| GET | `/api/bookings/my` | User | My class bookings |
| POST | `/api/bookings/waitlist` | User | Join waitlist |

### 9.4 Admin APIs

| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/api/admin/members` | Admin | List all members |
| GET | `/api/admin/revenue` | Admin | Revenue reports |
| POST | `/api/admin/classes` | Admin | Create a class |
| PATCH | `/api/admin/classes/:id` | Admin | Update a class |
| DELETE | `/api/admin/classes/:id` | Admin | Delete a class |
| POST | `/api/admin/promo` | Admin | Create promo code |

---

## 10. EMAIL NOTIFICATIONS (Resend + React Email)

| Trigger | Template | Recipient |
|---|---|---|
| Membership purchased | Welcome + plan details + invoice | Member |
| Membership expiring in 7 days | Renewal reminder with CTA | Member |
| Membership expired | Rejoin CTA | Member |
| Class booked | Booking confirmation + class details | Member |
| Class cancelled by gym | Cancellation notice + rebooking link | Booked members |
| Moved off waitlist | Spot confirmed notification | Member |
| PT session booked | Session details + trainer info | Member + Trainer |
| Payment failed | Retry CTA + support link | Member |
| Contact form submitted | Auto-reply + ticket number | User + Admin |
| New member registered | Gym admin notification | Admin |

---

## 11. THIRD-PARTY INTEGRATIONS

| Service | Purpose | Free Tier |
|---|---|---|
| **Supabase** | PostgreSQL DB + Auth | 500MB free |
| **Razorpay** | Indian payment gateway | Free to start |
| **Resend** | Transactional emails | 3k emails/month free |
| **Sanity.io** | Headless CMS for blog | Free tier available |
| **Cloudinary** | Image hosting + optimization | 25GB free |
| **Vercel** | Hosting + analytics | Generous free tier |
| **Google Analytics 4** | User behavior analytics | Free |
| **Google Maps Embed** | Location on contact page | Free (with API key) |
| **WhatsApp Business** | Floating contact button | Free |

---

## 12. ACCESSIBILITY CHECKLIST (WCAG 2.1 AA)

- [ ] All images have meaningful `alt` text
- [ ] Color contrast ratio ≥ 4.5:1 for body text
- [ ] All interactive elements keyboard-navigable
- [ ] Focus visible indicators on all buttons/links
- [ ] Skip navigation link at top of page
- [ ] Semantic HTML (nav, main, section, article, aside)
- [ ] Form labels properly associated with inputs
- [ ] Error messages announced via aria-live
- [ ] Modal traps focus properly
- [ ] Video has captions option

---

## 13. SECURITY CONSIDERATIONS

| Concern | Solution |
|---|---|
| SQL Injection | Prisma ORM (parameterized queries) |
| XSS | React's default JSX escaping + CSP headers |
| CSRF | NextAuth CSRF token |
| Payment tampering | Razorpay signature verification on server |
| Unauthorized routes | Middleware-based auth check for /dashboard, /admin |
| Sensitive env vars | Stored in .env.local, never committed |
| Rate limiting | Upstash Redis-based rate limiter on API routes |
| Password security | bcrypt hashing via NextAuth |

---

## 14. DEVELOPMENT PHASES & MILESTONES

### Phase 1 — Foundation (Week 1–2)
- [ ] Project setup: Next.js + TypeScript + Tailwind + Prisma
- [ ] Database schema creation + migrations
- [ ] Authentication (NextAuth.js) — login, register, session
- [ ] Base layout components: Navbar, Footer, Page Loader
- [ ] Design system setup: CSS variables, fonts, base components

### Phase 2 — Public Pages (Week 3–4)
- [ ] Homepage (all sections, animations)
- [ ] About, Facilities pages
- [ ] Membership / Pricing page with toggle
- [ ] Trainers grid + individual profiles
- [ ] Classes schedule page
- [ ] FAQ, Contact, Gallery pages
- [ ] SEO: metadata, JSON-LD schemas, sitemap, robots

### Phase 3 — Booking & Payments (Week 5–6)
- [ ] Checkout stepper (multi-step form)
- [ ] Razorpay integration (create order, verify payment)
- [ ] Post-purchase: account creation + membership record
- [ ] Class booking flow
- [ ] Email notifications via Resend
- [ ] Promo code system

### Phase 4 — Member Dashboard (Week 7)
- [ ] Dashboard overview
- [ ] Membership status + renewal
- [ ] Class bookings management
- [ ] Profile editing
- [ ] Payment history + invoice download

### Phase 5 — Admin Panel (Week 8)
- [ ] Admin dashboard with KPIs
- [ ] Member management
- [ ] Class/schedule management
- [ ] Revenue reports
- [ ] Content management (blog via Sanity)

### Phase 6 — Polish & Optimization (Week 9–10)
- [ ] Performance optimization (images, code splitting, ISR)
- [ ] Core Web Vitals testing + fixes
- [ ] Cross-browser + responsive testing
- [ ] Accessibility audit + fixes
- [ ] Security hardening
- [ ] Final SEO audit

---

## 15. ENVIRONMENT VARIABLES

```bash
# .env.local (example, never commit real values)

# App
NEXT_PUBLIC_APP_URL=https://yourgym.com
NEXT_PUBLIC_GYM_NAME="IronForge Gym"
NEXT_PUBLIC_GYM_PHONE="+91 9876543210"
NEXT_PUBLIC_GYM_EMAIL="hello@ironforge.com"

# Auth
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=https://yourgym.com

# Database
DATABASE_URL=postgresql://user:pass@host:5432/gymdb

# Payment
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=your-razorpay-secret

# Email
RESEND_API_KEY=re_...
EMAIL_FROM="IronForge Gym <hello@ironforge.com>"

# CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=skSan...

# Storage
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=yourcloudname
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIza...
```

---

## 16. SAMPLE GYM BRANDING

> Use this placeholder branding while building. Replace with real client details.

- **Gym Name:** IronForge Fitness
- **Tagline:** *Forge Your Limits*
- **Location:** Coimbatore, Tamil Nadu
- **Timings:** Mon–Sat 5:00 AM – 10:00 PM | Sun 6:00 AM – 8:00 PM
- **Social:** @ironforgefit

### Sample Membership Plans

| Plan | Monthly | Annual | Best For |
|---|---|---|---|
| **Starter** | ₹999/mo | ₹8,999/yr | Beginners |
| **Pro** | ₹1,799/mo | ₹15,999/yr | Regular members |
| **Elite** | ₹2,999/mo | ₹26,999/yr | Serious athletes |
| **Corporate** | Custom | Custom | Teams 5+ |

### Sample Classes
- CrossFit HIIT — Mon/Wed/Fri 6 AM
- Power Yoga — Daily 7 AM
- Zumba Dance — Tue/Thu/Sat 7 PM
- Strength & Conditioning — Mon–Fri 8 PM
- Cycling Sprint — Sat/Sun 7 AM

---

## 17. PORTFOLIO PRESENTATION TIPS

Since this is a portfolio project, consider:

1. **Add a "Portfolio Banner"** — a small floating badge on the live demo: "Built by [Your Name] · View Code"
2. **Case Study Page** — `/case-study` that explains your design decisions and tech choices
3. **Responsive Showcase** — Record a screen + mobile walkthrough for Behance/Dribbble
4. **GitHub README** — Document setup steps, tech choices, demo credentials
5. **Demo Credentials** — Provide test login: `demo@ironforge.com / Demo@123` and a test Razorpay card
6. **Lighthouse Score Screenshot** — Attach 90+ scores in README/portfolio

---

*Document prepared for development handoff. All features, schemas, and routes are defined and ready to be built in Next.js latest App Router.*

---

**IronForge Gym Web Platform · PCD v1.0**
