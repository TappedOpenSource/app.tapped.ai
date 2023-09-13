import React from 'react';
import WebcamCapture from '../components/face_capture/WebcamCapture';
import withAuth from '@/domain/auth/withAuth';

const FaceCapture = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold text-[#63b2fd] mt-8 mb-16">train your model</h1>
        <WebcamCapture />
      </div>
    </div>
  );
};

export default withAuth(FaceCapture);

