import React, { useEffect, useState } from 'react';

const AreYouSigned = ({ formData, updateFormData, onValidation }) => {
  const [error, setError] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleInputChange = (e) => {
    setHasInteracted(true);
    const { value } = e.target;
    updateFormData({
      ...formData,
      artistLabel: value === 'yes' ? true : false,
    });
  };

  useEffect(() => {
    if (hasInteracted) {
      if (formData.artistLabel === undefined) {
        setError('Please select an option.');
        onValidation(false);
      } else {
        setError(null);
        onValidation(true);
      }
    } else {
      setError(null);
      onValidation(false);
    }
  }, [formData.artistLabel, hasInteracted]);

  return (
    <div className="page flex h-full flex-col items-center justify-center bg-white">
      <div className="flex w-full flex-col items-start px-6">
        <h1 className="mb-4 text-xl text-[#42A5F5]">
          are you currently signed to a record label?
        </h1>
        <div className="flex h-full w-full flex-wrap items-center justify-center">
          <div
            key="yes"
            className="mb-2 block flex items-center pr-4 text-xs font-bold text-gray-500 md:mb-0 md:text-right"
          >
            <input
              type="radio"
              id="yes"
              name="artistLabel"
              value="yes"
              checked={formData['artistLabel'] ?? false}
              onChange={handleInputChange}
              className="mr-2"
            />
            <label htmlFor="yes">Yes</label>
          </div>
          <div
            key="no"
            className="mb-2 block flex items-center pr-4 text-xs font-bold text-gray-500 md:mb-0 md:text-right"
          >
            <input
              type="radio"
              id="no"
              name="artistLabel"
              value="no"
              checked={!(formData['artistLabel'] ?? true)}
              onChange={handleInputChange}
              className="mr-2"
            />
            <label htmlFor="no">No</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreYouSigned;
