import React from 'react';
import TeamCard from '../components/TeamCard';
import Link from 'next/link';
import withSubscription from '../domain/auth/withSubscription';
import { Team } from '@/domain/models/team';
import { Some } from '@sniptt/monads';
import auth from '@/data/auth';

const Home = () => {
  const teams: Team[] = [
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
      genres: [],
      sellingPoint: 'idk',
      socialFollowing: 123,
      theme: 'something',
      avatarStyle: 'Vintage',
      sdModelId: Some('whoa'),
      sdModelStatus: 'initial',
    },
  ];

  // TODO pull avatars

  // TODO pull album names

  return (
    <div className="grid h-screen grid-cols-1 gap-2 rounded-lg bg-[#FFF] p-8 shadow-lg">
      <div>
        <div className="flex flex-row justify-between pb-8">
          <p className="max-h-10 text-4xl font-bold text-[#42A5F5]">BRANDING</p>
          <button className="text-blue" onClick={auth.logout}>sign out</button>
        </div>
        <div className="pb-10">
          <Link href="/new_team">
            <button className="tapped_btn max-h-10 w-full">
              Create New Model
            </button>
          </Link>
        </div>
        {teams.map((team) => (
          <div key={team.id} className="py-4">
            <Link href={`/team/${team.id}`}>
              <TeamCard team={team} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withSubscription(Home);
