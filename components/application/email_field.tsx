import React, { useEffect, useState } from 'react';

const EmailField = ({ formData, updateFormData, onValidation }) => {
  const [error, setError] = useState(null);

  const validateForUI = (value) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (value.trim() === '') {
      setError('Email cannot be empty');
      onValidation(false);
    } else if (!emailPattern.test(value)) {
      setError('Invalid email address');
      onValidation(false);
    } else {
      setError(null);
      onValidation(true);
    }
  };

  const justValidate = (value) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (value.trim() === '' || !emailPattern.test(value)) {
      onValidation(false);
    } else {
      onValidation(true);
    }
  };

  useEffect(() => {
    justValidate(formData['email'] || '');
  }, [formData['email']]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData({
      ...formData,
      [name]: value,
    });
    validateForUI(value);
  };

  return (
    <div className="page flex h-full flex-col items-center justify-center">
      <div className="flex w-full flex-col items-start px-6">
        <h1 className="mb-2 text-2xl font-bold text-white">what is your email?</h1>
        <div className="flex h-full w-full items-center justify-center">
          <input
            type="email"
            name="email"
            placeholder='type here...'
            value={formData['email'] || ''}
            onChange={handleInputChange}
            className={`white_placeholder w-full appearance-none rounded ${
              error ? 'border-2 border-red-500' : ''
            } bg-[#63b2fd] px-4 py-2 leading-tight text-white focus:bg-white focus:text-black font-semibold focus:outline-none`}
          />
        </div>
        {error && <p className="mt-2 text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default EmailField;
