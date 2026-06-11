import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const sessionCookie = req.cookies.get("session_user");

  if (!sessionCookie) {
    return NextResponse.json({ user: null, membership: null });
  }

  try {
    const sessionUser = JSON.parse(sessionCookie.value);
    
    const userDetails = await prisma.user.findUnique({
      where: { id: sessionUser.id },
      include: {
        membership: {
          include: {
            plan: true,
          },
        },
      },
    });

    if (!userDetails) {
      return NextResponse.json({ user: null, membership: null });
    }

    const user = {
      id: userDetails.id,
      email: userDetails.email,
      name: userDetails.name,
      role: userDetails.role,
    };

    return NextResponse.json({
      user,
      membership: userDetails.membership
        ? {
            status: userDetails.membership.status,
            endDate: userDetails.membership.endDate,
            plan: userDetails.membership.plan
              ? {
                  name: userDetails.membership.plan.name,
                  slug: userDetails.membership.plan.slug,
                  monthlyPrice: userDetails.membership.plan.monthlyPrice,
                  features: userDetails.membership.plan.features,
                }
              : null,
          }
        : null,
    });
  } catch {
    return NextResponse.json({ user: null, membership: null });
  }
}
