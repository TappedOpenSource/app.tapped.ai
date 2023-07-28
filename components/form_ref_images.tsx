import React from 'react';

const Page3 = ({ formData, updateFormData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData('page3', { ...formData.page1, [name]: value });
  };

  return (
    <div className="page flex min-h-full flex-col items-center justify-center bg-white">
      <h1 className="mb-4 text-3xl font-bold">Page 3</h1>
      <input
        type="text"
        name="field1"
        value={formData.page3?.field3 || ''}
        onChange={handleInputChange}
        className="rounded border border-gray-300 px-4 py-2"
      />
    </div>
  );
};

export default Page3;
