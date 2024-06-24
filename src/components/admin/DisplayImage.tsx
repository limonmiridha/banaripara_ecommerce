import Image from 'next/image';
import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const DisplayImage = ({ img, onClose }: any) => {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-screen py-3 bg-white">
      <Image src={img} fill alt="" className="py-3" />
      <AiOutlineClose
        onClick={onClose}
        className="absolute right-4 top-4 text-2xl text-white cursor-pointer"
      />
    </div>
  );
};

export default DisplayImage;
