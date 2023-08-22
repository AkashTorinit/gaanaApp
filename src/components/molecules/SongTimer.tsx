import React from "react";

const SongTimer = ({ currentTime, duration }: any) => {



    return (
        <>
            <div className=" h-8 w-35 p-2  border-black-600 flex justify-center items-center align-text-bottom bg-white rounded-full  border-2">
                <span className="text-sm"> 00.{parseInt(currentTime || "00")} </span> <span className="text-sm"> /</span> <span className="text-sm">00.{parseInt(duration || "00")}</span>
            </div>
        </>
    );
};

export default SongTimer;
