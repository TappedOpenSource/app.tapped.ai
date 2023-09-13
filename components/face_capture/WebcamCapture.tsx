import React, { useRef, useEffect, useState } from 'react';
import { FaCamera, FaArrowRight } from 'react-icons/fa';
import { useRouter } from 'next/router';

const WebcamCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImages, setCapturedImages] = useState([]);
  const overlayImages = [
    'look_forward.png',
    'turn_up.png',
    'turn_down.png',
    'turn_left.png',
    'turn_right.png',
  ];

  const router = useRouter();

  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    let stream;

    const setupWebcam = async () => {
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => {
        videoRef.current.play();
      };
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopWebcam();
      } else {
        setupWebcam();
      }
    };

    const handleBeforeUnload = () => {
      stopWebcam();
    };

    setupWebcam();

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      stopWebcam();
    };
  }, []);

  const captureImage = async () => {
    if (capturedImages.length >= 5) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const size = Math.min(video.videoWidth, video.videoHeight);
    const xOffset = (video.videoWidth - size) / 2;
    const yOffset = (video.videoHeight - size) / 2;

    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    ctx.translate(size, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, xOffset, yOffset, size, size, 0, 0, size, size);

    const newImages = [...capturedImages, canvas.toDataURL('image/png')];
    setCapturedImages(newImages);
  };

  const navigateToCaptureComplete = () => {
    stopWebcam();
    sessionStorage.setItem('capturedImages', JSON.stringify(capturedImages));
    router.push('/capture_complete');
  };

  const getInstructionText = () => {
    if (capturedImages.length >= 5) {
      return 'Done!';
    }
    return 'Follow the instructions on the display and we\'ll get your model set up in no time';
  };

  return (
    <div className="page flex h-full flex-col items-center justify-between bg-white p-8 space-y-8">
      <div className="relative w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-10 transform scale-x-[-1]"
        ></video>
        {capturedImages.length < overlayImages.length && (
          <img
            src={`/images/${overlayImages[capturedImages.length]}`}
            alt="Overlay"
            className="absolute inset-0 w-full h-full object-cover z-10 opacity-40 transform scale-95"
          />
        )}
        <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none scale-105 transform">
          <rect x="0" y="0" width="100%" height="100%" fill="white" mask="url(#mask)" />
          <mask id="mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <circle cx="50%" cy="50%" r="46%" fill="#000" />
          </mask>
          <circle cx="50%" cy="50%" r="46%" stroke="#63b2fd" strokeWidth="2%" fill="none" />
        </svg>
      </div>
      <p className="font-semibold text-[#63b2fd] text-center">{getInstructionText()}</p>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

      <div className="flex flex-col items-center space-y-8">
        {capturedImages.length < 5 ? (
          <button onClick={captureImage} className="absolute bottom-3 bg-[#63b2fd] p-4 rounded-full shadow-lg w-16 h-16 flex items-center justify-center">
            <FaCamera color="white" size={24} />
          </button>
        ) : (
          <button onClick={navigateToCaptureComplete} className="absolute bottom-3 bg-[#63b2fd] p-4 rounded-full shadow-lg w-16 h-16 flex items-center justify-center">
            <FaArrowRight color="white" size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default WebcamCapture;
