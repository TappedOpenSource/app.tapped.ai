
import React, { useEffect, useState } from 'react';
import ImageUploader from '@/components/ImageUploader';
import Image from 'next/image';

const FormRefImages = ({ formData, updateFormData }) => {
  const [refImages, setRefImages] = useState<{
    publicId: string;
    secureUrl: string;
  }[]>([]);

  useEffect(() => {
    setRefImages(formData.refImages);
  }, []);

  const handleRemoveImage = (index) => {
    setRefImages((prev) => prev.filter((_, i) => i !== index));
  };

  function handleOnUpload(error, result, widget) {
    if (error) {
      console.log(error);
      // updateError(error);
      widget.close({
        quiet: true,
      });
      return;
    }
    console.log(JSON.stringify(result, null, 2));
    setRefImages((prev) => [
      {
        publicId: result?.info?.public_id,
        secureUrl: result?.info?.secure_url,
      },
      ...prev,
    ]);
    updateFormData({ ...formData, refImages: refImages });
  }


  return (
    <>
      <div className="page flex h-full flex-col items-center justify-center bg-white">
        <div className="flex w-full flex-col items-start px-6">
          <h1 className="mb-4 text-2xl font-bold text-[#42A5F5]">
          Choose images for Model Creation
          </h1>
          <ImageUploader onUpload={handleOnUpload}>
            {({ open }) => {
              function handleOnClick(e) {
                e.preventDefault();
                open();
              }
              return (
                <button
                  className="px-4 py-4 rounded-full bg-gray-900 font-bold text-white opacity-50 hover:opacity-75"
                  onClick={handleOnClick}>
                  Upload an Images
                </button>
              );
            }}
          </ImageUploader>
          <div className="my-6 md:flex md:items-center">
            <div className="flex space-x-4">
              {refImages.map(({ secureUrl }, index) => (
                <div key={index} className="relative">
                  <Image
                    src={secureUrl}
                    alt={`Selected Preview ${index + 1}`}
                    width={128}
                    height={128}
                    className="rounded-lg object-cover"
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white opacity-50 hover:opacity-75"
                  >
                  X
                  </button>

                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormRefImages;
