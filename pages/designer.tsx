import { useRouter } from 'next/router';
import React from 'react';

const DesignerPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#63b2f2] flex flex-col items-center justify-center">
      <header className="absolute top-0 left-0 ml-4 mt-4">
        <h1 className="text-3xl font-semibold">Designer</h1>
      </header>
      <header className="mb-8">
        <h2 className="text-xl font-medium text-center">Credits: 500</h2>
      </header>
      <main>
        <button
          onClick={() => router.push('/aesthetic')}
          className="tapped_btn_rounded"
        >
        Generate Avatar
        </button>
      </main>
    </div>
  );
};

export default DesignerPage;
