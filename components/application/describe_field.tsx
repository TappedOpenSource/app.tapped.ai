import React, { useEffect, useState } from 'react';

const FormArtistDescription = ({ formData, updateFormData, onValidation }) => {
  const [error, setError] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleInputChange = (e) => {
    setHasInteracted(true);

    const { value } = e.target;
    const updatedValues = formData['description'] || [];

    if (updatedValues.includes(value)) {
      const index = updatedValues.indexOf(value);
      updatedValues.splice(index, 1);
    } else {
      updatedValues.push(value);
    }

    updateFormData({ ...formData, ['description']: updatedValues });
    validateForUI(updatedValues);
  };

  const validateForUI = (values) => {
    if (hasInteracted) {
      if (!values || values.length === 0) {
        setError('You must choose at least one option.');
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

  const justValidate = (values) => {
    if (!values || values.length === 0) {
      onValidation(false);
    } else {
      onValidation(true);
    }
  };

  useEffect(() => {
    justValidate(formData['description'] || []);
  }, [formData['description']]);

  const options = [
    'mysterious',
    'dark',
    'soulful',
    'colorful',
    'energetic',
    'elegant',
    'clean cut',
    'exotic',
    'experimental',
    'crazy',
  ];

  return (
    <div className="page flex h-full flex-col items-center justify-center bg-white">
      <div className="flex w-full flex-col items-start px-6">
        <h1 className="mb-4 text-xl text-[#42A5F5]">
          how would you describe yourself?
        </h1>
        <p className="pb-4 text-gray-400">Choose as many as you like</p>
        <div className="flex h-full w-full flex-wrap items-center justify-center">
          {options.map((option, index) => (
            <div
              key={index}
              className="mb-2 block flex items-center pr-4 text-xs text-gray-500 md:mb-0 md:text-right"
            >
              <input
                type="checkbox"
                id={option}
                name="description"
                value={option}
                checked={(formData['description'] || []).includes(option)}
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

export default FormArtistDescription;
