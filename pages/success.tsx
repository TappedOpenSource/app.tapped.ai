import Link from 'next/link';
import React from 'react';
import withAuth from '@/domain/auth/withAuth';

const Success = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[#63b2f2] p-8 shadow-lg">
      <div className="grid grid-rows-3 gap-2 text-center">
        <div className="text-[#fff] mb-8 font-semibold">
          <p>face capture complete, let&apos;s go see your team</p>
        </div>
        <div>
          <Link href="/team">
            <button className="tapped_btn_rounded">
              go to team
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Success);

