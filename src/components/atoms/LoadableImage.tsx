import React, { useCallback, useEffect, useState } from "react";
import Skeleton from "./Skeleton";


interface ImageProps {
  src: string;
}
const LoadableImage = ({ src }: ImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const image = new Image();
    image.onload = handleImageLoad;
    image.src = src;
  }, [src]);

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (

    <div>
      {isLoading && <Skeleton />}
      <img
      className="scale-100 "
        src={src}
        style={{ display: isLoading ? 'none' : 'block' }}
      />
    </div>
  );
};

export default LoadableImage;
