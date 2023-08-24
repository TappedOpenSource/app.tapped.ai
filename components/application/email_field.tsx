import React, { useEffect, useState } from 'react';

const EmailField = ({ formData, updateFormData, onValidation }) => {
  const [error, setError] = useState(null);
  const [touched, setTouched] = useState(false);

  const validate = (value) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+$/i;

    if (!touched) return;

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

  const handleInputChange = (e) => {
    const { value } = e.target;
    setTouched(true);
    validate(value);

    updateFormData({
      ...formData,
      ['email']: value,
    });
  };

  useEffect(() => {
    validate(formData['email'] || '');
  }, [formData['email'], touched]);

  return (
    <div className="page flex h-full flex-col items-center justify-center bg-white">
      <div className="flex w-full flex-col items-start px-6">
        <h1 className="mb-4 text-xl text-[#42A5F5]">what is your email?</h1>
        <div className="flex h-full w-full items-center justify-center">
          <input
            type="text"
            name="email"
            value={formData['email'] || ''}
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

export default EmailField;
