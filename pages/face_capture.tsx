import React, { useState } from 'react';
import WebcamCapture from '@/components/face_capture/WebcamCapture';
import withSubscription from '@/domain/auth/withSubscription';
import database from '@/data/database';

const FaceCapture = () => {
  // const [modelExists, setModelExists] = useState(false);

  // useEffect(() => {
  //   const aiModel = database.getUserImageModel();

  // }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold text-[#63b2fd] mt-8 mb-16">train your model</h1>
        <WebcamCapture />
      </div>
    </div>
  );
};

export default withSubscription(FaceCapture);

