"use server";
import prisma from "@/lib/prisma";
import { TUserInfoSchema, TUserSchema } from "@/lib/type";
import { revalidatePath } from "next/cache";

export async function createUser(form: TUserSchema, orgId: string) {
  const { name, gender, phone_no, location, type, from_camp } = form;
  await prisma.user.create({
    data: {
      name,
      gender,
      orgId,
      type,
      from_camp: from_camp ?? false,
      phoneNumber: phone_no.toString(),
      city: location,
    },
  });
  revalidatePath("/users");
}

export async function updateUser(form: TUserSchema, id: string) {
  const { name, gender, phone_no, location, type, from_camp } = form;
  await prisma.user.update({
    data: {
      name,
      from_camp: from_camp ?? false,
      gender,
      type,
      phoneNumber: phone_no.toString(),
      city: location,
    },
    where: {
      id,
    },
  });
  revalidatePath("/users");
}

export async function updateUserInfo(form: TUserInfoSchema, id: string) {
  const {
    name,
    location,
    age,
    date,
    rSPHu,
    rCYLu,
    rAXISu,
    rVISIONu,
    rSPHb,
    rCYLb,
    rAXISb,
    rVISIONb,
    lSPHu,
    lCYLu,
    lAXISu,
    lVISIONu,
    lSPHb,
    lCYLb,
    lAXISb,
    lVISIONb,
    totalAmount,
    advance,
    balance,
    glass_type,
    delevery_date
  } = form;

  const existingUser = await prisma.user.findUnique({
    where: { id },
    select: { info: true, intId: true }
  });

  const oldInfo = (existingUser?.info as any) || {};
  const { history: oldHistory, ...infoSnapshot } = oldInfo;

  const history = [
    ...(Array.isArray(oldHistory) ? oldHistory : []),
    {
      ...infoSnapshot,
      updatedAt: new Date().toISOString()
    }
  ].filter(entry => Object.keys(entry).length > 1); // Filter out empty initial states if needed

  await prisma.user.update({
    data: {
      name,
      city: location,
      date,
      info: {
        age,
        totalAmount,
        advance,
        balance,
        glass_type,
        delevery_date,
        rSPHu,
        rCYLu,
        rAXISu,
        rVISIONu,
        rSPHb,
        rCYLb,
        rAXISb,
        rVISIONb,
        lSPHu,
        lCYLu,
        lAXISu,
        lVISIONu,
        lSPHb,
        lCYLb,
        lAXISb,
        lVISIONb,
        history,
      },
    },
    where: {
      id,
    },
  });
  revalidatePath("/users");
  if (existingUser?.intId) {
    revalidatePath(`/users/${existingUser.intId}`);
    revalidatePath(`/users/${existingUser.intId}/info`);
  }
}

export async function deleteUser(Ids: string[]) {
  await prisma.user.deleteMany({
    where: {
      id: {
        in: Ids,
      },
    },
  });
  revalidatePath("/users");
}

export async function getDailySrNo({
  userId,
  intId,
  orgId,
  date = new Date(),
}: {
  userId?: string;
  intId?: number;
  orgId?: string;
  date?: Date | string;
}) {
  if (!userId && typeof intId !== "number") {
    throw new Error("Either userId or intId is required");
  }

  const targetDate = new Date(date);
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

  const matchedIndex = todaysUsers.findIndex((entry) =>
    (userId ? entry.id === userId : false) || (typeof intId === "number" ? entry.intId === intId : false)
  );

  if (matchedIndex >= 0) {
    return matchedIndex + 1;
  }

  return todaysUsers.length + 1;
}

export async function searchUsers(query: string, orgId: string) {
  if (!query || query.length < 2) return [];

  return await prisma.user.findMany({
    where: {
      orgId,
      name: {
        contains: query,
        mode: 'insensitive' // Case insensitive search
      }
    },
    select: {
      id: true,
      intId: true,
      name: true,
      phoneNumber: true,
      city: true
    },
    take: 5 // Limit results
  });
}
