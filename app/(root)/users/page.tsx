import React from "react";
import prisma from "@/lib/prisma";
import DataTableDemo from "./[id]/components/Users";

 async function  page() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      gender: true,
      phoneNumber: true,
      city: true,
    },
  });

  return <DataTableDemo users={users} />;
}

export default page;
