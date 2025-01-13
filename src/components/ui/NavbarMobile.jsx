'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { navLinks } from '@/staticDataUi/NavLink'; // Import navLinks from your file

const NavbarMobile = () => {
 const [navDrawer, setNavDrawer] = useState(false);

 return (
  <div className="lg:hidden block">
   {/* Hamburger Menu Icon */}
   <button
    onClick={() => setNavDrawer(!navDrawer)}
    className="p-2 text-slate-800 hover:text-slate-600 transition"
   >
    <Menu size={32} />
   </button>

   {/* Mobile Nav Drawer */}
   <AnimatePresence>
    {navDrawer && (
     <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="fixed top-0 right-0 w-3/4 h-full bg-white shadow-lg z-50 p-6"
     >
      {/* Close Button */}
      <button
       onClick={() => setNavDrawer(false)}
       className="absolute top-4 left-4 text-slate-800 hover:text-slate-600 transition"
      >
       Close
      </button>

      {/* Navigation Links */}
      <nav className="mt-12 space-y-8">
       {navLinks.map((item, index) => (
        <motion.div
         key={index}
         whileHover={{ scale: 1.05, color: '#1d4ed8' }}
         whileTap={{ scale: 0.95 }}
         className="flex items-center space-x-4"
        >
         <Link
          href={item.link}
          className="flex items-center space-x-4 text-slate-800 hover:text-slate-600 font-light uppercase text-xl relative"
          onClick={() => setNavDrawer(false)}
         >
          {item.icon}
          <span>{item.name}</span>
         </Link>
        </motion.div>
       ))}
      </nav>
     </motion.div>
    )}
   </AnimatePresence>
  </div>
 );
};

export default NavbarMobile;
