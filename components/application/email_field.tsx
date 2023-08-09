import React from 'react';

const EmailField = ({ formData, updateFormData }) => {
  const handleInputChange = (e) => {
    const { email, value } = e.target;
    updateFormData({
      ...formData,
      ['email']: value,
    });
  };

  return (
    <div className="page flex h-full flex-col items-center justify-center bg-white">
      <div className="flex w-full flex-col items-start px-6">
        <h1 className="mb-4 text-2xl font-bold text-[#42A5F5]">
          What is your email?
        </h1>
        <div className="flex h-full w-full items-center justify-center">
          <input
            type="text"
            name="email"
            value={formData['email'] || ''}
            onChange={handleInputChange}
            className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:bg-white focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default EmailField;
