// Q2
import React from 'react';

const Page2 = ({ formData, updateFormData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData('page2', { ...formData.page1, [name]: value });
  };

  return (
    <div className="page flex min-h-full flex-col items-center justify-center bg-white">
      <h1 className="mb-4 text-3xl font-bold">Page 2</h1>
      <input
        type="text"
        name="field1"
        value={formData.page2?.field2 || ''}
        onChange={handleInputChange}
        className="rounded border border-gray-300 px-4 py-2"
      />
    </div>
  );
};

export default Page2;
