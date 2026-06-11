import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// List all class bookings
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

    const bookings = await prisma.classBooking.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        gymClass: {
          select: {
            name: true,
            type: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ bookings });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Revoke a booking as admin
export async function DELETE(req: NextRequest) {
  const sessionCookie = req.cookies.get("session_user");
  if (!sessionCookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const session = JSON.parse(sessionCookie.value);
    if (session.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const bookingId = searchParams.get("id");

    if (!bookingId) {
      return NextResponse.json({ error: "Booking ID required" }, { status: 400 });
    }

    const booking = await prisma.classBooking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // In transaction, delete booking and increment class slot
    await prisma.$transaction(async (tx) => {
      const gymClass = await tx.gymClass.findUnique({
        where: { id: booking.classId },
      });

      if (gymClass) {
        await tx.gymClass.update({
          where: { id: booking.classId },
          data: { slotsLeft: gymClass.slotsLeft + 1 },
        });
      }

      await tx.classBooking.delete({
        where: { id: bookingId },
      });
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
