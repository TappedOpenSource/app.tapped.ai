import React, { useState } from 'react';

const FormRefImages = ({ formData, updateFormData }) => {
  const [refImages, setRefImages] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setRefImages((prev) => [...prev, ...files]);
    updateFormData({ ...formData, refImages: files });
  };

  const handleRemoveImage = (index) => {
    setRefImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="page flex h-full flex-col items-center justify-center bg-white">
      <div className="flex w-full flex-col items-start px-6">
        <h1 className="mb-4 text-2xl font-bold text-[#42A5F5]">
          Choose images for Model Creation
        </h1>
        <div className="mb-6 md:flex md:items-center">
          <label className="mb-1 block pr-4 text-xs font-bold text-gray-500 md:mb-0 md:text-right">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              id="fileInput"
              className="hidden"
            />
            <label
              htmlFor="fileInput"
              className="mt-1 block w-full cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2 text-center shadow-sm hover:bg-gray-100 sm:text-sm"
            >
              Select Images
            </label>
          </label>
          <div className="flex space-x-4">
            {refImages.map((file, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Selected Preview ${index + 1}`}
                  className="h-16 w-16 rounded-lg object-cover"
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
  );
};

export default FormRefImages;
