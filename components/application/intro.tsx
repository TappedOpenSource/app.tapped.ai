import Image from 'next/image';

const Intro = () => {
  return (
    <>
      <div className='flex flex-col justify-center items-center px-12'>
        <Image
          src="/android-chrome-512x512.png"
          alt="tapped logo"
          width={128}
          height={128} />
        <h2 className='font-bold text-xl text-black text-center'>
        the anti 360 deal. we don't take any % of your music.
        </h2>

        <p className='text-lg text-black text-center'>
        become a part of history and control your narrative.
        </p>
      </div>
    </>
  );
};

export default Intro;
