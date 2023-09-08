import React from 'react';

const SegmentedLine = ({ totalPages, currentIndex }) => {
  return (
    <div className="flex justify-between absolute top-10 left-5 right-3 md:top-16 md:left-16 md:right-16">
      {Array.from({ length: totalPages }).map((_, index) => (
        <div
          key={index}
          className={`w-8 md:w-36 rounded-full h-1 md:h-2 bg-[#8ac3f8] mr-1 md:mr-3 ${currentIndex >= index ? 'bg-[#fff]' : ''}`}
        ></div>
      ))}
    </div>
  );
};

export default SegmentedLine;
