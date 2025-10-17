import 'server-only'; // Ensure this file only runs on the server
import { auth, User } from '@clerk/nextjs/server'; // Assuming Clerk for auth
import prisma from '@/lib/prisma'; // Assuming your prisma client is here
import { notFound } from 'next/navigation';

import UserQRCodeClient from '../UserQRCodeClient';


const UserQRCodePageServer = async ({ params }: { params: { userId: number } }) => {
  const { orgId } = auth();

  if (!orgId) {
    // Handle unauthenticated state or no organization context
    return notFound();
  }

  // 1. Fetch data securely on the server
  const user = await prisma.user.findUnique({
    where: {
      intId: Number(params.userId),
      orgId: orgId!
    },
  });

  if (!user) {
    return notFound();
  }
  

  // 3. Render the client component, passing the data as a prop
  return (
    <UserQRCodeClient 
      userId={params.userId} 
      userData={user} 
      baseUrl="https://shivraj-services.vercel.app" // Base URL can be passed or hardcoded
    />
  );
}

export default UserQRCodePageServer;