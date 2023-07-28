// pages/form.js
import React from 'react';
import Page1 from '../components/form_artist_name';
import Page2 from '../components/form_gender';
import Page3 from '../components/form_ref_images'; // Assuming you have Page3.js

import FormDataManager from '../components/FormDataManager';

const Form = () => {
  const totalPages = 3; // Update this to the total number of pages
  const [currentPage, setCurrentPage] = React.useState(1);

  const handleNextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () => setCurrentPage((prevPage) => prevPage - 1);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <div className="w-3/4">
        <FormDataManager>
          {({ formData, updateFormData }) => {
            return (
              <div className="opacity-100 transition-opacity duration-500 ease-in-out">
                {currentPage === 1 && (
                  <Page1 formData={formData} updateFormData={updateFormData} />
                )}
                {currentPage === 2 && (
                  <Page2 formData={formData} updateFormData={updateFormData} />
                )}
                {currentPage === 3 && (
                  <Page3 formData={formData} updateFormData={updateFormData} />
                )}

                <div className="mt-5 flex justify-between">
                  {currentPage !== 1 && (
                    <button
                      className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                      onClick={handlePreviousPage}
                    >
                      Previous
                    </button>
                  )}

                  {currentPage !== totalPages && (
                    <button
                      className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                      onClick={handleNextPage}
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            );
          }}
        </FormDataManager>
      </div>
    </div>
  );
};

export default Form;
