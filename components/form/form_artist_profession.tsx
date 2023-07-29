import React from 'react';

const FormArtistProfession = ({ formData, updateFormData }) => {
  const handleInputChange = (e) => {
    const { value } = e.target;
    updateFormData({ ...formData, ['artistProfession']: value });
  };

  return (
    <div className="page flex h-full flex-col items-center justify-center bg-white">
      <div className="flex w-full flex-col items-start px-6">
        <h1 className="mb-4 text-2xl font-bold text-[#42A5F5]">
          What is your profession?
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
                name="artistProfession"
                value={option}
                checked={(formData['artistProfession'] || '') === option}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor={option}>{option}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormArtistProfession;
