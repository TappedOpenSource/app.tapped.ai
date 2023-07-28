//  Q3
import React from 'react';

const FormGender = ({ formData, updateFormData }) => {
  const genders = {
    Male: 'Man',
    Female: 'Woman',
    Other: 'Person',
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    updateFormData({ ...formData, gender: genders[value] });
  };

  return (
    <div className="page flex h-full flex-col items-center justify-center bg-white">
      <div className="flex w-full flex-col items-start px-6">
        <h1 className="mb-4 text-2xl font-bold text-[#42A5F5]">
          What is your gender?
        </h1>
        <div className="flex h-full w-full flex-col items-center justify-center">
          {Object.keys(genders).map((gender, index) => (
            <label
              key={index}
              className="mb-2 block flex items-center pr-4 text-xs font-bold text-gray-500 md:mb-0 md:text-right"
            >
              <input
                type="radio"
                name="gender"
                value={gender}
                checked={formData['gender'] === genders[gender]}
                onChange={handleInputChange}
                className="mr-2 "
              />
              <span className="text-gray-700">{gender}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormGender;
