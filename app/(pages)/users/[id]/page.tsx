import prisma from "@/lib/prisma";
import React from "react";
import { UserForm } from "./components/UserForm";
import { auth } from "@clerk/nextjs";
interface UserPageProps {
  params: {
    id: number;
  };
}
const UserPage = async ({ params }: UserPageProps) => {
  const { orgId } = auth()
  const user = await prisma.user.findUnique({
    where: {
      intId: Number(params.id),
      orgId: orgId!
    },
  });

  return <UserForm user={user} orgId={orgId!} />;
};

export default UserPage;
