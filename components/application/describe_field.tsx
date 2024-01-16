import React, { useEffect, useState } from 'react';

const FormArtistDescription = ({ formData, updateFormData, onValidation }) => {
  const [error, setError] = useState<string | null>(null);
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
    <div className="page flex h-full flex-col items-center justify-center">
      <div className="flex w-full flex-col items-start px-6">
        <h1 className="mb-2 text-2xl font-bold text-white">
          how would you describe yourself?
        </h1>
        <div className="flex flex-wrap w-full justify-between">
          {options.map((option, index) => (
            <div
              key={index}
              className="w-1/2 flex items-center justify-center mb-4 pr-2"
            >
              <input
                type="checkbox"
                id={option}
                name="description"
                value={option}
                checked={(formData['description'] || []).includes(option)}
                onChange={handleInputChange}
                className="sr-only"
              />
              <label
                htmlFor={option}
                className={`w-full text-center px-4 py-2 rounded-xl cursor-pointer transition duration-200 ease-in-out 
                ${(formData['description'] || []).includes(option) ? 'bg-white font-bold text-black' : 'bg-[#63b2fd] font-bold text-white'}`}
              >
                {option}
              </label>
            </div>
          ))}
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default FormArtistDescription;
