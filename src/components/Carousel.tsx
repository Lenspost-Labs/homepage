'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface CarouselProps {
  interval?: number;
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({
  interval = 5000,
  images = []
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [carouselImages, setCarouselImages] = useState(images);

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
        className="absolute inset-0 flex transition-transform duration-1000"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {carouselImages.map((image, index) => (
          <div className="relative h-full w-full flex-shrink-0" key={index}>
            <Image
              alt={`background-image-${index}`}
              className="object-cover"
              fill={true}
              src={image}
            />
          </div>
        ))}
      </div>
      <button
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 transform rounded-full bg-gray-800 bg-opacity-50 p-2 text-white"
        onClick={handlePrevious}
      >
        &lt;
      </button>
      <button
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 transform rounded-full bg-gray-800 bg-opacity-50 p-2 text-white"
        onClick={handleNext}
      >
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
