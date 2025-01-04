'use client'
import { signIn } from "next-auth/react";

const SignInPage = () => {
  return (
   <div className='flex items-center justify-center w-full h-[90dvh]'>
    <div className='flex flex-col items-center w-full px-4 space-y-4 bg-white border shadow-xl lg:w-3/4 rounded-2xl h-3/4'>
     <h1 className='w-full py-1 text-xl text-center uppercase lg:text-2xl'>Login <span className="lowercase">or</span> register</h1>
     <p className='text-base text-center text-slate-500'>You can easily join One Percent Better with just one of your social media accounts. You need not to worry about remembering your credentials to use One Percent Better!</p>
     <div className="flex flex-col items-center justify-center w-full transition-all duration-500 border shadow-md lg:w-5/6 min-h-56 rounded-xl">
      <div className='flex items-center justify-center w-1/2 h-12 text-white rounded-md bg-slate-700'>
       <button className='flex items-center justify-center w-full gap-10 tracking-wider uppercase' onClick={() => signIn('google', { callbackUrl: '/' })}>
        {/* <GoogleIcon color='success' /> */}
        <p>Google</p>
       </button>

      </div>

     </div>
    </div>
   </div>
  )
}

export default SignInPage