import prisma from "@/lib/prisma";
import React , {cache}from "react";
import { auth } from "@clerk/nextjs";
import InfoForm from "../components/InfoForm";
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
  
  return <InfoForm user={user} orgId={orgId!} />;
};
 
export default UserPage;
