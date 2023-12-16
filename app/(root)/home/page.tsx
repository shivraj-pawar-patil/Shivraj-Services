import prisma from "@/lib/prisma";
import React from "react";

async function page() {
  const data = await prisma.test.findMany({
    select: {
      title: true,
      id: true,
    },
  });
  return (
    <div>
      Home
      {JSON.stringify(data)}
    </div>
  );
}

export default page;
