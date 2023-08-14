import React, { useEffect, useState } from 'react';

const IgField = ({ formData, updateFormData, onValidation }) => {
  const [error, setError] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleInputChange = (e) => {
    setHasInteracted(true);
    const { name, value } = e.target;
    updateFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (hasInteracted) {
      if (
        !formData['instagramHandle'] ||
        formData['instagramHandle'].trim() === ''
      ) {
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
  }, [formData['instagramHandle'], hasInteracted]);

  return (
    <div className="page flex h-full flex-col items-center justify-center bg-white">
      <div className="flex w-full flex-col items-start px-6">
        <h1 className="mb-4 text-xl text-[#42A5F5]">
          what is your Instagram handle?
        </h1>
        <div className="flex h-full w-full items-center justify-center">
          <input
            type="text"
            name="instagramHandle"
            value={formData['instagramHandle'] || ''}
            onChange={handleInputChange}
            className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:bg-white focus:outline-none"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default IgField;
