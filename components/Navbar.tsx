import { UserButton, OrganizationSwitcher } from '@clerk/nextjs'
export const Navbar = () => {
  return (
    <header className='sticky top-0 bg-white dark:bg-[#182235] border-none z-30'>
      <div className='px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16 -mb-px'>
          <div className='flex'></div>
          <div className='flex items-center space-x-3'>
            <OrganizationSwitcher hidePersonal={true} />
            <UserButton afterSignOutUrl='/' />
          </div>
        </div>
      </div>
    </header>
  )
}
