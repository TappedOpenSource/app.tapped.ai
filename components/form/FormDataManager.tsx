import { useState } from 'react';

const FormDataManager = ({ children }) => {
  const [formData, setFormData] = useState({});

  const updateFormData = (data) => {
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  // console.log(formData);

  return children({ formData, updateFormData });
};

export default FormDataManager;
