import prisma from "@/lib/prisma";
import React from "react";
import { UserForm } from "./components/UserForm";
interface CustomerPageProps {
  params: {
    id: string;
  };
}
const UserPage = async ({ params }: CustomerPageProps) => {
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });

  return <UserForm user={user} />;
};

export default UserPage;
