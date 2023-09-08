import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import FormDataManager from '@/components/form/FormDataManager';
import DescribeField from '@/components/application/describe_field';
import NameField from '@/components/application/name_field';
import LabelField from '@/components/application/label_field';
import ArtistProfessionField from '@/components/application/profession_field';
import FollowingField from '@/components/application/following_field';
import IgField from '@/components/application/ig_field';
import SignUpField from '@/components/application/signup_field';
import PhoneField from '@/components/application/phone_field';
import EmailField from '@/components/application/email_field';
import SegmentedLine from '@/components/SegmentedLine';

const Application: NextPage = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isValid, setIsValid] = React.useState(false);
  const router = useRouter();

  const pages = [
    NameField,
    EmailField,
    PhoneField,
    DescribeField,
    LabelField,
    ArtistProfessionField,
    FollowingField,
    IgField,
    SignUpField,
  ];
  const totalPages = pages.length;
  const signUpFieldIndex = pages.indexOf(SignUpField); // Determine the index of SignUpField

  const backgroundColor = currentIndex === signUpFieldIndex ? '#15242d' : '#3ba0fc';



  React.useEffect(() => {
    setIsValid(false);
  }, [currentIndex]);

  const handleNextPage = () => {
    if (isValid) {
      console.log(`${currentIndex}: next page`);
      setCurrentIndex((prev) => prev + 1);
    }
  };
  const handlePreviousPage = () => {
    if (currentIndex === 0) {
      router.push('/');
    } else {
      console.log(`${currentIndex}: previous page`);
      setCurrentIndex((prev) => prev - 1);
    }
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
      {/* Adjusted flex container styles */}
      <div className={'flex min-h-screen flex-col items-center justify-center px-4 md:px-8 lg:px-16'} style={{ backgroundColor }}>
        {/* Set a max-width and center the container */}
        <div className="w-full max-w-screen-md mx-auto">
          <SegmentedLine totalPages={totalPages} currentIndex={currentIndex} />
          <FormDataManager>
            {({ formData, updateFormData }) => {
              return (
                <>
                  <CurrentPage
                    formData={formData}
                    updateFormData={updateFormData}
                    onValidation={setIsValid}
                  />
                  {/* Adjusted position and padding for buttons */}
                  <div className="flex justify-between mt-4 md:mt-8 lg:mt-16">
                    <button
                      className="tapped_btn_rounded"
                      onClick={handlePreviousPage}
                    >
                      back
                    </button>

                    {isValid && currentIndex !== totalPages - 1 && (
                      <button
                        className="tapped_btn_rounded_black"
                        onClick={handleNextPage}
                        disabled={!isValid}
                      >
                        next
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