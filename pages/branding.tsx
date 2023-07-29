import React from 'react';
import ModelCard from '../components/modelCard';
import Link from 'next/link';
import withAuth from '../domain/auth/withAuth';

const Branding = () => {
  const modelIds = ['Model A', 'Model B', 'Model C'];

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
        {modelIds.map((modelId) => (
          <div key={modelId} className="py-4">
            <Link href={`/model/${modelId}`}>
              <ModelCard modelName={modelId} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withAuth(Branding);
