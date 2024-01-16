import React, { useEffect, useState } from 'react';

const ArtistProfessionField = ({ formData, updateFormData, onValidation }) => {
  const [error, setError] = useState<string | null>(null);
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

  const options = [
    'artist',
    'producer',
    'promoter',
    'DJ',
    'A&R',
    'marketer',
    'publicist',
    'booking agent',
    'other',
  ];

  return (
    <div className="page flex h-full flex-col items-center justify-center">
      <div className="flex w-full flex-col items-start px-6">
        <h1 className="mb-2 text-2xl font-bold text-white">
          what is your profession?
        </h1>
        <div className="flex flex-wrap w-full justify-between">
          {options.map((option) => (
            <div key={option} className="w-1/2 flex items-center justify-center mb-4 pr-2">
              <input
                type="radio"
                id={option}
                name="profession_field"
                value={option}
                checked={formData['profession_field'] === option}
                onChange={handleInputChange}
                className="sr-only"
              />
              <label
                htmlFor={option}
                className={`w-full text-center px-4 py-2 rounded-xl cursor-pointer transition duration-200 ease-in-out 
                ${formData['profession_field'] === option ? 'bg-white font-bold text-black' : 'bg-[#63b2fd] font-bold text-white'}`}
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

export default ArtistProfessionField;
