import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// Create class
export async function POST(req: NextRequest) {
  const sessionCookie = req.cookies.get("session_user");
  if (!sessionCookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const session = JSON.parse(sessionCookie.value);
    if (session.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { name, description, type, trainerName, dayOfWeek, startTime, duration, capacity } = await req.json();

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const gymClass = await prisma.gymClass.create({
      data: {
        name,
        slug,
        description,
        type,
        trainerId: `trainer-${trainerName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        trainerName,
        dayOfWeek: parseInt(dayOfWeek),
        startTime,
        duration: parseInt(duration),
        capacity: parseInt(capacity),
        slotsLeft: parseInt(capacity),
      },
    });

    return NextResponse.json({ success: true, class: gymClass });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete class
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
    const classId = searchParams.get("id");

    if (!classId) {
      return NextResponse.json({ error: "Class ID required" }, { status: 400 });
    }

    await prisma.$transaction([
      prisma.classBooking.deleteMany({ where: { classId } }),
      prisma.gymClass.delete({ where: { id: classId } }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
