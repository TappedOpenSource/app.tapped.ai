import React, { useRef, useEffect, useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import firebase from '../../utils/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';

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

    if (newImages.length === 5) {
      await processAllImages();
    }
  };

  const uploadImageToStorage = async (imageDataUrl, index) => {
    const user = firebase.auth.currentUser;
    if (!user) return;

    const fileName = `${index}_${new Date().toISOString()}.png`;
    const imageRef = ref(firebase.storage, `face_captures/${user.uid}/${fileName}`);

    const data = imageDataUrl.split(',')[1];
    const byteArray = Uint8Array.from(atob(data), (c) => c.charCodeAt(0));
    await uploadBytes(imageRef, byteArray);

    return await getDownloadURL(imageRef);
  };

  const storeImageLinksInFirestore = async (downloadLinks) => {
    const userDoc = doc(firebase.db, 'face_captures', firebase.auth.currentUser.uid);
    await setDoc(userDoc, { images: downloadLinks });
  };

  const processAllImages = async () => {
    const downloadURLs = await Promise.all(capturedImages.map(uploadImageToStorage));
    await storeImageLinksInFirestore(downloadURLs);
  };

  const getInstructionText = () => {
    if (capturedImages.length >= 5) {
      return 'Done!';
    }
    return 'Follow the instructions on the display and we\'ll get your model set up in no time';
  };

  return (
    <div className="page flex h-full flex-col items-center justify-center bg-white">
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
      <p className="mt-10 font-semibold text-[#63b2fd] text-center">{getInstructionText()}</p>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      <div className="fixed bottom-20 left-0 right-0 flex justify-between items-center px-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="w-1/5 mx-2 mb-16">
            {capturedImages[index] ? (
              <img
                src={capturedImages[index]}
                alt={`Captured-${index}`}
                className="object-cover w-full h-16 rounded-full shadow border-2 border-[#63b2fd] animate-fade-in"
              />
            ) : (
              <div className="border-gray-300 w-full h-24 rounded-lg"></div>
            )}
          </div>
        ))}
      </div>

      <button onClick={captureImage} className="absolute bottom-16 bg-[#63b2fd] p-4 rounded-full shadow-lg w-16 h-16 flex items-center justify-center">
        <FaCamera color="white" size={24} />
      </button>
    </div>
  );
};

export default WebcamCapture;


