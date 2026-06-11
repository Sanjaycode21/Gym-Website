const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding started...");

  // Clean DB
  await prisma.classBooking.deleteMany();
  await prisma.gymClass.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.membership.deleteMany();
  await prisma.membershipPlan.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  const admin = await prisma.user.create({
    data: {
      email: "admin@ironforge.fit",
      name: "Admin Owner",
      password: "AdminPass123",
      role: "ADMIN",
    },
  });

  const member = await prisma.user.create({
    data: {
      email: "sanjay@ironforge.fit",
      name: "Sanjay Kumar",
      password: "MemberPass123",
      role: "MEMBER",
      phone: "+91 98765 43210",
    },
  });

  console.log("Users created:", admin.email, member.email);

  // Create Plans
  const starter = await prisma.membershipPlan.create({
    data: {
      name: "STARTER",
      slug: "starter",
      monthlyPrice: 999,
      annualPrice: 799,
      features: JSON.stringify([
        "Access to Cardio Zone",
        "Standard Strength Area",
        "Locker Room Access",
        "No Guest Passes"
      ]),
      isPopular: false,
    },
  });

  const pro = await prisma.membershipPlan.create({
    data: {
      name: "PRO",
      slug: "pro",
      monthlyPrice: 1799,
      annualPrice: 1439,
      features: JSON.stringify([
        "All Standard Features",
        "Unlimited Group Classes",
        "Premium Sauna Access",
        "2 Guest Passes / Mo"
      ]),
      isPopular: true,
    },
  });

  const elite = await prisma.membershipPlan.create({
    data: {
      name: "ELITE",
      slug: "elite",
      monthlyPrice: 2999,
      annualPrice: 2399,
      features: JSON.stringify([
        "All Pro Features",
        "Private Locker & Laundry",
        "Weekly Nutrition Consult",
        "Priority Booking Access"
      ]),
      isPopular: false,
    },
  });

  console.log("Plans created.");

  // Create Membership for Member
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const fiveMonthsFromNow = new Date();
  fiveMonthsFromNow.setMonth(fiveMonthsFromNow.getMonth() + 5);

  await prisma.membership.create({
    data: {
      userId: member.id,
      planId: pro.id,
      status: "ACTIVE",
      startDate: oneMonthAgo,
      endDate: fiveMonthsFromNow,
    },
  });

  console.log("Membership created.");

  // Create Gym Classes
  const classesData = [
    {
      name: "ELITE CROSSFIT AMRAP",
      slug: "elite-crossfit-amrap",
      description: "Master technical movements and push your aerobic capacity with our flagship conditioning class.",
      type: "CROSSFIT",
      trainerId: "trainer-jaxson",
      trainerName: "Coach Jaxson",
      dayOfWeek: 1, // Mon
      startTime: "07:00",
      duration: 60,
      capacity: 20,
      slotsLeft: 5,
    },
    {
      name: "POWER HIIT",
      slug: "power-hiit",
      description: "High-intensity interval conditioning designed to boost cardiorespiratory threshold.",
      type: "HIIT",
      trainerId: "trainer-sarah",
      trainerName: "Coach Sarah",
      dayOfWeek: 1, // Mon
      startTime: "06:00",
      duration: 45,
      capacity: 15,
      slotsLeft: 4,
    },
    {
      name: "FLOW YOGA",
      slug: "flow-yoga",
      description: "Vinyasa yoga flow for movement integration and deep recovery.",
      type: "YOGA",
      trainerId: "trainer-sarah",
      trainerName: "Coach Sarah",
      dayOfWeek: 1, // Mon
      startTime: "08:30",
      duration: 60,
      capacity: 15,
      slotsLeft: 0,
    },
    {
      name: "STRENGTH LAB",
      slug: "strength-lab",
      description: "Raw strength training focus using compound movements and barbell blocks.",
      type: "STRENGTH",
      trainerId: "trainer-marcus",
      trainerName: "Coach Marcus",
      dayOfWeek: 1, // Mon
      startTime: "17:00",
      duration: 60,
      capacity: 12,
      slotsLeft: 12,
    },
    {
      name: "CORE BLAST",
      slug: "core-blast",
      description: "Core stability, trunk strength, and functional bracing focus.",
      type: "STRENGTH",
      trainerId: "trainer-elara",
      trainerName: "Coach Elara",
      dayOfWeek: 2, // Tue
      startTime: "07:00",
      duration: 45,
      capacity: 15,
      slotsLeft: 2,
    },
    {
      name: "IRON BOXING",
      slug: "iron-boxing",
      description: "Heavy bag drill intervals and technical combat footwork protocols.",
      type: "BOXING",
      trainerId: "trainer-david",
      trainerName: "Coach David",
      dayOfWeek: 3, // Wed
      startTime: "06:00",
      duration: 60,
      capacity: 10,
      slotsLeft: 0,
    },
    {
      name: "ZEN FLOW",
      slug: "zen-flow",
      description: "Deep restorative mobility poses to prepare the body for peak load.",
      type: "YOGA",
      trainerId: "trainer-sarah",
      trainerName: "Coach Sarah",
      dayOfWeek: 4, // Thu
      startTime: "18:30",
      duration: 60,
      capacity: 15,
      slotsLeft: 8,
    },
    {
      name: "AMRAP ELITE",
      slug: "amrap-elite",
      description: "Brutal functional circuits focusing on metabolic output and raw endurance.",
      type: "CROSSFIT",
      trainerId: "trainer-jaxson",
      trainerName: "Coach Jaxson",
      dayOfWeek: 5, // Fri
      startTime: "06:00",
      duration: 60,
      capacity: 20,
      slotsLeft: 5,
    },
  ];

  for (const c of classesData) {
    await prisma.gymClass.create({ data: c });
  }

  console.log("Classes created.");

  // Create Bookings for Sanjay
  const classes = await prisma.gymClass.findMany();
  const classStrength = classes.find(c => c.slug === "strength-lab");
  const classHIIT = classes.find(c => c.slug === "power-hiit");

  if (classStrength) {
    await prisma.classBooking.create({
      data: {
        userId: member.id,
        classId: classStrength.id,
        classDate: "OCT 14",
        startTime: "06:30 AM",
        status: "CONFIRMED",
      }
    });
  }

  if (classHIIT) {
    await prisma.classBooking.create({
      data: {
        userId: member.id,
        classId: classHIIT.id,
        classDate: "OCT 16",
        startTime: "05:00 PM",
        status: "CONFIRMED",
      }
    });
  }

  console.log("Bookings created.");

  // Create Payments for Sanjay
  await prisma.payment.create({
    data: {
      userId: member.id,
      description: "Monthly Pro Membership",
      amount: 1439,
      status: "SUCCESS",
      gateway: "razorpay",
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    }
  });

  await prisma.payment.create({
    data: {
      userId: member.id,
      description: "Personal Training (x4)",
      amount: 4800,
      status: "SUCCESS",
      gateway: "razorpay",
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    }
  });

  await prisma.payment.create({
    data: {
      userId: member.id,
      description: "Monthly Pro Membership",
      amount: 1439,
      status: "SUCCESS",
      gateway: "razorpay",
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    }
  });

  // Mock revenue payments from other users
  const mockUsers = [
    { email: "john@domain.com", name: "John Doe" },
    { email: "sarah.c@domain.com", name: "Sarah Chen" },
    { email: "mike@domain.com", name: "Mike Tyson" },
    { email: "alex@domain.com", name: "Alex Vance" },
  ];

  for (const mu of mockUsers) {
    const userObj = await prisma.user.create({
      data: {
        email: mu.email,
        name: mu.name,
        password: "Pass123",
        role: "MEMBER",
      }
    });

    // Subscriptions
    await prisma.payment.create({
      data: {
        userId: userObj.id,
        description: "Monthly Elite Membership",
        amount: 2399,
        status: "SUCCESS",
        gateway: "razorpay",
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000),
      }
    });
  }

  console.log("Mock revenue payments created.");
  console.log("Seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
