// pages/form.js
import React from 'react';
import Page1 from '../components/form_artist_name';
import Page2 from '../components/form_gender';
import FormDataManager from '../components/FormDataManager';

const Form = () => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const handleNextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () => setCurrentPage((prevPage) => prevPage - 1);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen bg-gray-100">
      <div className="w-3/4">
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

                <div className="mt-5 flex justify-between">
                  {currentPage !== 1 && (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={handlePreviousPage}
                    >
                      Previous
                    </button>
                  )}

                  {currentPage !== 2 && (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
