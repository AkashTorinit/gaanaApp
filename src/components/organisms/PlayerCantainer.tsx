"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect, useRef, useState } from "react";
import PreviousIcon from "../atoms/PreviousSongIcon";
import PlayIcon from "../atoms/PlayIcon";
import NextSongIcon from "../atoms/NextSongIcon";
import PauseIcon from "../atoms/PauseIcon";
import { setCurrentSong } from "@/redux/features/counterSlice";
import { addThreeDotsAfter15Letters, convertedImages } from "../../helper";
import ProgressBar from "../molecules/ProgressBar";
import VolumeIcon from "../atoms/Volume";
import SongTimer from "../molecules/SongTimer";

const PlayerCantainer = () => {
  const { song, allSongs }: any = useAppSelector(state => state.rootReducer);
  const [isSongPlaying, setisSongPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);


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

  const handleProgressBarClick = (e: any) => {
    const clickX = e.nativeEvent.offsetX;
    const progressBarWidth = e.currentTarget.offsetWidth;
    const newTime = (clickX / progressBarWidth) * audioRef?.current?.duration;
    audioRef.current.currentTime = newTime
  };

  useEffect(() => {
    if (isSongPlaying) {
      audioRef?.current?.play();
    } else {
      audioRef?.current?.pause();
    }


  }, [isSongPlaying, song?.previewUrl]);



  return (
    <div className="w-full sticky bottom-0 ">
      <div className="flex items-center justify-center h-1/2  " onClick={handleProgressBarClick}>
        <div className="  bg-white rounded-lg w-full" >
          <ProgressBar currentTime={currentTime} duration={audioRef?.current?.duration} />
          <div className="flex bg-[#fff]">

            <div className="flex p-2 w-1/2 h-12">
              <div className="text-black-darker mx-2 w-1/12">
                <img
                  alt="Placeholder"
                  className="block h-full w-full rounded"
                  src={convertedImages(song?.artworkUrl100)}
                />
              </div>
              <div className="flex flex-col  text-black-darker">
                <div className="text-sm">{song?.artistName && addThreeDotsAfter15Letters(song?.artistName)}</div>
                <div className="text-sm">{song?.collectionName && addThreeDotsAfter15Letters(song?.collectionName)}</div>
              </div>
              <div className="text-black-darker m-5 flex items-center ">
                <SongTimer currentTime={currentTime} duration={audioRef?.current?.duration} />
              </div>

            </div>

            <div className="w-full pt-2">

              <div className="flex justify-around items-center">

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
                      <PlayIcon />
                    )}
                  </button>
                  <audio ref={audioRef} src={song?.previewUrl || ""} />
                </div>

                <div className="text-grey-darker" onClick={NextSongHandler}>
                  <NextSongIcon />
                </div>
                <div className="text-grey-darker"><VolumeIcon /> </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCantainer;

