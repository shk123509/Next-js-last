'use client'

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';

function Navbar() {
  const { data: session } = useSession();
  const user = session?.user as any;

  // Navigation links array for easier management
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="p-4 md:p-6 shadow-md bg-gray-900 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        
        {/* Logo */}
        <Link href="/">
          <span className="text-xl font-bold mb-4 md:mb-0 cursor-pointer">
            True Feedback
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
          {navLinks.slice(1).map((link) => (
            <Link key={link.name} href={link.href}>
              <span className="text-lg font-medium md:mr-6 mb-2 md:mb-0 cursor-pointer hover:text-gray-400">
                {link.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center">
          {session ? (
            <>
              <span className="mr-4">
                Welcome, {user?.username || user?.email}
              </span>

              <Button
                onClick={() => signOut({ callbackUrl: "/sign-in" })}
                variant="outline"
                className="bg-slate-100 text-black"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/sign-in">
              <Button
                variant="outline"
                className="bg-slate-100 text-black"
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
