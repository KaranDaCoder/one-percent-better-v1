import { BadgeInfo, Bolt, BookmarkCheck, Info, LayoutDashboard, LayoutPanelLeft, LogIn, LogOut, PlusCircleIcon, UserRoundCog, Zap } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  const session = true;
  return (
    <div className='h-20 flex items-center justify-between sticky top-0 bg-white mb-4 z-50'>
      <div className="flex items-center justify-center">
        <Link href={'/'} className='text-6xl font-semibold tracking-wider w-fit'>1%</Link>
      </div>

      {session ? <div className='hidden lg:flex items-center h-full font-light space-x-16'>
        <Link href={'/dashboard'} className='w-auto tracking-wide hover:scale-105 transition-all duration-100 flex flex-col items-center font-medium text-sm capitalize h-full justify-center gap-[0.15rem]'>
          <LayoutPanelLeft color='#5c5c5c' />
          dashboard
        </Link>
        <Link href={'/my-habits'} className='w-auto tracking-wide hover:scale-105 transition-all duration-100 flex flex-col items-center font-medium text-sm capitalize h-full justify-center gap-[0.15rem]'>
          <Zap color='#5c5c5c' />
          habits
        </Link>
        <Link href={'/'} className='w-auto tracking-wide hover:scale-105 transition-all duration-100 flex flex-col items-center font-medium text-sm capitalize h-full justify-center gap-[0.15rem]'>
          <BookmarkCheck color='#5c5c5c' />
          habit trackers
        </Link>
         <Link href={'/'} className='w-auto tracking-wide hover:scale-105 transition-all duration-100 flex flex-col items-center font-medium text-sm capitalize h-full justify-center gap-[0.15rem]'>
          <UserRoundCog color='#5c5c5c' />
          profile
        </Link>
        <Link href={'/'} className='w-auto tracking-wide hover:scale-105 transition-all duration-100 flex flex-col items-center font-medium text-sm capitalize h-full justify-center gap-[0.15rem]'>
          <BadgeInfo color="#5c5c5c" />
          about
        </Link>
        <Link href={'/'} className='w-auto tracking-wide hover:scale-105 transition-all duration-100 flex flex-col items-center font-medium text-sm capitalize h-full justify-center gap-[0.15rem]'>
          <LogOut color='#5c5c5c' />
          logout
        </Link>
      </div> :
        <div className="flex space-x-8">
          <Link href={'/'} className='w-auto tracking-wide hover:scale-105 transition-all duration-100 flex flex-col items-center font-medium text-sm capitalize h-full justify-center gap-[0.15rem]'>
            <BadgeInfo color="#5c5c5c" />
            about
          </Link>
          <Link href={'/'} className='w-auto tracking-wide hover:scale-105 transition-all duration-100 flex flex-col items-center font-medium text-sm capitalize h-full justify-center gap-[0.15rem]'>
            <LogIn color="#5c5c5c" />
            login / register
          </Link>
        </div>
      }
    </div>
  );
};

export default Navbar;
