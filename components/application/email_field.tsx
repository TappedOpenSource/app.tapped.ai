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
    <div className="page flex h-full flex-col items-center justify-center">
      <div className="flex w-full flex-col items-start px-6">
        <h1 className="mb-4 text-2xl font-bold text-white">what is your email?</h1>
        <div className="flex h-full w-full items-center justify-center">
          <input
            type="text"
            name="email"
            placeholder='Type here...'
            value={formData['email'] || ''}
            onChange={handleInputChange}
            className={`white_placeholder w-full appearance-none rounded border-2 ${
              error ? 'border-red-500' : 'border-[#63b2fd]'
            } bg-[#63b2fd] px-4 py-2 leading-tight text-white focus:bg-[#63b2fd] focus:outline-none`}
          />
        </div>
        {error && <p className="mt-2 text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default EmailField;
