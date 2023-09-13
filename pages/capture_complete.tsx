import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import firebase from '../utils/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { FaArrowLeft, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import withAuth from '@/domain/auth/withAuth';

const CaptureComplete = () => {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const prevImageIndex = useRef(currentImageIndex);

  useEffect(() => {
    const storedImages = sessionStorage.getItem('capturedImages');
    if (storedImages) {
      setImages(JSON.parse(storedImages));
    }
  }, []);

  useEffect(() => {
    prevImageIndex.current = currentImageIndex;
  }, [currentImageIndex]);

  const navigateImage = (direction: 'left' | 'right') => {
    if (direction === 'left' && currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1);
    } else if (direction === 'right' && currentImageIndex < images.length - 1) {
      setCurrentImageIndex((prev) => prev + 1);
    }
  };

  const uploadImageToStorage = async (imageDataUrl: string, index: number) => {
    const user = firebase.auth.currentUser;
    if (!user) return;

    const fileName = `${index}_${new Date().toISOString()}.png`;
    const imageRef = ref(firebase.storage, `face_captures/${user.uid}/${fileName}`);

    const data = imageDataUrl.split(',')[1];
    const byteArray = Uint8Array.from(atob(data), (c) => c.charCodeAt(0));
    await uploadBytes(imageRef, byteArray);

    return await getDownloadURL(imageRef);
  };

  const storeImageLinksInFirestore = async (downloadLinks: string[]) => {
    const user = firebase.auth.currentUser;
    if (!user) return;

    const promises = downloadLinks.map((link, index) => {
      const imageDoc = doc(firebase.db, 'face_capture', user.uid, 'trainImages', `${index}_${new Date().toISOString()}`);
      return setDoc(imageDoc, { imageUrl: link });
    });

    await Promise.all(promises);
  };

  const handleSubmit = async () => {
    const downloadURLs = await Promise.all(images.map(uploadImageToStorage));
    await storeImageLinksInFirestore(downloadURLs);
    router.push('/success');
  };

  return (
    <div className="flex bg-[#63b2fd] flex-col h-screen justify-center items-center">
      <button onClick={() => router.push('/face_capture')} className="absolute top-3 text-[#fff] left-3 font-semibold flex items-center space-x-2">
        <FaArrowLeft size={20} />
        <span>not happy with the captures? retake them!</span>
      </button>

      <div className="relative w-64 h-64 overflow-hidden rounded-xl border-4 border-[#fff]">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Captured-${index}`}
            className={`absolute top-0 transition-transform duration-300 
              ${index === currentImageIndex ? 'left-0 transform translate-x-0' : ''}
              ${index < currentImageIndex ? 'left-0 transform -translate-x-full' : ''}
              ${index > currentImageIndex ? 'right-0 transform translate-x-full' : ''}
            `}
          />
        ))}
        <button
          onClick={() => navigateImage('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 hover:text-#63b2fd focus:text-#63b2fd active:scale-90"
        >
          <FaChevronLeft size={30} />
        </button>
        <button
          onClick={() => navigateImage('right')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 hover:text-#63b2fd focus:text-#63b2fd active:scale-90"
        >
          <FaChevronRight size={30} />
        </button>
      </div>

      <button onClick={handleSubmit} className="tapped_btn_rounded">submit captures</button>
    </div>
  );
};

export default withAuth(CaptureComplete);
