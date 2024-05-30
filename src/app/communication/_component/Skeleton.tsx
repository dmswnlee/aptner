import React from 'react';

const Skeleton = () => {
  return (
    <div className="p-2 overflow-hidden">
      <div className="relative w-[248px] h-[180px] bg-gray-300 animate-pulse rounded-lg mb-2"></div>
      <div className="h-6 bg-gray-300 animate-pulse rounded mb-2"></div>
      <div className="h-4 bg-gray-300 animate-pulse rounded mb-1"></div>
      <div className="flex space-x-1">
        <div className="h-4 w-1/4 bg-gray-300 animate-pulse rounded"></div>
        <div className="h-4 w-1/4 bg-gray-300 animate-pulse rounded"></div>
        <div className="h-4 w-1/4 bg-gray-300 animate-pulse rounded"></div>
      </div>
    </div>
  );
};

export default Skeleton;
