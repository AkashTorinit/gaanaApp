"use client"
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import GoogleIcon from "../../components/atoms/googleIcon"



const Login = () => {
  const session = useSession();
  console.log(session);
  if (session.status === "authenticated") {
    redirect('/')
  }
  return (
    <div className="flex justify-center items-center h-screen bg-rose-600">
      <div className="absolute inset-0">
        <Image
          src="https://raw.githubusercontent.com/AkashTorinit/images/main/pexels-jessica-lewis-583843.jpg"
          alt="background image"
          fill
        />
      </div>

      <div className=" relative z-10  px-6 sm:px-0 max-w-sm">
        <button onClick={() => signIn("google")} type="button" className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2"> <GoogleIcon /> Sign up with Google<div></div></button>
      </div>
    </div>
  )
}

export default Login;
