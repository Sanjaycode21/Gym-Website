const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding started...");

  // Create Users using upsert to avoid duplicate emails
  const admin = await prisma.user.upsert({
    where: { email: "admin@ironforge.fit" },
    update: {
      name: "Admin Owner",
      password: "AdminPass123",
      role: "ADMIN",
    },
    create: {
      email: "admin@ironforge.fit",
      name: "Admin Owner",
      password: "AdminPass123",
      role: "ADMIN",
    },
  });

  const member = await prisma.user.upsert({
    where: { email: "sanjay@ironforge.fit" },
    update: {
      name: "Sanjay Kumar",
      password: "MemberPass123",
      role: "MEMBER",
      phone: "+91 98765 43210",
    },
    create: {
      email: "sanjay@ironforge.fit",
      name: "Sanjay Kumar",
      password: "MemberPass123",
      role: "MEMBER",
      phone: "+91 98765 43210",
    },
  });

  console.log("Users seeded:", admin.email, member.email);

  // Create Membership Plans using upsert on slug
  const starter = await prisma.membershipPlan.upsert({
    where: { slug: "starter" },
    update: {
      name: "STARTER",
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
    create: {
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

  const pro = await prisma.membershipPlan.upsert({
    where: { slug: "pro" },
    update: {
      name: "PRO",
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
    create: {
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

  const elite = await prisma.membershipPlan.upsert({
    where: { slug: "elite" },
    update: {
      name: "ELITE",
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
    create: {
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

  console.log("Plans seeded.");

  // Create/Upsert Membership for Member
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const fiveMonthsFromNow = new Date();
  fiveMonthsFromNow.setMonth(fiveMonthsFromNow.getMonth() + 5);

  await prisma.membership.upsert({
    where: { userId: member.id },
    update: {
      planId: pro.id,
      status: "ACTIVE",
      startDate: oneMonthAgo,
      endDate: fiveMonthsFromNow,
    },
    create: {
      userId: member.id,
      planId: pro.id,
      status: "ACTIVE",
      startDate: oneMonthAgo,
      endDate: fiveMonthsFromNow,
    },
  });

  console.log("Membership seeded.");

  // Create/Upsert Gym Classes
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
    await prisma.gymClass.upsert({
      where: { slug: c.slug },
      update: c,
      create: c,
    });
  }

  console.log("Classes seeded.");

  // Fetch updated classes to map by slug for booking references
  const classes = await prisma.gymClass.findMany();
  const classStrength = classes.find(c => c.slug === "strength-lab");
  const classHIIT = classes.find(c => c.slug === "power-hiit");

  if (classStrength) {
    await prisma.classBooking.upsert({
      where: {
        userId_classId_classDate: {
          userId: member.id,
          classId: classStrength.id,
          classDate: "OCT 14",
        }
      },
      update: {
        startTime: "06:30 AM",
        status: "CONFIRMED",
      },
      create: {
        userId: member.id,
        classId: classStrength.id,
        classDate: "OCT 14",
        startTime: "06:30 AM",
        status: "CONFIRMED",
      }
    });
  }

  if (classHIIT) {
    await prisma.classBooking.upsert({
      where: {
        userId_classId_classDate: {
          userId: member.id,
          classId: classHIIT.id,
          classDate: "OCT 16",
        }
      },
      update: {
        startTime: "05:00 PM",
        status: "CONFIRMED",
      },
      create: {
        userId: member.id,
        classId: classHIIT.id,
        classDate: "OCT 16",
        startTime: "05:00 PM",
        status: "CONFIRMED",
      }
    });
  }

  console.log("Bookings seeded.");

  // Create Payments safely by checking if they already exist
  const existingPayments = await prisma.payment.findMany({
    where: { userId: member.id }
  });

  const createPaymentIfMissing = async (paymentData) => {
    const exists = existingPayments.some(
      p => p.description === paymentData.description &&
           p.amount === paymentData.amount &&
           Math.abs(new Date(p.createdAt).getTime() - paymentData.createdAt.getTime()) < 1000 * 60 * 60 * 24
    );
    if (!exists) {
      await prisma.payment.create({ data: paymentData });
    }
  };

  await createPaymentIfMissing({
    userId: member.id,
    description: "Monthly Pro Membership",
    amount: 1439,
    status: "SUCCESS",
    gateway: "razorpay",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  });

  await createPaymentIfMissing({
    userId: member.id,
    description: "Personal Training (x4)",
    amount: 4800,
    status: "SUCCESS",
    gateway: "razorpay",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
  });

  await createPaymentIfMissing({
    userId: member.id,
    description: "Monthly Pro Membership",
    amount: 1439,
    status: "SUCCESS",
    gateway: "razorpay",
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
  });

  // Mock revenue payments from other users
  const mockUsers = [
    { email: "john@domain.com", name: "John Doe" },
    { email: "sarah.c@domain.com", name: "Sarah Chen" },
    { email: "mike@domain.com", name: "Mike Tyson" },
    { email: "alex@domain.com", name: "Alex Vance" },
  ];

  for (const mu of mockUsers) {
    const userObj = await prisma.user.upsert({
      where: { email: mu.email },
      update: {
        name: mu.name,
        password: "Pass123",
        role: "MEMBER",
      },
      create: {
        email: mu.email,
        name: mu.name,
        password: "Pass123",
        role: "MEMBER",
      }
    });

    const userPayments = await prisma.payment.findMany({
      where: { userId: userObj.id }
    });

    const paymentAmount = 2399;
    const paymentDesc = "Monthly Elite Membership";
    const paymentExists = userPayments.some(
      p => p.description === paymentDesc && p.amount === paymentAmount
    );

    if (!paymentExists) {
      await prisma.payment.create({
        data: {
          userId: userObj.id,
          description: paymentDesc,
          amount: paymentAmount,
          status: "SUCCESS",
          gateway: "razorpay",
          createdAt: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000),
        }
      });
    }
  }

  console.log("Mock revenue payments seeded.");
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
