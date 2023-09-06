import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';

const WebcamCapture = () => {
  const videoRef = useRef(null);
  const [initialized, setInitialized] = useState(false);
  const [facePositionMsg, setFacePositionMsg] = useState('No face detected!');
  const [baselineNosePoint, setBaselineNosePoint] = useState(null);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68TinyNet.loadFromUri('/models');
    };

    const setupWebcam = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => {
        videoRef.current.play();
        setInitialized(true);
      };
    };

    loadModels().then(setupWebcam);
  }, []);

  const handleCalibration = async () => {
    const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks(true);

    if (detections && detections.length > 0) {
      const landmarks = detections[0].landmarks;
      const leftEye = landmarks.getLeftEye();
      const rightEye = landmarks.getRightEye();
      const nose = landmarks.getNose();

      const eyeMidpoint = {
        x: (leftEye[3].x + rightEye[0].x) / 2,
        y: (leftEye[3].y + rightEye[0].y) / 2,
      };

      const baselineOffset = {
        dx: nose[3].x - eyeMidpoint.x,
        dy: nose[3].y - eyeMidpoint.y,
      };

      setBaselineNosePoint(baselineOffset);
    }
  };

  useEffect(() => {
    if (initialized) {
      const interval = setInterval(async () => {
        const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks(true);

        if (detections && detections.length > 0) {
          const landmarks = detections[0].landmarks;
          const leftEye = landmarks.getLeftEye();
          const rightEye = landmarks.getRightEye();
          const nose = landmarks.getNose();

          const eyeMidpoint = {
            x: (leftEye[3].x + rightEye[0].x) / 2,
            y: (leftEye[3].y + rightEye[0].y) / 2,
          };

          if (baselineNosePoint) {
            const currentOffsetX = nose[3].x - eyeMidpoint.x;
            const offsetDifferenceX = currentOffsetX - baselineNosePoint.dx;

            const currentOffsetY = nose[3].y - eyeMidpoint.y;
            const offsetDifferenceY = currentOffsetY - baselineNosePoint.dy;

            const horizontalTolerance = 5;
            const verticalTolerance = 5;

            let horizontalDirection = '';
            let verticalDirection = '';

            if (offsetDifferenceX > horizontalTolerance) {
              horizontalDirection = 'Right';
            } else if (offsetDifferenceX < -horizontalTolerance) {
              horizontalDirection = 'Left';
            }

            if (offsetDifferenceY > verticalTolerance) {
              verticalDirection = 'Down';
            } else if (offsetDifferenceY < -verticalTolerance) {
              verticalDirection = 'Up';
            }

            if (horizontalDirection && verticalDirection) {
              setFacePositionMsg(`Turning ${verticalDirection} and ${horizontalDirection}`);
            } else if (horizontalDirection || verticalDirection) {
              setFacePositionMsg(`Turning ${horizontalDirection}${verticalDirection}`);
            } else {
              setFacePositionMsg('Face position is good!');
            }
          }
        } else {
          setFacePositionMsg('No face detected!');
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [initialized, baselineNosePoint]);

  return (
    <div className="page flex h-full flex-col items-center justify-center bg-[#63b2fd]">
      <div className="relative w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          className="absolute inset-0 w-full h-full object-cover z-10"
        ></video>
        <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none scale-105 transform">
          <rect x="0" y="0" width="100%" height="100%" fill="#63b2fd" mask="url(#mask)" />
          <mask id="mask">
            <rect x="0" y="0" width="100%" height="100%" fill="#fff" />
            <circle cx="50%" cy="50%" r="47%" fill="#000" />
          </mask>
          <circle cx="50%" cy="50%" r="46%" stroke="#fff" strokeWidth="2%" fill="none" />
        </svg>
      </div>
      <p className="text-center mt-4 font-semibold text-white">{facePositionMsg}</p>
      <button onClick={handleCalibration} className="mt-4 p-2 bg-white text-black font-semibold rounded">Calibrate</button>
    </div>
  );
};

export default WebcamCapture;
