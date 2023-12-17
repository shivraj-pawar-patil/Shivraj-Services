import prisma from "@/lib/prisma";
import React from "react";
import { auth } from "@clerk/nextjs";
import InfoForm from "../components/InfoForm";
interface UserPageProps {
  params: {
    id: string;
  };
}
const UserPage = async ({ params }: UserPageProps) => {
  const { orgId } = auth()
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
      orgId: orgId!
    },
  });

  console.log("user--------------------------->",user,params);
  
  return <InfoForm user={user} orgId={orgId!} />;
};

export default UserPage;
