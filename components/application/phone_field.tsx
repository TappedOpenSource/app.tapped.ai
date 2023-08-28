import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { useEffect, useState } from 'react';

const PhoneField = ({ formData, updateFormData, onValidation }) => {
  const [error, setError] = useState(null);
  const [touched, setTouched] = useState(false);

  const validateForUI = (value) => {
    if (!touched) return;

    if (value === undefined || value === null || value.trim() === '') {
      setError('Phone cannot be empty');
      onValidation(false);
    } else if (!isValidPhoneNumber(value)) {
      setError('Invalid phone number');
      onValidation(false);
    } else {
      setError(null);
      onValidation(true);
    }
  };

  const justValidate = (value) => {
    if (value === undefined || value === null || value.trim() === '') {
      onValidation(false);
    } else if (!isValidPhoneNumber(value)) {
      onValidation(false);
    } else {
      onValidation(true);
    }
  };

  const handleInputChange = (value: string) => {
    setTouched(true);
    updateFormData({
      ...formData,
      ['phone']: value,
    });
    validateForUI(value);
  };

  useEffect(() => {
    justValidate(formData.phone);
  }, [formData.phone]);

  return (
    <div className="page flex h-full flex-col items-center justify-center">
      <div className="flex w-full flex-col items-start px-6">
        <h1 className="mb-4 text-2xl text-white font-bold">
          what is your phone number?
        </h1>
        <div className="flex h-full w-full items-center justify-center">
          <PhoneInput
            className="text-black"
            defaultCountry="US"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleInputChange}
            onBlur={() => validateForUI(formData.phone)}
          />
        </div>
        {error && <p className="mt-2 text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default PhoneField;
