import React from 'react';
import { UserForm } from '../[id]/components/UserForm';

async function page() {
  return (
    <div>
       <UserForm user={null} />
    </div>
  );
}

export default page;
