// import Image from 'next/image'
"use client"
import { signOut, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import {setUser,clearUser} from "@/redux/features/counterSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";


export default function Home() {
  const session = useSession();
  const userData = useAppSelector(state => state);

  
    const dispatch = useAppDispatch();
  if (session.status === "loading") {
    return <p>Loading....</p>
  }
  if (session.status === "unauthenticated") {
    redirect('/login')
  }
  
 
  dispatch(setUser(session));


    

    return (
      <main style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}>
        <div style={{ marginBottom: "4rem", textAlign: "center" }}>
         
          <button >increment</button>
          <button
           
            style={{ marginInline: 16 }}
          >
            decrement
          </button>
          <button onClick={() => signOut() }>Sign out</button>

          <button>reset</button>
        </div>
      </main>
  )
}