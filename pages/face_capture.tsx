import React from 'react';
import WebcamCapture from '../components/face_capture/WebcamCapture';

const FaceCapture = () => {
  return (
    <div className="min-h-screen bg-[#63b2fd] text-white">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold mt-8 mb-16">train your model</h1>
        <WebcamCapture />
      </div>
    </div>
  );
};

export default FaceCapture;

