/* eslint-disable sonarjs/no-duplicate-string */
// import Image from 'next/image';
import Link from 'next/link';
import { Rubik } from 'next/font/google';

import { shuffle } from '@/utils/shuffle';
import Footer from '@/components/landing/Footer';
import SignedArtistCard from '@/components/landing/SignedArtistCard';
import Nav from '@/components/landing/Nav';
import PartneredWith from '@/components/landing/PartneredWith';
// import Snowfall from 'react-snowfall';
import SupportJourney from '@/components/landing/SupportJourney';
import SubscriptionPlans from '@/components/landing/SubscriptionPlans';
import YourJourney from '@/components/landing/YourJourney';
import Team from '@/components/landing/Team';

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

// const isWinter = [12, 1, 2].includes(new Date().getMonth());

export default async function Home() {
  const { shuffledArtists } = await getData();

  // bg-[#63b2fd]
  return (
    <div className={`${rubik.className} landing`}>
      {/* {isWinter && <Snowfall
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
        }}
      />} */}
      <Nav />
      <main>
        <div className="flex flex-col items-center justify-start px-12">
          {/* <div className="w-full items-center justify-around text-sm lg:flex">
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
              href="https://tapped.ai/download"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download the app
            </a>
          </div>
        </div> */}

          <div className="flex flex-col place-items-center md:pt-20">
            <Link
              href='https://tapped.ai/download'
              className="bg-white/20 rounded-full">
              <p
                className="text-center text-white py-4 px-8"
              >
                join over 10,000+ performers on the app.
              </p>
            </Link>
            <div className="h-8"></div>
            <h1
              className="text-5xl md:w-1/2 font-extrabold text-center text-white lg:text-6xl"
            >
            create a world tour from your iPhone
            </h1>
            <div className="pt-2 pb-2"></div>
            <h2
              className="text-2xl font-thin text-center text-gray-200"
            >
            live music data with superpowers
            </h2>
            <div className="flex flex-col md:flex-row justify-center mt-8 mb-4 py-2 px-4 gap-4">
              <Link
                href="/download"
                className="text-lg font-bold bg-white text-black text-center rounded-full px-6 py-3 hover:scale-105 transform transition-all duration-200 ease-in-out"
              >get started</Link>
              {/* <Link
                href="/venue"
                className="text-lg font-black text-white bg-white/25 text-center rounded-full px-6 py-3 hover:scale-105 transform transition-all duration-200 ease-in-out"
              >for bookers</Link> */}
            </div>
            <div className="pb-12 lg:pb-2"></div>
            <div className="overflow-hidden w-screen">
              <div className="relative flex flex-row">
                <div className="flex flex-row animate-marquee whitespace-nowrap">
                  {shuffledArtists.map((userInfo, i) => <SignedArtistCard
                    key={i}
                    {...userInfo}
                  />)}
                </div>
                <div className="absolute flex flex-row animate-marquee2 whitespace-nowrap">
                  {shuffledArtists.map((userInfo, i) => <SignedArtistCard
                    key={i}
                    {...userInfo}
                  />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="h-12 md:h-36"></div>
      <PartneredWith />
      <div className="h-12 md:h-36"></div>
      <SupportJourney />
      <div className="h-12 md:h-36"></div>
      <SubscriptionPlans />
      <div className="h-12 md:h-36"></div>
      <YourJourney />
      <div className="h-12 md:h-36"></div>
      <Team />
      <div className="h-12 md:h-36"></div>
      <div
        className='px-2 py-24 my-12 md:my-0 md:min-h-screen flex flex-col justify-center items-center bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-green-300 via-blue-500 to-purple-600'
      >
        <h1
          className='uppercase text-5xl md:text-9xl font-extrabold text-center text-white lg:text-6xl'
        >want to get booked more?</h1>
        <h1
          className='uppercase text-5xl md:text-9xl font-extrabold text-center text-white lg:text-6xl'
        >we can help</h1>
        <div className="h-12"></div>
        <div className="flex justify-center py-2 px-4">
          <Link
            href="https://tapped.ai/download"
            target="_blank"
            title="app download"
            rel="noreferrer"
            className="bg-white text-black text-lg font-black text-center rounded-full px-6 py-3 hover:scale-105 transform transition-all duration-200 ease-in-out"
          >get started</Link>
        </div>
      </div>
      <div className="h-12"></div>
      <div className="w-screen">
        <Footer />
      </div>
    </div>
  );
}

const getData = async () => {
  const signedArtists: {
    name: string;
    photo: string;
    url: string;
    username?: string;
    signed?: boolean;
  }[] = [
    {
      name: 'maria alexa',
      photo: '/images/512x512/maria.512x512.png',
      username: 'marialexa',
      url: 'https://music.apple.com/us/artist/maria-alexa/1526235494',
    },
    {
      name: 'funk flex',
      photo: '/images/512x512/512.funkflex.jpeg',
      url: 'https://music.apple.com/us/artist/funk-flex/130882',
    },
    // {
    //   name: 'manidabrat',
    //   photo: '/images/512x512/mani.512x512.png',
    //   url: 'https://music.apple.com/us/artist/mani-da-brat/1509383758',
    //   username: 'manidabrat',
    // },
    // {
    //   name: 'NLE Choppa',
    //   photo: '/images/512x512/512.choppa.jpeg',
    //   url: 'https://music.apple.com/us/artist/nle-choppa/1449052753',
    // },
    {
      name: 'seelife',
      photo: '/images/512x512/seelife.512x512.png',
      url: 'https://music.apple.com/us/artist/seelife/1493214282',
      username: 'seelife',
    },
    {
      name: 'rysovalid',
      photo: '/images/512x512/rysovalid.512x512.png',
      url: 'https://music.apple.com/us/artist/rysovalid/1140332949',
      username: 'rysovalid',
    },
    {
      name: 'niral desai',
      photo: '/images/512x512/niral.512x512.png',
      url: 'https://music.apple.com/us/artist/niral-desai/1682714169',
      username: 'niral_desai',
      signed: true,
    },
    {
      name: 'fe_lie the god',
      photo: '/images/512x512/felie.512x512.png',
      url: 'https://music.apple.com/us/artist/fe-lie-the-god/1090646827',
      username: 'fe_lie540',
    },
    {
      name: 'yung smilez',
      photo: '/images/512x512/yungsmilez.512x512.png',
      url: 'https://music.apple.com/us/artist/yung-smilez/1228940318',
      username: 'yungsmilez',
    },
    // {
    //   name: 'bobby shmurda',
    //   photo: '/images/512x512/512.bobbyschmurda.jpeg',
    //   url: 'https://music.apple.com/us/artist/bobby-shmurda/902809133',
    // },
    {
      name: 'andrew rohlk',
      photo: '/images/512x512/andrew.512x512.png',
      url: 'https://music.apple.com/us/artist/andrew-rohlk/592655140',
      username: 'arohlk',
    },
    {
      name: 'rein',
      photo: '/images/512x512/rein.512x512.png',
      url: 'https://music.apple.com/us/artist/rein/1590397406',
      username: 'rein',
    },
    {
      name: 'frankie biggz',
      photo: '/images/512x512/frankie.512x512.png',
      url: 'https://music.apple.com/us/artist/frankie-biggz/191277376',
      username: 'frankiebiggz',
    },
    // {
    //   name: 'meek mill',
    //   photo: '/images/512x512/512.meekmill.jpeg',
    //   url: 'https://music.apple.com/us/artist/meek-mill/313865761',
    // },
    // {
    //   name: 'rick ross',
    //   photo: '/images/512x512/512.rickross.jpeg',
    //   url: 'https://music.apple.com/us/artist/rick-ross/4022281',
    // },
    {
      name: 'chloe battelle',
      photo: '/images/512x512/512.chloe.jpg',
      url: 'https://soundcloud.com/chloebattelle',
      username: 'chloebattelle',
    },
    {
      name: 'midnite taxi',
      photo: '/images/masters/midnitetaxi.png',
      url: 'https://open.spotify.com/artist/4FSFJPU7qvgicPKVlAeB9A',
      username: 'midnitetaxi',
    },
    {
      name: 'nadia aram',
      photo: '/images/512x512/512.nadia.png',
      url: 'https://www.instagram.com/macnadiacheese',
      username: 'macnadiacheese',
    },
    {
      name: 'kang',
      photo: '/images/512x512/512.kang.png',
      url: 'https://open.spotify.com/artist/3Co2OcoVMpSvY6l1JdZUbT',
      username: 'kang',
    },
    {
      name: 'marly xlla',
      photo: '/images/512x512/512.marly.png',
      url: 'https://www.instagram.com/marlyxlla/',
      username: 'marlyxlla',
    },
    {
      name: 'normn',
      photo: '/images/512x512/512.normn.png',
      url: 'https://www.instagram.com/iamnormn/',
      username: 'iamnormn',
    },
    {
      name: 'kenny',
      photo: '/images/512x512/512.kenny.png',
      url: 'https://kennethlartey.xyz/',
      username: 'kenny',
    },
    {
      name: 'zoe gabrielle',
      photo: '/images/512x512/512.zoe.png',
      url: 'https://www.instagram.com/izoegabrielle',
      username: 'zoegabrielle',
    },
    {
      name: 'seckofinesse',
      photo: '/images/512x512/512.secko.png',
      url: 'https://www.instagram.com/seckofinesse/',
      username: 'seckofinesse',
    },
    {
      name: 'ffeel',
      photo: '/images/512x512/512.ffeel.png',
      url: 'https://www.instagram.com/ffeel/',
      username: 'ffeel',
    },
    {
      name: 'alpharaulphy',
      photo: '/images/512x512/512.raulphy.png',
      url: 'https://www.instagram.com/alpharaulphy/',
      username: 'alpharaulphy',
    },
    {
      name: 'chandler',
      photo: '/images/512x512/512.chandler.jpg',
      url: 'https://www.instagram.com/chandlermatkins/',
      username: 'chandler',
    },
  ];
  const shuffledArtists = shuffle(signedArtists);
  return { shuffledArtists };
};

