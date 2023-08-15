import React, { useEffect, useState } from 'react';

const ArtistProfessionField = ({ formData, updateFormData, onValidation }) => {
  const [error, setError] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleInputChange = (e) => {
    setHasInteracted(true);
    const { value } = e.target;
    updateFormData({ ...formData, ['profession_field']: value });
    validateForUI(value);
  };

  const validateForUI = (value) => {
    if (hasInteracted) {
      if (!value) {
        setError('Please select your profession.');
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
    justValidate(formData['profession_field']);
  }, [formData['profession_field']]);

  return (
    <div className="page flex h-full flex-col items-center justify-center bg-white">
      <div className="flex w-full flex-col items-start px-6">
        <h1 className="mb-4 text-xl text-[#42A5F5]">
          what is your profession?
        </h1>
        <div className="flex h-full w-full flex-wrap items-center justify-center">
          {[
            'Artist',
            'Producer',
            'Promoter',
            'DJ',
            'A&R',
            'Marketer',
            'Publicist',
            'Booking Agent',
            'Other',
          ].map((option, index) => (
            <div
              key={index}
              className="mb-2 block flex items-center pr-4 text-xs font-bold text-gray-500 md:mb-0 md:text-right"
            >
              <input
                type="radio"
                id={option}
                name="profession_field"
                value={option}
                checked={(formData['profession_field'] || '') === option}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor={option}>{option}</label>
            </div>
          ))}
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default ArtistProfessionField;
