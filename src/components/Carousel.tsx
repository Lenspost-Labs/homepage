'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface CarouselProps {
  interval?: number;
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({
  interval = 10000,
  images = []
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [carouselImages, setCarouselImages] = useState(images);

  // useEffect(() => {
  //   if (images.length === 0) return;

  //   const cycleImages = () => {
  //     setCurrentIndex((prevIndex: any) => {
  //       const newIndex = prevIndex + 1;

  //       // Check if we've reached the last image
  //       if (newIndex === carouselImages.length) {
  //         // Reset to the first image
  //         setCurrentIndex(0);
  //       } else {
  //         return newIndex;
  //       }
  //     });
  //   };

  //   const intervalId = setInterval(cycleImages, interval);

  //   return () => clearInterval(intervalId);
  // }, [images, interval, carouselImages.length]);

  // useEffect(() => {
  //   if (images.length === 0) return;

  //   const cycleImages = () => {
  //     setCurrentIndex((prevIndex: any) => {
  //       const newIndex = prevIndex + 1;

  //       // Check if we've reached the last image
  //       if (newIndex === carouselImages.length) {
  //         // Reset to the first image
  //         setCurrentIndex(0);
  //       } else {
  //         return newIndex;
  //       }
  //     });
  //   };

  useEffect(() => {
    if (images.length === 0) return;

    const cycleImages = () => {
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex + 1;

        if (newIndex >= carouselImages.length - 1) {
          setCarouselImages((prevImages) => [...prevImages, ...images]);
        }

        return newIndex;
      });
    };

    const intervalId = setInterval(cycleImages, interval);

    return () => clearInterval(intervalId);
  }, [images, interval, carouselImages.length]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        style={{
          transform: `translateX(-${currentIndex === carouselImages.length + 1 ? 0 : currentIndex * 100}%)`
        }}
        className="absolute inset-0 flex transition-transform duration-1000"
      >
        {carouselImages?.map((image, index) => (
          <div className="relative h-full w-full flex-shrink-0" key={index}>
            {image !== '' && (
              <Image
                alt={`background-image-${index ? index : ''}`}
                className="h-fit w-full object-cover"
                src={image ? image : ''}
                fill={true}
              />
            )}
          </div>
        ))}
      </div>
      <button
        className="absolute left-4 top-1/2 z-20 h-10 w-10 -translate-y-1/2 transform rounded-full bg-gray-800 bg-opacity-50 p-2 text-white"
        onClick={handlePrevious}
      >
        &lt;
      </button>
      <button
        className="absolute right-4 top-1/2 z-20 h-10 w-10 -translate-y-1/2 transform rounded-full bg-gray-800 bg-opacity-50 p-2 text-white"
        onClick={handleNext}
      >
        &gt;
      </button>
      {/* Indicators */}
      {/* <div className="absolute bottom-4 left-1/2 z-50 flex -translate-x-1/2 transform cursor-pointer space-x-2">
        {images.map((img, index) => (
          <span
            key={index}
            className={`h-2 w-2 ${index === currentIndex ? 'bg-red-500  ' : 'bg-gray-300'} cursor-pointer rounded-full`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div> */}
    </div>
  );
};

export default Carousel;
