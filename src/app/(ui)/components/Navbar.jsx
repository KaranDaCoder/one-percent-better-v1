import Link from 'next/link'
import React from 'react'
import SignOut from './SignOut'
import NavbarMobile from './NavbarMobile'




const Navbar = async ({ session }) => {
  // console.log(session)
  return (
    <div className="h-20 gap-4 sticky top-0 flex items-center justify-between px-4 z-[20] bg-white">
      <div className="w-16">
        <Link href={'/'} className="text-7xl font-extrabold tracking-wider">1%</Link>
      </div>

      {session ? (
        <>
          <nav className='hidden lg:flex w-2/3 h-1/2 justify-center items-center'>
            <ul className='flex items-center justify-around tracking-wider gap-4 h-full w-5/6 rounded-full bg-orange-500 text-white font-medium'>
              <Link href={'/dashboard'} className='capitalize text-slate-800 hover:text-white flex w-auto h-auto flex-col items-center justify-center hover:scale-110 transition-all duration-200'>
                {/* <span className='text-4xl text-green-800'><MdDashboard/></span> */}
                <span className='text-base'>dashboard</span>
              </Link>
              <Link href={'/'} className='capitalize text-slate-800 hover:text-white flex w-auto h-auto flex-col items-center justify-center hover:scale-110 transition-all duration-200'>
                {/* <span className='text-4xl text-orange-600'><MdBolt/></span> */}
                <span className='text-base'>my habits</span>
              </Link>
              <Link href={'/'} className='capitalize text-slate-800 hover:text-white flex w-auto h-auto flex-col items-center justify-center hover:scale-110 transition-all duration-200'>
                {/* <span className='text-4xl text-blue-800'><MdOutlineEmojiFlags /></span> */}
                <span className='text-base'>habit trackers</span>
              </Link>
              <Link href={'/'} className='capitalize text-slate-800 hover:text-white flex w-auto h-auto flex-col items-center justify-center hover:scale-110 transition-all duration-200'>
                {/* <span className='text-4xl'><MdOutlineAutoGraph/></span> */}
                <span className='text-base'>charts</span>
              </Link>
              <Link href={'/'} className='capitalize text-slate-800 hover:text-white flex w-auto h-auto flex-col items-center justify-center hover:scale-110 transition-all duration-200'>
                {/* <span>asdasd</span> */}
                <span className='text-base'>profile</span>
              </Link>
             
            </ul>
          </nav>
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