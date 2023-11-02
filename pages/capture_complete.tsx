import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { auth, db, storage } from '../utils/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { FaArrowLeft, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import api from '../data/api';
import withAuth from '@/domain/auth/withAuth';

const CaptureComplete = () => {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [type, setType] = useState('man');
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
    const user = auth.currentUser;
    if (!user) return;

    const fileName = `${index}_${new Date().toISOString()}.png`;
    const imageRef = ref(storage, `aiModels/${user.uid}/${fileName}`);

    const data = imageDataUrl.split(',')[1];
    const byteArray = Uint8Array.from(atob(data), (c) => c.charCodeAt(0));
    await uploadBytes(imageRef, byteArray, { contentType: 'image/png' });

    return await getDownloadURL(imageRef);
  };

  const storeImageLinksInFirestore = async (downloadLinks: string[]) => {
    const user = auth.currentUser;
    if (!user) return;

    const userSamplesCollection = collection(db, 'referenceImages', user.uid, 'userSamples');

    const promises = downloadLinks.map((link) => {
      return addDoc(userSamplesCollection, { url: link });
    });

    await Promise.all(promises);
  };

  const handleSubmit = async () => {
    const downloadURLs = await Promise.all(images.map(uploadImageToStorage));
    const modelObj = {
      imageUrls: downloadURLs,
      type: type,
      name: 'faceCaptureModel',
    };
    console.log(modelObj);
    await storeImageLinksInFirestore(downloadURLs);
    await api.trainUserModel(modelObj);
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

      <div className="my-6">
        <div className="flex justify-between w-64 bg-white p-2 rounded-full text-center">
          {['man', 'woman', 'unisex'].map((option) => (
            <label key={option} className="cursor-pointer">
              <input
                type="radio"
                name="genderOption"
                value={option}
                checked={type === option}
                onChange={() => setType(option)}
                className="hidden"
              />
              <span className={`p-4 ${type === option ? 'text-[#63b2fd] font-bold' : 'text-black font-semibold'}`}>
                {option}
              </span>
            </label>
          ))}
        </div>
      </div>

      <button onClick={handleSubmit} className="tapped_btn_rounded">submit captures</button>
    </div>
  );
};

export default withAuth(CaptureComplete);
