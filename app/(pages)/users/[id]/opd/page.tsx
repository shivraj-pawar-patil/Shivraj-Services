import prisma from "@/lib/prisma";
import React , {cache}from "react";
import { auth } from "@clerk/nextjs";
import OpdForm from "../components/OpdForm";
interface UserPageProps {
  params: {
    id: number;
  };
}
const OpdPage = async ({ params }: UserPageProps) => {
  const { orgId , organization } = auth()
  const user = await prisma.user.findUnique({
    where: {
      intId: Number(params.id),
      orgId: orgId!
    },
  });
  
  return <OpdForm user={user} organization={organization!} />;
};
 
export default OpdPage;
