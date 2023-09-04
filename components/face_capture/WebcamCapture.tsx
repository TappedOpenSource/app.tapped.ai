import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';

const WebcamCapture = () => {
  const videoRef = useRef(null);
  const [initialized, setInitialized] = useState(false);

  function distance(point1, point2) {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68TinyNet.loadFromUri('/models');
    };

    const setupWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          setInitialized(true);
        };
      } catch (err) {
        console.error('Error accessing the webcam:', err);
      }
    };

    loadModels().then(setupWebcam);
  }, []);

  useEffect(() => {
    if (initialized) {
      const interval = setInterval(async () => {
        const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks(true);

        if (detections && detections.length > 0) {
          const landmarks = detections[0].landmarks;
          const leftEye = landmarks.getLeftEye();
          const rightEye = landmarks.getRightEye();

          const distance = (a, b) => {
            return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
          };

          const eyeHeightDifference = Math.abs(leftEye[0].y - rightEye[0].y);
          const innerEyeDist = distance(leftEye[0], rightEye[0]);
          const outerEyeDist = distance(leftEye[3], rightEye[3]);

          if (eyeHeightDifference > 5) {
            console.log('Rotate your face more towards the camera!');
          } else if (innerEyeDist > outerEyeDist) {
            console.log('Rotate your face back to face the camera more directly!');
          } else {
            console.log('Face position is good!');
          }
        } else {
          console.log('No face detected!');
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [initialized]);


  return (
    <div className="page flex h-full flex-col items-center justify-center bg-[#63b2fd]">
      <div className="relative w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          className="absolute inset-0 w-full h-full object-cover z-10"
        ></video>
        <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none">
          <rect x="0" y="0" width="100%" height="100%" fill="#63b2fd" mask="url(#mask)" />
          <mask id="mask">
            <rect x="0" y="0" width="100%" height="100%" fill="#fff" />
            <circle cx="50%" cy="50%" r="50%" fill="#000" />
          </mask>
          <circle cx="50%" cy="50%" r="49%" stroke="#fff" strokeWidth="2%" fill="none" />
        </svg>
      </div>
    </div>
  );
};

export default WebcamCapture;
