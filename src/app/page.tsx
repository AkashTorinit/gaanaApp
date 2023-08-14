"use client"

import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { setUser, clearUser } from '@/redux/features/counterSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
export default function Home() {
  const session = useSession();
  const userData = useAppSelector(state => state);
  const dispatch = useAppDispatch();


  useEffect(() => {

    if (session) {
      if (session.status === 'unauthenticated') {
        redirect('/login');
      }
      dispatch(setUser(session));
    }
  }, [session.status])





  return (

    <div className="flex">
      <div className="flex-1">
        <div className="mt-8 text-center">

          <button onClick={() => signOut()} className="bg-gray-500 text-white px-4 py-2 rounded mr-4">
            Sign out
          </button>

        </div>
      </div>
    </div>

  );
}
