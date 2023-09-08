import React, { useRef, useEffect, useState } from 'react';

const WebcamCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImages, setCapturedImages] = useState([]);

  useEffect(() => {
    const setupWebcam = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => {
        videoRef.current.play();
      };
    };

    setupWebcam();
  }, []);

  const captureImage = () => {
    if (capturedImages.length >= 5) return; // Prevent capturing more than 5 images

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const size = Math.min(video.videoWidth, video.videoHeight);
    const xOffset = (video.videoWidth - size) / 2;
    const yOffset = (video.videoHeight - size) / 2;

    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, xOffset, yOffset, size, size, 0, 0, size, size);

    if (capturedImages.length < 5) {
      setCapturedImages((prevImages) => [...prevImages, canvas.toDataURL('image/png')]);
    }
  };


  return (
    <div className="page flex h-full flex-col items-center justify-center bg-white">
      <div className="relative w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          className="absolute inset-0 w-full h-full object-cover z-10"
        ></video>
        <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none scale-105 transform">
          <rect x="0" y="0" width="100%" height="100%" fill="white" mask="url(#mask)" />
          <mask id="mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <circle cx="50%" cy="50%" r="46%" fill="#000" />
          </mask>
          <circle cx="50%" cy="50%" r="46%" stroke="#63b2fd" strokeWidth="2%" fill="none" />
        </svg>
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      <div className="fixed bottom-20 left-0 right-0 flex justify-between items-center px-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="w-1/5 animate-fade-in mx-2 mb-20">
            {capturedImages[index] ? (
              <img src={capturedImages[index]} alt={`Captured-${index}`} className="object-cover w-full h-16 rounded-full shadow border-2 border-[#63b2fd]" />
            ) : (
              <div className="border-gray-300 w-full h-24 rounded-lg"></div>
            )}
          </div>
        ))}
      </div>
      <button onClick={captureImage} className="absolute bottom-16 bg-[#63b2fd] p-4 rounded-full shadow-lg">Capture</button>
    </div>
  );
};

export default WebcamCapture;
