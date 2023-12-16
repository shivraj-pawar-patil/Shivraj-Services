"use server";
import prisma from "@/lib/prisma";
import { TUserSchema } from "@/lib/type";
import { revalidatePath } from "next/cache";

export async function createUser(form: TUserSchema) {
  const { name, gender, phone_no, location } = form;
  await prisma.user.create({
    data: {
      name,
      gender,
      phoneNumber: phone_no.toString(),
      city: location,
    },
  });
  revalidatePath("/users");
}

export async function updateUser(form: TUserSchema, id: string) {
  const { name, gender, phone_no, location } = form;
  await prisma.user.update({
    data: {
      name,
      gender,
      phoneNumber: phone_no.toString(),
      city: location,
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
