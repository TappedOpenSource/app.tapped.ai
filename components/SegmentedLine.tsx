import React from 'react';

const SegmentedLine = ({ totalPages, currentIndex }) => {
  return (
    <div className="flex justify-between absolute top-10 left-5 right-3">
      {Array.from({ length: totalPages }).map((_, index) => (
        <div
          key={index}
          className={`w-8 rounded-full h-1 bg-[#8ac3f8] mr-1 ${currentIndex >= index ? 'bg-[#fff]' : ''}`}
        ></div>
      ))}
    </div>
  );
};

export default SegmentedLine;


