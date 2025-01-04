import Link from 'next/link'
import React from 'react'
import StartAHabitBtn from './StartAHabitBtn'
import SignOut from './SignOut'
import NavbarMobile from './NavbarMobile'


const Navbar = async({session}) => {
  console.log(session)
  return (
    <div className="h-20 gap-4 sticky top-0 bg-white flex items-center justify-between lg:px-10 px-4 z-[20]">
      <div className="w-16">
        <Link href={'/'} className="text-7xl font-extrabold tracking-wider">1%</Link>
      </div>

      {session ? (
        <>
         {/* Mobile Navbar */}
          <NavbarMobile />
          {/* Sign Out */}
          <SignOut />
        </>
      ) : (
        // If no session, show Sign-In button
        <div className="flex items-center justify-end gap-3 w-full">
          <Link href="/auth/sign-in">Sign-In</Link>
        </div>
      )}
    </div>
  )
}

export default Navbar