"use server";
import prisma from "@/lib/prisma";
import { TUserInfoSchema, TUserSchema } from "@/lib/type";
import { revalidatePath } from "next/cache";

export async function createUser(form: TUserSchema, orgId: string) {
  const { name, gender, phone_no, location, type } = form;
  await prisma.user.create({
    data: {
      name,
      gender,
      orgId,
      type,
      phoneNumber: phone_no.toString(),
      city: location,
    },
  });
  revalidatePath("/users");
}

export async function updateUser(form: TUserSchema, id: string) {
  const { name, gender, phone_no, location, type } = form;
  await prisma.user.update({
    data: {
      name,
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
  } = form;

  await prisma.user.update({
    data: {
      name,
      city: location,
      info: {
        age,
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
      },
    },
    where: {
      id,
    },
  });
  revalidatePath("/users");
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
