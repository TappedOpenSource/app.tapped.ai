import React, { useEffect, useState } from 'react';

const FollowingField = ({ formData, updateFormData, onValidation }) => {
  const [error, setError] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleInputChange = (e) => {
    setHasInteracted(true);
    const { value } = e.target;
    updateFormData({ ...formData, ['following_field']: value });
    validateForUI(value);
  };

  const validateForUI = (value) => {
    if (hasInteracted) {
      if (!value) {
        setError('Please select your social media following range.');
        onValidation(false);
      } else {
        setError(null);
        onValidation(true);
      }
    } else {
      setError(null);
      onValidation(false);
    }
  };

  const justValidate = (value) => {
    if (!value) {
      onValidation(false);
    } else {
      onValidation(true);
    }
  };

  useEffect(() => {
    justValidate(formData['following_field']);
  }, [formData['following_field']]);

  return (
    <div className="page flex h-full flex-col items-center justify-center bg-white">
      <div className="flex w-full flex-col items-start px-6">
        <h1 className="mb-4 text-xl text-[#42A5F5]">
          how big is your social media following?
        </h1>
        <div className="flex h-full w-full flex-wrap items-center justify-center">
          {['0-100', '100-1k', '1k-10k', '10k-100k', '100k-1m', '1m+'].map(
            (option, index) => (
              <div
                key={index}
                className="mb-2 block flex items-center pr-4 text-xs font-bold text-gray-500 md:mb-0 md:text-right"
              >
                <input
                  type="radio"
                  id={option}
                  name="following_field"
                  value={option}
                  checked={(formData['following_field'] || '') === option}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor={option}>{option}</label>
              </div>
            )
          )}
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default FollowingField;
