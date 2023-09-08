import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { Rubik } from 'next/font/google';

import { shuffle } from '@/utils/shuffle';
import Footer from '@/components/landing/Footer';
import SignedArtistCard from '@/components/landing/SignedArtistCard';
import FeaturedIn from '@/components/landing/FeaturedIn';
import EmpowermentHub from '@/components/landing/EmpowermentHub';
import SupportJourney from '@/components/landing/SupportJourney';
import SubscriptionPlans from '@/components/landing/SubscriptionPlans';
import Benefits from '@/components/landing/Benefits';
import YourJourney from '@/components/landing/YourJourney';
import Unshackle from '@/components/landing/Unshackle';
import JoinTheMovement from '@/components/landing/JoinTheMovement';

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export default function Home({ shuffledArtists }: {
  shuffledArtists: {
    name: string;
    photo: StaticImageData;
  }[]
}) {
  return (
    <div className={rubik.className}>
      <div className="flex flex-col items-center justify-start pt-12 px-12 bg-[#63b2fd]">
        <div className="w-full items-center justify-around text-sm lg:flex">
          <div id="by-tapped" className="fixed z-50 bottom-0 left-0 flex h-24 w-full items-end justify-center bg-white rounded-lg lg:hidden">
            <a
              className="flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
              href="https://app.tapped.ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{' '}
              <Image
                src="/images/tapped_logo.png"
                alt="Tapped Ai Logo"
                width={48}
                height={14}
                priority
              />
            </a>
            <a
              className="md:hidden underline flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
              href="https://app.tapped.ai/download"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download the app
            </a>
          </div>
          {/* <Link href="/signup_complete" className="hidden lg:block">already a member?</Link> */}
        </div>

        <div className="flex flex-col place-items-center md:pt-20">
          <div className="bg-white/20 rounded-full">
            <p
              className="text-center text-white py-4 px-8"
            >
                join the over 20 artists in our community
            </p>
          </div>
          <div className="h-8"></div>
          <h1
            className="text-5xl md:w-1/2 font-extrabold text-center text-white lg:text-6xl"
          >
            welcome to the first ever Ai record label.
          </h1>
          <div className="pt-2 pb-2"></div>
          <h2
            className="text-2xl font-thin text-center text-white lg:text-3xl"
          >
            we are the anti-360 deal.
          </h2>
          <div className="flex flex-row gap-6 mt-8 mb-4 py-2 px-4">
            <Link
              href="/application_form"
              // href="https://d4wmuljalg3.typeform.com/to/FGWV5B6D"
              id="apply-here"
              className="text-lg font-black rounded-full p-6 hover:scale-105 transform transition-all duration-200 ease-in-out"
            >apply here</Link>
          </div>
          {/* <Link href="/tmp_home" className="block lg:hidden text-black">already a member?</Link> */}
          <div className="pb-12 lg:pb-2"></div>
          <div className="overflow-hidden w-screen">
            <div className="relative flex flex-row">
              <div className="flex flex-row animate-marquee whitespace-nowrap">
                {shuffledArtists.map(({ name, photo }, i) => <SignedArtistCard
                  key={i}
                  name={name}
                  photo={photo}
                />)}
              </div>
              <div className="absolute flex flex-row animate-marquee2 whitespace-nowrap">
                {shuffledArtists.map(({ name, photo }, i) => <SignedArtistCard
                  key={i}
                  name={name}
                  photo={photo}
                />)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <FeaturedIn />
      <div className="h-12"></div>
      <EmpowermentHub />
      <div className="h-12 md:h-36"></div>
      <SupportJourney />
      <div className="h-12 md:h-36"></div>
      <SubscriptionPlans />
      <div className="h-12 md:h-36"></div>
      <Benefits />
      <div className="h-12 md:h-36"></div>
      <YourJourney />
      <div className="h-12 md:h-36"></div>
      <Unshackle />
      <div className="h-12 md:h-36"></div>
      <JoinTheMovement />
      <div className="h-12"></div>
      <div className="w-screen">
        <Footer />
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const signedArtists = [
    {
      name: 'Maria Alexa',
      photo: '/images/512x512/maria.512x512.png',
    },
    {
      name: 'Jay?duhhh',
      photo: '/images/512x512/jayduhhh.512x512.png',
    },
    {
      name: 'ManiDaBrat',
      photo: '/images/512x512/mani.512x512.png',
    },
    {
      name: 'Infamou$G',
      photo: '/images/512x512/infamousg.512x512.png',
    },
    {
      name: 'Seelife',
      photo: '/images/512x512/seelife.512x512.png',
    },
    {
      name: 'rysovalid',
      photo: '/images/512x512/rysovalid.512x512.png',
    },
    {
      name: 'Niral Desai',
      photo: '/images/512x512/niral.512x512.png',
    },
    {
      name: 'Fe_lie the God',
      photo: '/images/512x512/felie.512x512.png',
    },
    {
      name: 'Yung Smilez',
      photo: '/images/512x512/yungsmilez.512x512.png',
    },
    {
      name: 'Davy HBF',
      photo: '/images/512x512/davy.512x512.png',
    },
    {
      name: 'Andrew Rohlk',
      photo: '/images/512x512/andrew.512x512.png',
    },
    {
      name: 'Rein',
      photo: '/images/512x512/rein.512x512.png',
    },
    {
      name: 'Frankie Biggz',
      photo: '/images/512x512/frankie.512x512.png',
    },
  ];
  const shuffledArtists = shuffle(signedArtists);
  return { props: { shuffledArtists } };
};

