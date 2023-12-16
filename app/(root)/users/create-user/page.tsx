import React from 'react';
import { UserForm } from '../[id]/components/UserForm';
import { auth } from '@clerk/nextjs';

async function page() {
  const { orgId } = auth()
  return (
    <div>
       <UserForm user={null} orgId={orgId!} />
    </div>
  );
}

export default page;
