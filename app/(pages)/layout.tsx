import { Navbar } from "@/components/Navbar"
import SideBar from "../SideBar"

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex h-[100dvh] overflow-hidden'>
      <SideBar />
      <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
         <Navbar />
        <main className='grow [&>*:first-child]:scroll-mt-16'>{children}</main>
      </div>
    </div>
  )
}

export default DefaultLayout
