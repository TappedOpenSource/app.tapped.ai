import React from 'react';
import { NextPage } from 'next';
import FormDataManager from '@/components/form/FormDataManager';
import AreYouSigned from '@/components/application/are_you_signed';

const Application: NextPage = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const pages = [
    AreYouSigned,
  ];
  const totalPages = pages.length;

  const handleNextPage = () => {
    console.log(`${currentIndex}: next page`);
    setCurrentIndex((prev) => prev + 1);
  };
  const handlePreviousPage = () => {
    console.log(`${currentIndex}: previous page`);
    setCurrentIndex((prev) => prev - 1);
  };

  const onSubmit = async (formData) => {
    console.log(formData);
  };

  if (totalPages <= 0) {
    return (
      <>
        <h1>Form is empty</h1>
      </>
    );
  }

  const CurrentPage = pages[currentIndex];
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-white">
        <div className="w-full">
          <FormDataManager>
            {({ formData, updateFormData }) => {
              return (
                <>
                  <CurrentPage formData={formData} updateFormData={updateFormData} />
                  <div className="mt-5 flex justify-between px-6">
                    {currentIndex !== 1 && (
                      <button className="tapped_btn" onClick={handlePreviousPage}>
                      Previous
                      </button>
                    )}

                    {currentIndex !== totalPages && (
                      <button className="tapped_btn" onClick={handleNextPage}>
                      Next
                      </button>
                    )}

                    {currentIndex === 11 && (
                      <button
                        className="tapped_btn"
                        onClick={() => onSubmit(formData)}
                      >
                    Apply
                      </button>
                    )}
                  </div>
                </>
              );
            }}
          </FormDataManager>
        </div>
      </div>
    </>
  );
};

export default Application;
