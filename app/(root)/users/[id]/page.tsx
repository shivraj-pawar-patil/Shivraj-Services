import prisma from "@/lib/prisma";
import React from "react";
import { UserForm } from "./components/UserForm";
import { auth } from "@clerk/nextjs";
interface CustomerPageProps {
  params: {
    id: string;
  };
}
const UserPage = async ({ params }: CustomerPageProps) => {
  const { orgId } = auth()
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
      orgId: orgId!
    },
  });

  return <UserForm user={user} orgId={orgId!} />;
};

export default UserPage;
