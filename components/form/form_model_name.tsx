// Q1
import React from 'react';

const FormModelName = ({ formData, updateFormData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ ...formData, [name]: value });
  };

  return (
    <div className="page flex flex-col items-center justify-center h-full bg-white">
      <div className="flex flex-col items-start w-full px-6">
        <h1 className="text-2xl font-bold mb-4 text-[#42A5F5]">What do you want to call this Model?</h1>
        <div className="flex items-center justify-center w-full h-full">
          <input
            type="text"
            name="modelName"
            value={formData['modelName'] || ''}
            onChange={handleInputChange}
            className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:bg-white focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default FormModelName;
