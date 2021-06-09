import React from 'react';

const GhostLayout = () => {
  return (
    <div>
      <div className="animate-pulse h-40 sm:h-40 w-100 bg-gray-200" />
      <div className=" max-w-5xl mx-auto px-4">
        <div className="-mt-20 w-44 h-44 rounded-full flex items-center justify-center relative overflow-hidden border-white border-8 bg-gray-100 -ml-2" />
      </div>
    </div>
  );
};

export default GhostLayout;
