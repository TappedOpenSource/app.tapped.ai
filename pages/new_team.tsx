import Link from 'next/link';
import React, { useState } from 'react';
import { submitCreateTeamForm } from '@/domain/usecases/create_team';
import withSubscription from '@/domain/auth/withSubscription';

const NewTeam = () => {
  const [name, setName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [genres, setGenres] = useState([]);
  const [socialFollowing, setSocialFollowing] = useState('');
  const [postFreq, setPostFreq] = useState('');
  const [sellingPoint, setSellingPoint] = useState('');
  const [theme, setTheme] = useState('');
  const [planLength, setPlanLength] = useState('');
  const [referenceImages, setReferenceImages] = useState([]);
  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

  const handleFileChange = (e) => {
    setReferenceImages([...referenceImages, ...Array.from(e.target.files)]);
  };

  const handleRemoveImage = (indexToRemove) => {
    setReferenceImages(
      referenceImages.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleSelectChange = (option) => {
    setGenres((prevOptions) =>
      prevOptions.includes(option) ?
        prevOptions.filter((prevOption) => prevOption !== option) :
        [...prevOptions, option]
    );
  };

  const onNewTeamClick = async () => {
    await submitCreateTeamForm({
      // name: name,
      artistName: artistName,
      artistProfession: '',
      artistDescription: '',
      gender: '',
      teamName: '',
      // genres: genres,
      socialFollowing: parseInt(socialFollowing),
      postFreq: postFreq,
      sellingPoint: sellingPoint,
      theme: theme,
      refImages: [],
      // planLength: planLength,
      // referenceImages: referenceImages,
    });
  };

  return (
    <div className="grid h-full grid-cols-1 gap-2 rounded-lg bg-[#FFF] p-8 shadow-lg">
      <div>
        <div className="pb-8">
          <p className="max-h-10 text-4xl font-bold text-[#42A5F5]">
            NEW MODEL
          </p>
        </div>

        <form className="w-full max-w-sm" onSubmit={onNewTeamClick}>
          <div className="mb-6 md:flex md:items-center">
            <div className="md:w-1/3">
              <label
                className="mb-1 block pr-4 text-xs font-bold text-gray-500 md:mb-0 md:text-right"
                htmlFor="inline-name"
              >
                What do you want to call this model?
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                id="inline-name"
                type="text"
                placeholder=""
                onChange={(e: any) => setName(e.target.value)}
                value={name}
                required
              ></input>
            </div>
          </div>

          <div className="mb-6 md:flex md:items-center">
            <div className="md:w-1/3">
              <label
                className="mb-1 block pr-4 text-xs font-bold text-gray-500 md:mb-0 md:text-right"
                htmlFor="inline-artistName"
              >
                What is your artist name?
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                id="inline-artistName"
                type="text"
                placeholder=""
                onChange={(e: any) => setArtistName(e.target.value)}
                value={artistName}
                required
              ></input>
            </div>
          </div>

          <div className="mb-6 md:flex md:items-center">
            <label className="mb-1 block pr-4 text-xs font-bold text-gray-500 md:mb-0 md:text-right">
              What genres would you use to describe your music?
              <div className="grid grid-cols-2 gap-2 pt-4">
                {options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`option${index}`}
                      value={option}
                      checked={genres.includes(option)}
                      onChange={() => handleSelectChange(option)}
                      className="form-checkbox h-5 w-5 text-indigo-600 focus:outline-none"
                    />
                    <label className="text-sm" htmlFor={`option${index}`}>
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </label>
          </div>

          <div className="mb-6 md:flex md:items-center">
            <div className="md:w-1/3">
              <label
                className="mb-1 block pr-4 text-xs font-bold text-gray-500 md:mb-0 md:text-right"
                htmlFor="inline-socialFollowing"
              >
                How big is your following on all social media platforms
                combined?
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                id="inline-socialFollowing"
                type="text"
                placeholder=""
                onChange={(e: any) => setSocialFollowing(e.target.value)}
                value={socialFollowing}
                required
              ></input>
            </div>
          </div>

          <div className="mb-6 md:flex md:items-center">
            <div className="md:w-1/3">
              <label
                className="mb-1 block pr-4 text-xs font-bold text-gray-500 md:mb-0 md:text-right"
                htmlFor="inline-sellingPoint"
              >
                What is your main selling point as a creative?
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                id="inline-sellingPoint"
                type="text"
                placeholder=""
                onChange={(e: any) => setSellingPoint(e.target.value)}
                value={sellingPoint}
                required
              ></input>
            </div>
          </div>

          <div className="mb-6 md:flex md:items-center">
            <div className="md:w-1/3">
              <label
                className="mb-1 block pr-4 text-xs font-bold text-gray-500 md:mb-0 md:text-right"
                htmlFor="dropdown-input"
              >
                What should the theme for your image content be?
              </label>
            </div>
            <div className="md:w-2/3">
              <select
                id="dropdown-theme"
                onChange={(e: any) => setTheme(e.target.value)}
                className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:bg-white focus:outline-none"
              >
                <option value=""> </option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
                <option value="option4">Option 4</option>
                <option value="option5">Option 5</option>
              </select>
            </div>
          </div>

          <div className="mb-6 md:flex md:items-center">
            <div className="md:w-1/3">
              <label
                className="mb-1 block pr-4 text-xs font-bold text-gray-500 md:mb-0 md:text-right"
                htmlFor="inline-planLength"
              >
                How long do you want this plan to be in effect for?
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                id="inline-planLength"
                type="text"
                placeholder=""
                onChange={(e: any) => setPlanLength(e.target.value)}
                value={planLength}
                required
              ></input>
            </div>
          </div>

          <div className="mb-6 md:flex md:items-center">
            <div className="md:w-1/3">
              <label
                className="mb-1 block pr-4 text-xs font-bold text-gray-500 md:mb-0 md:text-right"
                htmlFor="inline-postFreq"
              >
                How often do you want to post on socials?
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                id="inline-postFreq"
                type="text"
                placeholder=""
                onChange={(e: any) => setPostFreq(e.target.value)}
                value={postFreq}
                required
              ></input>
            </div>
          </div>

          <div className="pt-10">
            <Link href="/creating_model">
              <button
                disabled={
                  !name ||
                  !artistName ||
                  !genres ||
                  !socialFollowing ||
                  !postFreq ||
                  !sellingPoint ||
                  !theme ||
                  !planLength
                }
                className="tapped_btn max-h-10 w-full"
                type="submit"
                onClick={onNewTeamClick}
              >
                Create New Model
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withSubscription(NewTeam);
