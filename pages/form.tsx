// pages/form.js
import React from 'react';
import Page1 from '../components/form_model_name';
import Page2 from '../components/form_artist_name';
import Page3 from '../components/form_gender';

import FormDataManager from '../components/FormDataManager';

const Form = () => {
  const totalPages = 3; // Update this to the total number of pages
  const [currentPage, setCurrentPage] = React.useState(1);

  const handleNextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () => setCurrentPage((prevPage) => prevPage - 1);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="w-full">
        <FormDataManager>
          {({ formData, updateFormData }) => {
            return (
              <div className="transition-opacity duration-500 ease-in-out opacity-100">
                {currentPage === 1 && (
                  <Page1 formData={formData} updateFormData={updateFormData} />
                )}
                {currentPage === 2 && (
                  <Page2 formData={formData} updateFormData={updateFormData} />
                )}
                {currentPage === 3 && (
                  <Page3 formData={formData} updateFormData={updateFormData} />
                )}

                <div className="mt-5 flex justify-between px-6">
                  {currentPage !== 1 && (
                    <button
                      className="tapped_btn"
                      onClick={handlePreviousPage}
                    >
                      Previous
                    </button>
                  )}

                  {currentPage !== totalPages && currentPage !== 1 && (
                    <button
                      className="tapped_btn"
                      onClick={handleNextPage}
                    >
                      Next
                    </button>
                  )}

                  {currentPage === 1 && (
                    <button
                      className="tapped_btn"
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
