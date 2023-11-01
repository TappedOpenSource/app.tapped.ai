
import Image from 'next/image';
import Link from 'next/link';

type ProductSectionProps = {
  title: string;
  description: string;
  image: string;
  link: string;
  alt: string;
  color?: 'blue' | 'red'
  reverse?: boolean;
  buttonText?: string;
};

function ProductSection({
  title,
  description,
  image,
  link,
  alt,
  color,
  reverse,
  buttonText = 'try now',
}: ProductSectionProps) {
  const red = 'bg-gradient-to-br from-red-600 to-pink-600 py-24';
  const blue = 'bg-gradient-to-br from-blue-600 to-sky-400 py-24';
  const flexDirection = reverse ?
    'md:flex-row-reverse' :
    'md:flex-row';

  const backgroundColor = (() => {
    switch (color) {
    case 'blue':
      return blue;
    case 'red':
      return red;
    default:
      return '';
    }
  })();

  const border = backgroundColor !== '' ?
    'border-2 border-gray-200' :
    '';


  return (
    <>
      <div className={`flex flex-col ${flexDirection} justify-center items-center gap-6 ${backgroundColor}`}>
        <div className='mx-4 md:mx-0 md:w-1/3'>
          <h1 className='text-2xl font-extrabold'>{title}</h1>
          <p className=''>
            {description}
          </p>
          <div className='h-8'></div>
          <Link
            href={link}
            className="text-lg bg-white text-black font-extrabold rounded-full px-6 py-4 hover:scale-105 transform transition-all duration-200 ease-in-out"
          >{buttonText}</Link>
        </div>
        <div>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={link}
          >
            <Image
              src={image}
              alt={alt}
              width={500}
              height={500}
              className={`rounded-xl ${border}`}
            />
          </Link>
        </div>
      </div>
    </>
  );
}

export default function Benefits() {
  return (
    <section>
      <div className="flex flex-col justify-center lowercase">
        <h2 className="text-center text-4xl">explore tapped&apos;s benefits</h2>
        <div className="h-12"></div>
        <ProductSection
          title='join the community'
          description=''
          link='https://app.tapped.ai/download'
          image='/images/app_sample.png'
          alt='ai app Sample'
          buttonText='get the app'
          reverse
        />
        <div className='h-8 md:h-24'></div>
        <ProductSection
          title='look professional'
          description='Whether you&apos;re an indie artist just starting out or a seasoned pro,
          we have the power to elevate your game.
          We can help you take your music career to the next level.
          Our easy-to-use tool will walk you through the process of creating a
          comprehensive marketing strategy, step by step.'
          link='https://getmusicmarketing.com'
          image='/images/marketing_og.png'
          alt='Marketing Report Sample'
          color='red'
          buttonText='create your own'
        />
        <div className='h-8 md:h-24'></div>
        <ProductSection
          title='expand your reach'
          description='Expanding a musician&apos;s reach is crucial in today&apos;s
          competitive music industry, and it offers a myriad of benefits.
          A broader audience means increased visibility,
          more fans,
          and ultimately higher potential for success.
          Tapped offers invaluable support in this endeavor by
          providing cutting-edge marketing and promotional strategies.
          With Tapped&apos;s expertise,
          artists can harness the power of digital platforms,
          social media, and data-driven insights to reach wider audiences,
          connect with fans, and unlock new opportunities for
          growth and recognition in the music world.'
          link="https://viralsocialmediaideas.com"
          image="/images/viral_idea_sample.png"
          alt='Social Media Idea Sample'
          reverse
        />
        <div className='h-8 md:h-24'></div>
        <ProductSection
          title='earn more'
          description='Create a professional EPK in minutes with Tapped.
          Get noticed by bookers and promoters, reach new fans, and book more gigs.
          Tap into Tapped&apos;s community of industry professionals and get valuable feedback on your music and EPK.
          Sign up today and start growing your music career!'
          link='https://getmusicepk.com'
          image="/images/epk_sample.png"
          alt='EPK Sample'
          color='blue'
          buttonText='coming soon'
        />
        <div className='h-8 md:h-24'></div>
        <ProductSection
          title='stay up-to-date'
          description=''
          link='https://getmusicviralchecker.com'
          image='/images/viralchecker_sample.png'
          alt='Viral Music Checker Sample'
          buttonText='try it out'
          reverse
        />
      </div>
    </section>
  );
}
