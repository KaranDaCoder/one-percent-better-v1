'use client';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'

const SignOut = () => {
  return (

    <button className='hidden w-full lg:block hover:text-slate-800 capitalize lg:w-auto text-start font-medium' onClick={() => signOut({ callbackUrl: '/' })}>sign-out</button>

  )
}

export default SignOut