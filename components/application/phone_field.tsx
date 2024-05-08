import { useEffect, useState } from "react";

const PhoneField = ({ formData, updateFormData, onValidation }) => {
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const validateForUI = (value) => {
    if (!touched) return;

    if (value === undefined || value === null || value.trim() === "") {
      setError("Phone cannot be empty");
      onValidation(false);
    } else if (!/^\d+$/.test(value)) {
      setError("Invalid phone number");
      onValidation(false);
    } else {
      setError(null);
      onValidation(true);
    }
  };

  const justValidate = (value) => {
    if (value === undefined || value === null || value.trim() === "") {
      onValidation(false);
    } else if (!/^\d+$/.test(value)) {
      onValidation(false);
    } else {
      onValidation(true);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setTouched(true);
    updateFormData({
      ...formData,
      ["phone"]: value,
    });
    validateForUI(value);
  };

  useEffect(() => {
    justValidate(formData.phone || "");
  }, [formData.phone]);

  return (
    <div className="page flex h-full flex-col items-center justify-center">
      <div className="flex w-full flex-col items-start px-6">
        <h1 className="mb-2 text-2xl font-bold text-white">
          what is your phone number?
        </h1>
        <div className="flex h-full w-full items-center justify-center">
          <input
            type="tel"
            name="phone"
            placeholder="(000) 000-0000"
            value={formData.phone || ""}
            onChange={handleInputChange}
            className={`white_placeholder w-full appearance-none rounded ${
              error ? "border-2 border-red-500" : ""
            } bg-[#63b2fd] px-4 py-2 leading-tight text-white focus:bg-white focus:text-black font-semibold focus:outline-none`}
          />
        </div>
        {error && <p className="mt-2 text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default PhoneField;
