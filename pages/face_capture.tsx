import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import WebcamCapture from '@/components/face_capture/WebcamCapture';
import withSubscription from '@/domain/auth/withSubscription';
import database from '@/data/database';
import auth from '@/data/auth';
import { Button } from '@mui/material';

const FaceCapture = () => {
  const [modelExists, setModelExists] = useState(true);

  useEffect(() => {
    const runner = async () => {
      const userId= await auth.getCurrentUserId();
      if (userId.isNone()) {
        setModelExists(false);
        return;
      }

      const aiModel = await database.getLatestImageModel(userId.unwrap().uid);
      setModelExists(aiModel.isSome());
    };

    runner();
  }, []);

  return (
    <>
      {modelExists ?
        <div className="h-screen w-screen flex flex-col justify-center items-center">
          <p>you already have a model!</p>
          <Button>

            <Link
              href="/team"
            >go to your team</Link>
          </Button>
        </div> :
        <div className="min-h-screen bg-white">
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-4xl font-bold text-[#63b2fd] mt-8 mb-16">train your model</h1>
            <WebcamCapture />
          </div>
        </div>}
    </>
  );
};

export default withSubscription(FaceCapture);

