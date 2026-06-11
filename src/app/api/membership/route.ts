import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// Retrieve current member's subscription details
export async function GET(req: NextRequest) {
  const sessionCookie = req.cookies.get("session_user");
  if (!sessionCookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const session = JSON.parse(sessionCookie.value);
    const membership = await prisma.membership.findUnique({
      where: { userId: session.id },
      include: { plan: true },
    });

    return NextResponse.json({ membership });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Upgrade/Alter membership plan
export async function PATCH(req: NextRequest) {
  const sessionCookie = req.cookies.get("session_user");
  if (!sessionCookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const session = JSON.parse(sessionCookie.value);
    const { action, planSlug } = await req.json();

    if (action === "upgrade") {
      const plan = await prisma.membershipPlan.findUnique({
        where: { slug: planSlug },
      });

      if (!plan) {
        return NextResponse.json({ error: "Membership plan not found" }, { status: 404 });
      }

      const oneMonthFromNow = new Date();
      oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);

      const membership = await prisma.membership.upsert({
        where: { userId: session.id },
        update: {
          planId: plan.id,
          endDate: oneMonthFromNow,
          status: "ACTIVE",
        },
        create: {
          userId: session.id,
          planId: plan.id,
          endDate: oneMonthFromNow,
          status: "ACTIVE",
        },
        include: { plan: true },
      });

      // Insert billing payment record
      await prisma.payment.create({
        data: {
          userId: session.id,
          description: `Membership Upgrade: Monthly ${plan.name} Tier`,
          amount: plan.monthlyPrice,
          status: "SUCCESS",
          gateway: "razorpay",
        },
      });

      return NextResponse.json({ success: true, membership });
    }

    return NextResponse.json({ error: "Action not recognized" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
