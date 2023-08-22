
"use client"

import { useEffect, useRef, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { setUser, clearUser, setCurrentSong, setAllSongs } from '@/redux/features/counterSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite';
import PlayerCantainer from '@/components/organisms/PlayerCantainer';
import PlayIconOnHover from '@/components/atoms/playIconOnHover';
import { addThreeDotsAfter15Letters, convertedImages, fetcher } from '@/helper';
import CarouselDefault from '@/components/molecules/Carousel';
import LazyLoadingImage from '@/components/molecules/LazyloadingImage';
import Header from '@/components/organisms/Header';
import FullScreenLoader from '@/components/atoms/Loader';
export default function Home() {
    const session = useSession();
    const dispatch = useAppDispatch();
    const windowRef = useRef(null);

    useEffect(() => {

        if (session) {
            if (session.status === 'unauthenticated') {
                redirect('/login');
            }
            dispatch(setUser(session));
        }
    }, [session.status])


    const getKey = (pageIndex: any, previousPageData: string | any[]) => {
        console.log("pageIndex", pageIndex && !previousPageData.length)
        let term = "Arijit Singh"
        console.log("isLoading", isLoading);

        if (pageIndex && !previousPageData.length) return null;

        return `https://itunes.apple.com/search/?term=${term}&offset=${parseInt(size)}&media=music&limit=${parseInt(size) * 30}`;
    };

    const { data, error, isLoading, size, setSize }: any = useSWRInfinite(getKey, fetcher);

    const handleScroll = () => {


        if (windowRef.current.innerHeight + windowRef.current.scrollY >= document.body.offsetHeight - 25) {
            setSize(size + 1)
        }


    };



    useEffect(() => {
        windowRef.current = window;
        if (data && data[0]?.results) {
            dispatch(setAllSongs(data[0]?.results));
            dispatch(setCurrentSong(data[0]?.results[0]));
        }
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [data])

    const changeCurrentSong = (newSong: any) => {

        dispatch(setCurrentSong(newSong));
    };
    if (error) return <div>failed to load</div>
    // if (isLoading) return 




    return (
        <><Header />
            <div className="container  my-12 mx-auto px-4 md:px-12">

                <div className="flex flex-wrap -mx-1 lg:-mx-4">

                    {data && data[0]?.results.map((item: any, index: number) => (
                        <div
                            key={index}
                            className="my-1  px-1 w-full border-gray-50 md:w-1/2 lg:my-4 lg:px-4 lg:w-1/6"
                        >
                            <article className="overflow-hidden transition-height duration-300 ease-linear rounded-lg">

                                <div className="relative transition-height duration-300 ease-linear" onClick={() => changeCurrentSong(item)}>

                                    <LazyLoadingImage src={convertedImages(item.artworkUrl100)} />

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



            </div>
            {data && data[0]?.results && <PlayerCantainer />}
        </>
    );

}


