
import Image from 'next/image';
import Link from 'next/link';

const Benefits = () => {
  return (
    <section>
      <div className="flex flex-col justify-center">
        <h2 className="text-center text-4xl">explore tapped&apos;s benefits</h2>
        <div className="h-12"></div>
        <div className='flex flex-col md:flex-row justify-center items-center gap-6'>
          <div className='mx-4 md:mx-0 md:w-1/3'>
            <h1 className='text-2xl font-extrabold'>look professional</h1>
            <p>
            Whether you&apos;re an indie artist just starting out or a seasoned pro,
            we have the power to elevate your game.
            We can help you take your music career to the next level.
            Our easy-to-use tool will walk you through the process of creating a
            comprehensive marketing strategy, step by step.
            </p>
            <div className='h-8'></div>
            <Link
              href="https://getmusicmarketing.com"
              className="text-lg bg-white text-black font-extrabold rounded-full px-6 py-4 hover:scale-105 transform transition-all duration-200 ease-in-out"
            >try it out</Link>
          </div>
          <div>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://getmusicmarketing.com"
            >
              <Image
                src="/images/marketing_report_sample.png"
                alt="Marketing Report Sample"
                width={500}
                height={500}
                className='rounded-xl'
              />
            </Link>
          </div>
        </div>
        <div className='h-16 md:h-44'></div>
        <div className='flex flex-col md:flex-row justify-center items-center gap-6'>
          <div>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://viralsocialmediaideas.com"
            >
              <Image
                src="/images/viral_idea_sample.png"
                alt="Social Media Idea Sample"
                width={500}
                height={500}
                className='rounded-xl'
              />
            </Link>
          </div>
          <div className='mx-4 md:mx-0 md:w-1/3'>
            <h1 className='text-2xl font-extrabold'>expand your reach</h1>
            <p>
              blah blah blah
              blah blah blah
              blah blah blah
              blah blah blah
              blah blah blah
              blah blah blah
              blah blah blah
              blah blah blah
            </p>
            <div className='h-8'></div>
            <Link
              href="https://viralsocialmediaideas.com"
              className="text-lg bg-white text-black font-extrabold rounded-full px-6 py-4 hover:scale-105 transform transition-all duration-200 ease-in-out"
            >try it out</Link>
          </div>
        </div>
        <div className='h-16 md:h-44'></div>
        <div className='flex flex-col md:flex-row justify-center items-center gap-6'>
          <div className='mx-4 md:mx-0 md:w-1/3'>
            <h1 className='text-2xl font-extrabold'>earn more</h1>
            <p>
              blah blah blah
              blah blah blah
              blah blah blah
              blah blah blah
              blah blah blah
              blah blah blah
              blah blah blah
              blah blah blah
            </p>
            <div className='h-8'></div>
            <Link
              href="https://getmusicepk.com"
              className="text-lg bg-white text-black font-extrabold rounded-full px-6 py-4 hover:scale-105 transform transition-all duration-200 ease-in-out"
            >try it out</Link>
          </div>
          <div>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://getmusicepk.com"
            >
              <Image
                src="/images/epk_sample.png"
                alt="EPK Sample"
                width={500}
                height={500}
                className='rounded-xl border-2 border-white'
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
