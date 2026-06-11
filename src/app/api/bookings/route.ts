import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Get bookings for logged-in user
export async function GET(req: NextRequest) {
  const sessionCookie = req.cookies.get("session_user");
  if (!sessionCookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const session = JSON.parse(sessionCookie.value);
    const bookings = await prisma.classBooking.findMany({
      where: { userId: session.id },
      include: {
        gymClass: true,
      },
    });

    return NextResponse.json({ bookings });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Book a class slot
export async function POST(req: NextRequest) {
  const sessionCookie = req.cookies.get("session_user");
  if (!sessionCookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const session = JSON.parse(sessionCookie.value);
    const { classId, classDate, startTime } = await req.json();

    // Verify class has slots left
    const gymClass = await prisma.gymClass.findUnique({
      where: { id: classId },
    });

    if (!gymClass) {
      return NextResponse.json({ error: "Class not found" }, { status: 404 });
    }

    if (gymClass.slotsLeft <= 0) {
      return NextResponse.json({ error: "Class is fully booked" }, { status: 400 });
    }

    // Check if already booked
    const existing = await prisma.classBooking.findUnique({
      where: {
        userId_classId_classDate: {
          userId: session.id,
          classId: gymClass.id,
          classDate: classDate,
        },
      },
    });

    if (existing) {
      return NextResponse.json({ error: "Class already booked for this day" }, { status: 400 });
    }

    // Create booking and update slots in transaction
    const booking = await prisma.$transaction(async (tx) => {
      // Decrement slots
      await tx.gymClass.update({
        where: { id: classId },
        data: { slotsLeft: gymClass.slotsLeft - 1 },
      });

      // Create booking record
      return await tx.classBooking.create({
        data: {
          userId: session.id,
          classId: classId,
          classDate: classDate,
          startTime: startTime,
          status: "CONFIRMED",
        },
      });
    });

    return NextResponse.json({ success: true, booking });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Cancel a class booking
export async function DELETE(req: NextRequest) {
  const sessionCookie = req.cookies.get("session_user");
  if (!sessionCookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const session = JSON.parse(sessionCookie.value);
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

    if (booking.userId !== session.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Update slots and delete booking in transaction
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
