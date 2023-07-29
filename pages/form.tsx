// pages/form.js
import React from 'react';
import Page1 from '../components/form/form_model_name';
import Page2 from '../components/form/form_artist_name';
import Page3 from '../components/form/form_gender';
import Page4 from '../components/form/form_ref_images';
import Page5 from '../components/form/form_artist_description';
import Page6 from '../components/form/form_artist_label';
import Page7 from '../components/form/form_artist_profession';
import Page8 from '../components/form/form_theme';
import Page9 from '../components/form/form_social_following';
import Page10 from '../components/form/form_post_freq';
import Page11 from '../components/form/form_selling_point';
import FormDataManager from '../components/form/FormDataManager';
import { submitCreateGeneratorForm } from '../domain/usecases/create_generator';

const Form = () => {
  const totalPages = 11; // Update this to the total number of pages
  const [currentPage, setCurrentPage] = React.useState(1);

  const handleNextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () => setCurrentPage((prevPage) => prevPage - 1);
  const createModel = (formData) => {
    console.log(formData);
  };
  const onNewGeneratorClick = async (formData) => {
    await submitCreateGeneratorForm({
      artistDescription: formData.artistDescription,
      artistName: formData.artistName,
      artistProfession: formData.artistProfession,
      gender: formData.gender,
      modelName: formData.modelName,
      postFreq: formData.postFreq,
      refImages: formData.refImages,
      sellingPoint: formData.sellingPoint,
      socialFollowing: formData.socialFollowing,
      theme: formData.theme,
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <div className="w-full">
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
                {currentPage === 4 && (
                  <Page4 formData={formData} updateFormData={updateFormData} />
                )}
                {currentPage === 5 && (
                  <Page5 formData={formData} updateFormData={updateFormData} />
                )}
                {currentPage === 6 && (
                  <Page6 formData={formData} updateFormData={updateFormData} />
                )}
                {currentPage === 7 && (
                  <Page7 formData={formData} updateFormData={updateFormData} />
                )}
                {currentPage === 8 && (
                  <Page8 formData={formData} updateFormData={updateFormData} />
                )}
                {currentPage === 9 && (
                  <Page9 formData={formData} updateFormData={updateFormData} />
                )}
                {currentPage === 10 && (
                  <Page10 formData={formData} updateFormData={updateFormData} />
                )}
                {currentPage === 11 && (
                  <Page11 formData={formData} updateFormData={updateFormData} />
                )}

                <div className="mt-5 flex justify-between px-6">
                  {currentPage !== 1 && (
                    <button className="tapped_btn" onClick={handlePreviousPage}>
                      Previous
                    </button>
                  )}

                  {currentPage !== totalPages && currentPage !== 1 && (
                    <button className="tapped_btn" onClick={handleNextPage}>
                      Next
                    </button>
                  )}

                  {currentPage === 1 && (
                    <button className="tapped_btn" onClick={handleNextPage}>
                      Next
                    </button>
                  )}

                  {currentPage === 11 && (
                    <button
                      className="tapped_btn"
                      onClick={() => onNewGeneratorClick(formData)}
                    >
                      Create Model
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
