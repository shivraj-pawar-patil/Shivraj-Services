import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const intIdParam = searchParams.get("intId");
  const orgId = searchParams.get("orgId");
  const dateParam = searchParams.get("date");

  if (!userId && !intIdParam) {
    return NextResponse.json(
      { error: "Either userId or intId is required" },
      { status: 400 }
    );
  }

  if (!orgId) {
    return NextResponse.json(
      { error: "orgId is required" },
      { status: 400 }
    );
  }

  const intId = intIdParam ? Number(intIdParam) : undefined;

  if (intIdParam && Number.isNaN(intId)) {
    return NextResponse.json(
      { error: "intId must be a valid number" },
      { status: 400 }
    );
  }

  const targetDate = dateParam ? new Date(dateParam) : new Date();
  const startOfDay = new Date(targetDate);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(targetDate);
  endOfDay.setHours(23, 59, 59, 999);

  const todaysUsers = await prisma.user.findMany({
    where: {
      ...(orgId ? { orgId } : {}),
      updatedAt: {
        gte: startOfDay,
        lt: endOfDay,
      },
    },
    select: {
      id: true,
      intId: true,
      updatedAt: true,
    },
    orderBy: [{ updatedAt: "asc" }, { intId: "asc" }],
  });

  const matchedIndex = todaysUsers.findIndex(
    (entry) =>
      (userId ? entry.id === userId : false) ||
      (typeof intId === "number" ? entry.intId === intId : false)
  );

  const srNo = matchedIndex >= 0 ? matchedIndex + 1 : todaysUsers.length + 1;

  return NextResponse.json({ srNo });
}
