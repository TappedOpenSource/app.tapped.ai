
import Link from 'next/link';

const Unshackle = () => {
  return (
    <section className="bg-white">
      <div className='h-8'></div>
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-center text-black font-extrabold text-4xl">Unshackle Your Potential</h2>
        <div className='h-4'></div>
        <p className="text-center text-black text-lg px-4 md:px-0 md:w-1/2">TappedAI&apos;s first-ever AI-powered record label is designed to equip you with the tools you need to thrive as an independent artist. It&apos;s time to reclaim your music journey, and we&apos;re here to guide you every step of the way. </p>
        <div className='h-4'></div>
        <Link
          href="/application_form"
          className="text-lg bg-black font-white rounded-full px-6 py-2 hover:scale-105 transform transition-all duration-200 ease-in-out"
        >apply here</Link>
      </div>
      <div className='h-8'></div>
    </section>
  );
};

export default Unshackle;
