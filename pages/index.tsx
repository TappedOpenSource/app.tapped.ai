import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

import { shuffle } from '@/utils/shuffle';
import Footer from '@/components/Footer';
import mariaImage from '@/public/images/512x512/maria.512x512.png';
import jayduhhhImage from '@/public/images/512x512/jayduhhh.512x512.png';
import maniImage from '@/public/images/512x512/mani.512x512.png';
import infamousgImage from '@/public/images/512x512/infamousg.512x512.png';
import seelifeImage from '@/public/images/512x512/seelife.512x512.png';
import rysovalidImage from '@/public/images/512x512/rysovalid.512x512.png';
import niralImage from '@/public/images/512x512/niral.512x512.png';
import felieImage from '@/public/images/512x512/felie.512x512.png';
import yungsmilezImage from '@/public/images/512x512/yungsmilez.512x512.png';
import davyImage from '@/public/images/512x512/davy.512x512.png';
import andrewImage from '@/public/images/512x512/andrew.512x512.png';
import reinImage from '@/public/images/512x512/rein.512x512.png';
import frankieImage from '@/public/images/512x512/frankie.512x512.png';

const SignedArtist = ({ name, photo }: {
  name: string;
  photo: StaticImageData;
}) => {
  return (
    <>
      <div
        className="w-48 h-48 relative flex-shrink-0 m-2">
        <Image
          fill
          priority
          className='rounded-2xl'
          src={photo}
          alt={name}
          style={{ objectFit: 'cover' }} />
        <p className="absolute font-bold text-xl bottom-0 left-0 pb-2 pl-2">{name}</p>
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  const signedArtists = [
    {
      name: 'Maria Alexa',
      photo: mariaImage,
    },
    {
      name: 'Jay?duhhh',
      photo: jayduhhhImage,
    },
    {
      name: 'ManiDaBrat',
      photo: maniImage,
    },
    {
      name: 'Infamou$G',
      photo: infamousgImage,
    },
    {
      name: 'Seelife',
      photo: seelifeImage,
    },
    {
      name: 'rysovalid',
      photo: rysovalidImage,
    },
    {
      name: 'Niral Desai',
      photo: niralImage,
    },
    {
      name: 'Fe_lie the God',
      photo: felieImage,
    },
    {
      name: 'Yung Smilez',
      photo: yungsmilezImage,
    },
    {
      name: 'Davy HBF',
      photo: davyImage,
    },
    {
      name: 'Andrew Rohlk',
      photo: andrewImage,
    },
    {
      name: 'Rein',
      photo: reinImage,
    },
    {
      name: 'Frankie Biggz',
      photo: frankieImage,
    },
  ];
  const shuffledArtists = shuffle(signedArtists);
  return { props: { shuffledArtists } };
};

export default function Home({ shuffledArtists }: {
  shuffledArtists: {
    name: string;
    photo: StaticImageData;
  }[]
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-12 px-12 bg-[#38B6FF]">
      <div className="h-screen">
        <div className="w-full items-center justify-around text-sm lg:flex">
          <div id="by-tapped" className="fixed bottom-0 left-0 flex h-24 w-full items-end justify-center bg-white rounded-lg lg:static lg:h-auto lg:w-auto">
            <a
              className="flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
              href="https://app.tapped.ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{' '}
              <Image
                src="/images/tapped_logo.png"
                alt="Tapped AI Logo"
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
          <Link href="/signup_complete" className="hidden lg:block">already a member?</Link>
        </div>

        <div className="flex flex-col place-items-center md:pt-24 md:pr-24 md:pl-24">
          <h1
            className="text-5xl font-bold text-center text-white lg:text-8xl"
          >
            welcome to the first ever <span className="md:underline">AI record label</span>.
          </h1>
          <div className="pt-2 pb-2"></div>
          <h2
            className="text-2xl font-thin text-center text-white lg:text-4xl"
          >
            we are the anti-360 deal.
          </h2>
          <div className="flex flex-row gap-6 mt-8 mb-4 py-2 px-4">
            <Link
              href="/application_form"
              // href="https://d4wmuljalg3.typeform.com/to/FGWV5B6D"
              id="apply-here"
              className="text-lg font-bold rounded-lg hover:scale-105 transform transition-all duration-200 ease-in-out"
            >apply here</Link>
            <Link
              href="/about"
              // href="https://d4wmuljalg3.typeform.com/to/FGWV5B6D"
              id="learn-more"
              className="text-lg font-bold rounded-lg border-2 border-white hover:scale-105 transform transition-all duration-200 ease-in-out"
            >learn more</Link>
          </div>
          <Link href="/tmp_home" className="block lg:hidden text-black">already a member?</Link>
          <div className="pb-12 lg:pb-2"></div>
          <div className="overflow-hidden w-screen">
            <div className="relative flex flex-row">
              <div className="flex flex-row animate-marquee whitespace-nowrap">
                {shuffledArtists.map(({ name, photo }, i) => <SignedArtist
                  key={i}
                  name={name}
                  photo={photo}
                />)}
              </div>
              <div className="absolute flex flex-row animate-marquee2 whitespace-nowrap">
                {shuffledArtists.map(({ name, photo }, i) => <SignedArtist
                  key={i}
                  name={name}
                  photo={photo}
                />)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black w-screen">
        <Footer />
      </div>
    </main>
  );
}
