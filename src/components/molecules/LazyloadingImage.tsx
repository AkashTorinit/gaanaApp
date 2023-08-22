import { useIntersection } from '@/hooks/useIntersectionObserver';
import React, { useState, useRef, FC } from 'react';
import LoadableImage from '../atoms/LoadableImage';
import Skeleton from '../atoms/Skeleton';


interface ImageProps {
  src: string;
}
const LazyLoadingImage: FC<ImageProps> = ({ src }) => {
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement | null>(null);
  useIntersection(imgRef, () => {
    setIsInView(true);
  });
  return (
  
      <div
        className="image-container"
        ref={imgRef}
      >
        {isInView ? (
          <LoadableImage
            src={src} />
        ) : <Skeleton />}
      </div>
  
  );
};
export default LazyLoadingImage;