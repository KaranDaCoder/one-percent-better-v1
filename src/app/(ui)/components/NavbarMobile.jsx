'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import SignOut from './SignOut';
import { motion, AnimatePresence } from 'framer-motion';
import { ThreeBars, CloseIcon } from '../utils/HeroIcons';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';

const NavbarMobile = () => {
 const [mobileDrawer, setMobileDrawer] = useState(false);

 useEffect(() => {
  // Disable body scrolling when drawer is open
  if (mobileDrawer) {
   document.body.style.overflow = 'hidden';
  } else {
   document.body.style.overflow = '';
  }
  return () => {
   document.body.style.overflow = '';
  };
 }, [mobileDrawer]);

 return (
  <div className="flex flex-col items-end absolute top-0 right-0 lg:hidden z-[10] bg-inherit bg-white px-2">
   {/* Toggle Button */}
   <button
    onClick={() => setMobileDrawer(!mobileDrawer)}
    className="z-[70] text-slate-700"
    aria-label={mobileDrawer ? 'Close menu' : 'Open menu'}
    aria-expanded={mobileDrawer}
   >
    {mobileDrawer ? <CloseIcon size={'size-6'} /> : <ThreeBars />}
   </button>

   {/* Backdrop and Drawer */}
   <AnimatePresence>
    {mobileDrawer && (
     <>
      {/* Backdrop */}
      <motion.div
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       exit={{ opacity: 0 }}
       transition={{ duration: 0.3 }}
       className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[50]"
       onClick={() => setMobileDrawer(false)}
      />

      {/* Drawer */}
      <motion.div
       initial={{ x: '100%' }}
       animate={{ x: 0 }}
       exit={{ x: '100%' }}
       transition={{ duration: 0.3 }}
       className="flex flex-col space-y-8 w-2/3 justify-start items-start text-white z-[50] fixed right-0 top-0 h-full p-6 bg-slate-800"
       onClick={(e) => e.stopPropagation()}
      >
       {/* Links */}
       <h1 className='w-full text-lg font-semibold uppercase text-center tracking-wider'>Menu</h1>
        <Link href={'/dashboard'} className="hover:text-slate-400 font-semibold w-full">
        Dashboard
       </Link>
       <Link href={'/hubs'} className="hover:text-slate-400 font-semibold w-full">
        Hubs
       </Link>
       <Link href={'/habits'} className="hover:text-slate-400 font-semibold w-full">
        Habits
       </Link>
       <Link href={'/profile'} className="hover:text-slate-400 font-semibold w-full">
        Profile
       </Link>
       <SignOut />
      </motion.div>
     </>
    )}
   </AnimatePresence>
  </div>
 );
};

export default NavbarMobile;
