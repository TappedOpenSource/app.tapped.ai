import React from 'react';

const FormSellingPoint = ({ formData, updateFormData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ ...formData, [name]: value });
  };

  return (
    <div className="page flex h-full flex-col items-center justify-center bg-white">
      <div className="flex w-full flex-col items-start px-6">
        <h1 className="mb-4 text-2xl font-bold text-[#42A5F5]">
          What is your selling point as a creative?
        </h1>
        <p className="pb-4 font-bold text-gray-400">
          For example: I am a great performer, I have a great sense of fashion,
          etc.
        </p>
        <div className="flex h-full w-full items-center justify-center">
          <input
            type="text"
            name="sellingPoint"
            value={formData['sellingPoint'] || ''}
            onChange={handleInputChange}
            className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:bg-white focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default FormSellingPoint;
