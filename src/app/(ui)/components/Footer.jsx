import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='h-8 flex flex-col justify-end items-end px-4'>
        {/* <p>karandacoder@2025</p> */}
        <Link href={'/'} className='font-medium text-end'> what in the world is this about?</Link>
    </div>
  )
}

export default Footer