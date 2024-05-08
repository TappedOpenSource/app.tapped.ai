import React from "react";

const FormPostFreq = ({ formData, updateFormData }) => {
  const handleInputChange = (e) => {
    const { value } = e.target;
    updateFormData({ ...formData, ["postFreq"]: value });
  };

  return (
    <div className="page flex h-full flex-col items-center justify-center bg-white">
      <div className="flex w-full flex-col items-start px-6">
        <h1 className="mb-4 text-2xl font-bold text-[#42A5F5]">
          How often do you post on social media?
        </h1>
        <div className="flex h-full w-full flex-wrap items-center justify-center">
          {["1-2x a month", "1-2x a week", "3-10x a week", "10-20x a week"].map(
            (option, index) => (
              <div
                key={index}
                className="mb-2 block flex items-center pr-4 text-xs font-bold text-gray-500 md:mb-0 md:text-right"
              >
                <input
                  type="radio"
                  id={option}
                  name="postFreq"
                  value={option}
                  checked={(formData["postFreq"] || "") === option}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor={option}>{option}</label>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default FormPostFreq;
