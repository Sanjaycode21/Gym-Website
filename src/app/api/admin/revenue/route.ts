import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const sessionCookie = req.cookies.get("session_user");
  if (!sessionCookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const session = JSON.parse(sessionCookie.value);
    if (session.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Fetch all successful payments
    const payments = await prisma.payment.findMany({
      where: { status: "SUCCESS" },
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

    // Aggregate subscription counts
    const planCounts = {
      Starter: 0,
      Pro: 0,
      Elite: 0,
    };

    payments.forEach((p) => {
      const desc = p.description.toUpperCase();
      if (desc.includes("STARTER")) {
        planCounts.Starter += 1;
      } else if (desc.includes("PRO")) {
        planCounts.Pro += 1;
      } else if (desc.includes("ELITE")) {
        planCounts.Elite += 1;
      }
    });

    // Generate monthly revenue distribution
    const monthlyRevenue: { [key: string]: number } = {};
    payments.forEach((p) => {
      const date = new Date(p.createdAt);
      const monthLabel = date.toLocaleString("en-US", { month: "short" });
      monthlyRevenue[monthLabel] = (monthlyRevenue[monthLabel] || 0) + p.amount;
    });

    return NextResponse.json({
      totalRevenue,
      planCounts,
      monthlyRevenue,
      payments,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
