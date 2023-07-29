import React from 'react';
import ModelCard from '../components/modelCard';
import Link from 'next/link';
import withAuth from '../domain/auth/withAuth';
import { BrandGenerator } from '../domain/models/brand_generator';

const Branding = () => {
  const generators: BrandGenerator[] = [
    {
      id: '123',
      userId: 'someone',
      name: 'Funky Model',
      quota: 100,
      updatedAt: new Date(),
      createdAt: new Date(),

      artistDescription: 'something',
      artistName: 'Seelife',
      artistProfession: 'idk',
      gender: 'what',
      postFreq: 'often',
      refImages: [],
      sellingPoint: 'idk',
      socialFollowing: 123,
      theme: 'something',
      avatarStyle: 'Vintage',
      sdModelId: 'whoa',
      sdModelStatus: 'initial',
    },
  ];

  // TODO pull avatars

  // TODO pull album names

  return (
    <div className="grid h-screen grid-cols-1 gap-2 rounded-lg bg-[#FFF] p-8 shadow-lg">
      <div>
        <div className="pb-8">
          <p className="max-h-10 text-4xl font-bold text-[#42A5F5]">BRANDING</p>
        </div>
        <div className="pb-10">
          <Link href="/new_generator">
            <button className="tapped_btn max-h-10 w-full">
              Create New Model
            </button>
          </Link>
        </div>
        {generators.map((generator) => (
          <div key={generator.id} className="py-4">
            <Link href={`/model/${generator.id}`}>
              <ModelCard generator={generator} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withAuth(Branding);
