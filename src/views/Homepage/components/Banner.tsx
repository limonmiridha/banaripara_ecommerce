'use client';
import React, { useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const desktopImages = [
  'img1.webp',
  'img2.webp',
  'img3.jpg',
  'img4.jpg',
  'img5.webp',
];
const mobileImages = [
  'img1_mobile.jpg',
  'img2_mobile.webp',
  'img3_mobile.jpg',
  'img4_mobile.jpg',
  'img5_mobile.png',
];

const Banner = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    if (desktopImages.length - 1 > currentImage) {
      setCurrentImage((preve) => preve + 1);
    }
  };

  const preveImage = () => {
    if (currentImage != 0) {
      setCurrentImage((preve) => preve - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (desktopImages.length - 1 > currentImage) {
        nextImage();
      } else {
        setCurrentImage(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <div className="container mx-auto px-4 rounded ">
      <div className="h-96 w-full bg-slate-200 relative">
        <div className="absolute z-10 h-full w-full md:flex items-center hidden ">
          <div className=" flex justify-between w-full text-2xl">
            <button
              onClick={preveImage}
              className="bg-white shadow-md rounded-full p-1"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={nextImage}
              className="bg-white shadow-md rounded-full p-1"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
        {/**desktop and tablet version */}
        <div className="hidden md:flex h-full w-full overflow-hidden">
          {desktopImages.map((image, i) => (
            <div
              key={image + i}
              className="w-full h-full min-w-full min-h-full transition-all"
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              <img src={`/images/banner/${image}`} className="w-full h-full" />
            </div>
          ))}
        </div>
        {/**mobile version */}
        <div className="flex h-full w-full overflow-hidden md:hidden">
          {mobileImages.map((image, index) => {
            return (
              <div
                className="w-full h-full min-w-full min-h-full transition-all"
                key={image + index}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img
                  src={`/images/banner/${image}`}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Banner;
