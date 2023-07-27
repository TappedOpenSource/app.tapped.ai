// Q1
import React from 'react';

const Page1 = ({ formData, updateFormData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData('page1', { ...formData.page1, [name]: value });
  };

  return (
    <div className="page flex flex-col items-center justify-center min-h-screen bg-black">
      <h1 className="text-3xl font-bold mb-4">Page 1</h1>
      <input
        type="text"
        name="field1"
        value={formData.page1?.field1 || ''}
        onChange={handleInputChange}
        className="w-60 appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:bg-white focus:outline-none"
      />
    </div>
  );
};

export default Page1;
