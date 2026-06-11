import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Get payment history for the logged-in user
export async function GET(req: NextRequest) {
  const sessionCookie = req.cookies.get("session_user");
  if (!sessionCookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const session = JSON.parse(sessionCookie.value);
    const payments = await prisma.payment.findMany({
      where: { userId: session.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ payments });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
