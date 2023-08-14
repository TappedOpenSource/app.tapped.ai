
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { useState } from 'react';

const PhoneField = ({ formData, updateFormData, onValidation }) => {
  const [error, setError] = useState(null);
  const [touched, setTouched] = useState(false);

  const validate = (value) => {
    if (!touched) return;

    if (value === undefined || value === null) {
      setError('Phone cannot be empty');
      onValidation(false);
    }

    if (value.trim() === '') {
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

  const handleInputChange = (value: string) => {
    setTouched(true);
    validate(value);

    updateFormData({
      ...formData,
      ['phone']: value,
    });
  };

  return (
    <div className="page flex h-full flex-col items-center justify-center bg-white">
      <div className="flex w-full flex-col items-start px-6">
        <h1 className="mb-4 text-2xl font-bold text-[#42A5F5]">
                    what is your phone number?
        </h1>
        <div className="flex h-full w-full items-center justify-center">
          <PhoneInput
            className="text-black"
            defaultCountry='US'
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleInputChange} />
        </div>
        {error && <p className="mt-2 text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default PhoneField;
