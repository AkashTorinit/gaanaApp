"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect, useRef, useState } from "react";
import ShuffleIcon from "../atoms/Shuffle";
import PreviousIcon from "../atoms/PreviousSongIcon";
import PlayIcon from "../atoms/PlayIcon";
import NextSongIcon from "../atoms/NextSongIcon";
import RepeatButtonIcon from "../atoms/RepeatButton";
import PauseIcon from "../atoms/PauseIcon";
import { setCurrentSong } from "@/redux/features/counterSlice";

const PlayerCantainer = () => {
  const { song, allSongs }: any = useAppSelector(state => state.rootReducer);
  const [isSongPlaying, setisSongPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
 
console.log("song",song)
  const dispatch = useAppDispatch();
  const initAudio = () => {
    if (audioRef.current) {
      if (isSongPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setisSongPlaying(!isSongPlaying);
    }
  };
  console.log("song", audioRef)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      return () => {
        audioRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, []);
  
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  

  const NextSongHandler = () => {

    allSongs.forEach((element: any, i: number) => {
      if (song.trackId === element.trackId) {
        return dispatch(setCurrentSong(allSongs[i + 1]));
      }
    });


  }
 
  
  useEffect(() => {
    if (isSongPlaying) {
      audioRef?.current?.play();
    } else {
      audioRef?.current?.pause();
    }
  
   
  }, [isSongPlaying, song?.previewUrl]);
  



  
  
  
 
  
 
  

  return (
    <div className="w-full sticky bottom-0">
      <div className="flex items-center justify-center h-1/4 ">
        <div className="bg-white shadow-lg rounded-lg w-full">
        <div className="relative mb-5 h-1 rounded-full bg-gray-200">
        <div className="h-1 rounded-full bg-red-500" style={{ width: `${(currentTime / (audioRef?.current?.duration || 0)) * 100}%` }}></div>
</div>
          <div className="flex bg-[#fff]">
            <div>
              {/* Previous and shuffle buttons */}
            </div>
            <div className="w-full pt-8">
              {/* Other UI elements */}
              <div className="flex justify-between items-center">
              <div className="text-black-darker">
              <div className=" h-8 w-35  border-black-600 flex justify-center align-text-bottom bg-white rounded-full  border-2">
                <span className="text-sm"> 00.{parseInt(currentTime || "00")} </span> <span className="text-sm"> /</span> <span className="text-sm">00.{parseInt(audioRef?.current?.duration || "00")}</span>
</div>
                </div>
                <div className="text-grey-darker">
                  <ShuffleIcon />
                </div>
                <div className="text-grey-darker">
                  <PreviousIcon />
                </div>

                <div className="text-white px-4 rounded-full bg-[#e72c30] shadow-lg">
                  <button
                    onClick={initAudio}
                    title={isSongPlaying ? "Pause" : "Play"}
                  >
                    {isSongPlaying ? (

                      <PauseIcon />
                    ) : (
                      // Play icon
                      <PlayIcon />
                    )}
                  </button>
                  <audio ref={audioRef} src={song?.previewUrl || ""} />
                </div>

                <div className="text-grey-darker" onClick={NextSongHandler}>
                  <NextSongIcon />
                </div>
                <div className="text-grey-darker"><RepeatButtonIcon /> </div>
              </div>
              <div className="mx-8 py-4">
                {/* Track time and progress bar */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCantainer;

