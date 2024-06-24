import React from 'react';

const DefaultButton = ({ children, ...p }: any) => {
  return (
    <button
      {...p}
      className={`w-fit bg-red-600 hover:bg-red-700 rounded-full px-4 py-2 text-white ${p.className}`}
    >
      {children}
    </button>
  );
};

export default DefaultButton;
