import React, { useEffect, useState } from 'react';

const NameField = ({ formData, updateFormData, onValidation }) => {
  const [error, setError] = useState(null);

  const validateForUI = (value) => {
    if (value.trim() === '') {
      setError('Name cannot be empty');
      onValidation(false);
    } else {
      setError(null);
      onValidation(true);
    }
  };

  const justValidate = (value) => {
    if (value.trim() === '') {
      onValidation(false);
    } else {
      onValidation(true);
    }
  };

  useEffect(() => {
    justValidate(formData['name'] || '');
  }, [formData['name']]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData({
      ...formData,
      [name]: value,
    });
    validateForUI(value);
  };

  return (
    <div className="page flex h-full flex-col items-center justify-center bg-white">
      <div className="flex w-full flex-col items-start px-6">
        <h1 className="mb-4 text-xl text-[#42A5F5]">
          what is your artist name?
        </h1>
        <div className="flex h-full w-full items-center justify-center">
          <input
            type="text"
            name="name"
            value={formData['name'] || ''}
            onChange={handleInputChange}
            className={`w-full appearance-none rounded border-2 ${
              error ? 'border-red-500' : 'border-gray-200'
            } bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:bg-white focus:outline-none`}
          />
        </div>
        {error && <p className="mt-2 text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default NameField;
