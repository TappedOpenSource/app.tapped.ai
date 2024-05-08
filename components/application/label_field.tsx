import React, { useEffect, useState } from "react";

const AreYouSigned = ({ formData, updateFormData, onValidation }) => {
  const [error, setError] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleInputChange = (e) => {
    setHasInteracted(true);

    const { value } = e.target;
    updateFormData({
      ...formData,
      artistLabel: value === "yes" ? true : false,
    });
    validateForUI(value === "yes" ? true : false);
  };

  const validateForUI = (value) => {
    if (hasInteracted) {
      if (value === undefined) {
        setError("Please select an option.");
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
    if (value === undefined) {
      onValidation(false);
    } else {
      onValidation(true);
    }
  };

  useEffect(() => {
    justValidate(formData.artistLabel);
  }, [formData.artistLabel]);

  const options = ["yes", "no"];

  return (
    <div className="page flex h-full flex-col items-center justify-center">
      <div className="flex w-full flex-col items-start px-6">
        <h1 className="mb-2 text-2xl font-bold text-white">
          are you currently signed to a record label?
        </h1>
        <div className="flex flex-wrap w-full justify-between">
          {options.map((option) => (
            <div key={option} className="w-1/2 flex items-center justify-center mb-4 pr-2">
              <input
                type="radio"
                id={option}
                name="artistLabel"
                value={option}
                checked={formData["artistLabel"] === (option === "yes")}
                onChange={handleInputChange}
                className="sr-only"
              />
              <label
                htmlFor={option}
                className={`w-full text-center px-4 py-2 rounded-xl cursor-pointer transition duration-200 ease-in-out 
                ${formData["artistLabel"] === (option === "yes") ? "bg-white font-bold text-black" : "bg-[#63b2fd] font-bold text-white"}`}
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

export default AreYouSigned;
