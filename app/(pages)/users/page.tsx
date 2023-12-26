import React from "react";
import prisma from "@/lib/prisma";
import DataTableDemo, { User } from "./[id]/components/Users";
import { auth } from "@clerk/nextjs";
 async function  page() {
  const { orgId } = auth()
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      gender: true,
      phoneNumber: true,
      city: true,
      type: true,
      info: true
    },
    where: {
      orgId: orgId!
    }
  });

  return <DataTableDemo users={users as User[]} />;
}

export default page;
