// FormDataManager.js
import { useState } from 'react';

const FormDataManager = ({ children }) => {
  const [formData, setFormData] = useState({});

  const updateFormData = (page, data) => {
    setFormData((prevData) => ({
      ...prevData,
      [page]: data,
    }));
  };

  return children({ formData, updateFormData });
};

export default FormDataManager;
