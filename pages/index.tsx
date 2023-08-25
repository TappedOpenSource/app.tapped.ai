import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

import mariaImage from '@/public/images/512x512/maria.512x512.png';
import jayduhhhImage from '@/public/images/512x512/jayduhhh.512x512.png';
import maniImage from '@/public/images/512x512/mani.512x512.png';
import infamousgImage from '@/public/images/512x512/infamousg.512x512.png';
import seelifeImage from '@/public/images/512x512/seelife.512x512.png';
import rysovalidImage from '@/public/images/512x512/rysovalid.512x512.png';
import niralImage from '@/public/images/512x512/niral.512x512.png';
import filieImage from '@/public/images/512x512/fi_lie.512x512.png';
import yungsmilezImage from '@/public/images/512x512/yungsmilez.512x512.png';
import davyImage from '@/public/images/512x512/davy.512x512.png';
import andrewImage from '@/public/images/512x512/andrew.512x512.png';

const signedArtists: {
  name: string;
  photo: StaticImageData;
}[] = [
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
    photo: filieImage,
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
];

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

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-12 bg-[#38B6FF]">
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
              className="text-lg font-bold rounded-lg hover:scale-105 transform transition-all duration-200 ease-in-out"
            >learn more</Link>
          </div>
          <Link href="/tmp_home" className="block lg:hidden text-black">already a member?</Link>
          <div className="pb-12 lg:pb-2"></div>
          <div className="overflow-hidden w-screen">
            <div className="relative flex flex-row">
              <div className="flex flex-row animate-marquee whitespace-nowrap">
                {signedArtists.map(({ name, photo }, i) => <SignedArtist
                  key={i}
                  name={name}
                  photo={photo}
                />)}
              </div>
              <div className="absolute flex flex-row animate-marquee2 whitespace-nowrap">
                {signedArtists.map(({ name, photo }, i) => <SignedArtist
                  key={i}
                  name={name}
                  photo={photo}
                />)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pl-4 pr-4 pb-4 md:pl-24 md:pr-24 md:pb-24">
        <div className="flex justify-center text-center mb-10 mt-20 text-3xl md:text-6xl tracking-tighter md:justify-start">
          Welcome to TappedAI: Your Artist Empowerment Hub
        </div>

        <div className="text-center pt-6 font-bold md:text-start md:text-xl">
          🎵 Are you ready to revolutionize your music career?
        </div>
        <div className="text-center md:text-start md:text-xl">
          TappedAI is here to redefine what it means to be an artist in the digital age.
          Our cutting-edge approach puts the power back in your hands, allowing you to focus on your creativity while we handle the rest.
        </div>

        <div className="text-center md:text-start text-3xl mt-10 mb-5">
          🌟 Why TappedAI?
        </div>
        <div className="text-center pt-6 font-bold md:text-start md:text-xl">
          🎤 No Equity, No Contracts:
        </div>
        <div className="text-center md:text-start md:text-xl">
          Unlike traditional record labels, we&apos;re not interested in taking a slice of your hard-earned success. We believe your art should remain yours. That&apos;s why we don&apos;t ask for any equity, and there are no long-term contracts tying you down.
        </div>
        <div className="text-center pt-6 font-bold md:text-start md:text-xl">
          💲 Affordable Subscription Plans:
        </div>
        <div className="text-center md:text-start md:text-xl">
          Say goodbye to financial stress. Our monthly subscription plans start at just $50, making it accessible for artists of all backgrounds. Get the support you need without breaking the bank.
        </div>
        <div className="text-center pt-6 font-bold md:text-start md:text-xl">
          📅 Pay-As-You-Go Services:
        </div>
        <div className="text-center md:text-start md:text-xl">
          Flexibility is the name of the game. Pay only for the services you use, when you use them. We&apos;ve integrated our services seamlessly into our app, allowing you to pick and choose as you navigate your music journey.
        </div>
        <div className="text-center pt-6 font-bold md:text-start md:text-xl">
          🤖 Meet Your Virtual Team:
        </div>
        <div className="text-center md:text-start md:text-xl">
          With TappedAI, you&apos;re not alone. Our record label package comes with access to seven virtual team members ready to assist you. From marketing and branding to styling and cover art creation, we&apos;ve got you covered.
        </div>
        <div className="text-center pt-6 font-bold md:text-start md:text-xl">
          🚀 Unleash Your Creativity:
        </div>
        <div className="text-center md:text-start md:text-xl">
          We&apos;re not here to dictate your artistic direction. Our focus is on the business side of things, leaving you free to explore your creative genius and reach new heights in your music career.
        </div>
        <div className="text-center pt-6 font-bold md:text-start md:text-xl">
          🌐 Your Journey with TappedAI:
        </div>
        <div className="text-center pt-6 font-bold md:text-start md:text-xl">
          1. Choose Your Plan:
        </div>
        <div className="text-center md:text-start md:text-xl">
          Select the subscription plan that suits your needs, whether you&apos;re just starting out or ready to take your career to the next level.
        </div>
        <div className="text-center pt-6 font-bold md:text-start md:text-xl">
          2. Access Your Services:
        </div>
        <div className="text-center md:text-start md:text-xl">
          Dive into our app and access a range of services tailored to your requirements. Get help with marketing strategies, brand development, styling, and more.
        </div>
        <div className="text-center pt-6 font-bold md:text-start md:text-xl">
          3. Empower Your Brand:
        </div>
        <div className="text-center md:text-start md:text-xl">
          Collaborate with your virtual team members to enhance your branding, create captivating cover art, and present a professional image to the world.
        </div>
        <div className="text-center pt-6 font-bold md:text-start md:text-xl">
          4. Pay As You Go:
        </div>
        <div className="text-center md:text-start md:text-xl">
          Only pay for the services you use, ensuring you have complete control over your budget.
        </div>
        <div className="text-center pt-6 font-bold md:text-start md:text-xl">
          🎶 Unshackle Your Potential:
        </div>
        <div className="text-center md:text-start md:text-xl">
          TappedAI&apos;s first-ever AI-powered record label is designed to equip you with the tools you need to thrive as an independent artist.
          It&apos;s time to reclaim your music journey, and we&apos;re here to guide you every step of the way.
          Join the movement today and witness the power of art and innovation combined.
        </div>
      </div>
    </main>
  );
}
