import Link from 'next/link';
import { LogIn } from 'lucide-react';
// import NavbarMobile from './'; // Assuming NavbarMobile is in the same directory
import { navLinks } from '@/staticDataUi/NavLink'; // Import navLinks from your data
import NavbarMobile from './ui/NavbarMobile';

const Navbar = () => {
  const session = true; // Simulating session state

  return (
    <div className="h-20 flex items-center justify-between sticky top-0 bg-slate-100 mb-4 z-50">
      {/* Logo */}
      <div className="flex items-center justify-center">
        <Link href={'/'} className="text-6xl font-semibold tracking-wider w-fit">
          1%
        </Link>
      </div>

      {/* Navigation Links for Desktop */}
      {session ? (
        <div className="hidden lg:flex items-center justify-center space-x-10">
          {navLinks.map((link) => (
            <Link
              href={link.link}
              className="flex h-full flex-col items-center justify-center text-slate-700 gap-2 tracking-wide hover:scale-105 transition-all duration-100 text-sm capitalize font-medium"
              key={link.name}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </div>
      ) : (
        <Link
          href={'/'}
          className="hidden lg:flex h-full flex-col items-center justify-center text-slate-700 gap-2 tracking-wide hover:scale-105 transition-all duration-100 text-sm capitalize"
        >
          <LogIn color="#5c5c5c" />
          login / register
        </Link>
      )}

      {/* Mobile Navbar */}
      {session ? (
        <NavbarMobile />
      ) : (
        <Link
          href={'/'}
          className="flex lg:hidden h-full flex-col items-center justify-center text-slate-700 gap-2 tracking-wide hover:scale-105 transition-all duration-100 text-sm capitalize"
        >
          <LogIn color="#5c5c5c" />
          login / register
        </Link>
      )}
    </div>
  );
};

export default Navbar;
