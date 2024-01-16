import React, { useEffect, useState } from 'react';

const IgField = ({ formData, updateFormData, onValidation }) => {
  const [error, setError] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleInputChange = (e) => {
    setHasInteracted(true);
    const { name, value } = e.target;
    updateFormData({
      ...formData,
      [name]: value,
    });
    validateForUI(value);
  };

  const validateForUI = (value) => {
    if (hasInteracted) {
      if (!value || value.trim() === '') {
        setError('Please enter your Instagram handle.');
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
    if (!value || value.trim() === '') {
      onValidation(false);
    } else {
      onValidation(true);
    }
  };

  useEffect(() => {
    justValidate(formData['instagramHandle']);
  }, [formData['instagramHandle']]);

  return (
    <div className="page flex h-full flex-col items-center justify-center">
      <div className="flex w-full flex-col items-start px-6">
        <h1 className="mb-2 text-2xl font-bold text-white">
          what is your Instagram handle?
        </h1>
        <div className="flex h-full w-full items-center justify-center">
          <input
            type="text"
            name="instagramHandle"
            placeholder='type here...'
            value={formData['instagramHandle'] || ''}
            onChange={handleInputChange}
            className={`white_placeholder w-full appearance-none rounded ${
              error ? 'border-2 border-red-500' : ''
            } bg-[#63b2fd] px-4 py-2 leading-tight text-white focus:bg-white focus:text-black font-semibold focus:outline-none`}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default IgField;
