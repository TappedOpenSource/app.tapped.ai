// Q2
import React from 'react';

const Page2 = ({ formData, updateFormData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData('page2', { ...formData.page2, [name]: value });
  };

  return (
    <div className="page flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-3xl font-bold mb-4">Page 2</h1>
      <input
        type="text"
        name="field2"
        value={formData.page2?.field2 || ''}
        onChange={handleInputChange}
        className="border border-gray-300 px-4 py-2 rounded"
      />
    </div>
  );
};

export default Page2;

