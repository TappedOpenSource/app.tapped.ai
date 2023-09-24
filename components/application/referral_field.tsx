import React, { useEffect, useState } from 'react';

const ReferralField = ({ formData, updateFormData, onValidation }) => {
  const [error, setError] = useState(null);

  const validateForUI = (value) => {
    if (value.trim() === '') {
      setError('Referral cannot be empty');
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
    justValidate(formData['referral'] || '');
  }, [formData['referral']]);

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
        <h1 className="mb-2 text-2xl font-bold text-white">
          do you have a referral?
        </h1>
        <div className="flex h-full w-full items-center justify-center">
          <input
            type="text"
            name="referral"
            placeholder="enter a referral or N/A"
            value={formData['referral'] || ''}
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

export default ReferralField;
