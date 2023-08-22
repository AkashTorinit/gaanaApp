import React from "react";

const ProgressBar = ({ currentTime, duration }: any) => {
  const progressBarWidth = (currentTime / (duration || 0)) * 100;

  const progressBarStyles = {
    width: `${progressBarWidth}%`,
    transition: "width 0.1s ease-in-out", 
  };
  return (
    <>
      <div className="relative mb-5 h-1 rounded-full bg-gray-200">
        <div
          className="h-1 rounded-full bg-red-500"
          style={progressBarStyles}
        ></div>
      </div>
    </>
  );
};

export default ProgressBar;
