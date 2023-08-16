"use client"

import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { setUser, clearUser, setCurrentSong, setAllSongs } from '@/redux/features/counterSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import useSWR from 'swr'
import './globals.css'
import PlayerCantainer from '@/components/organisms/PlayerCantainer';
import PlayIconOnHover from '@/components/atoms/playIconOnHover';
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
  let term = "jack+johnson"
  let offset = 2
  const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())
  const { data, error, isLoading } = useSWR(`https://itunes.apple.com/search/?term=${term}&offset=${offset}&media=music&limit=20`, fetcher)

 

useEffect(()=>{

  if(data?.results){
    dispatch(setAllSongs(data.results));
    dispatch(setCurrentSong(data.results[0]));
}
},[data?.results])

  const changeCurrentSong = (newSong:any) => {
     
    dispatch(setCurrentSong(newSong));
  };
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  function addThreeDotsAfter15Letters(inputText: string) {
    if (inputText.length > 15) {
      return inputText.substring(0, 15) + '...';
    } else {
      return inputText;
    }
  }


  return (
    <div className="container my-12 mx-auto px-4 md:px-12">
      <div className="flex flex-wrap -mx-1 lg:-mx-4">

        {data.results.map((item: any, index: number) => (
          <div
            key={index}
            className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/5"
          >
            <article className="overflow-hidden rounded-lg">

              <div className="relative" onClick={() => changeCurrentSong(item)}>
                <img
                  alt="Placeholder"
                  className="block h-auto w-full max-w-full"
                  src={item.artworkUrl100}
                />
                <div className="play-icon-container bg-transparent" >
                  <PlayIconOnHover />
                </div>
              </div>

              <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                <a
                  className="flex items-center no-underline hover:underline text-black"
                  href="#"
                >
                  <p className="ml-2  text-[rgba(0,0,0,.9)]  font-semibold text-sm">{addThreeDotsAfter15Letters(item.collectionName)}</p>
                </a>
              </footer>
            </article>
          </div>
        ))}

      </div>
      {data?.results && <PlayerCantainer /> }
      
    </div>
    

  );

}


