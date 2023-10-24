
import Image from 'next/image';

const Benefits = () => {
  return (
    <section>
      <div className="flex flex-col justify-center">
        <h2 className="text-center text-4xl">explore tapped&apos;s benefits</h2>
        <div className="h-12"></div>
        <div className="flex flex-col md:flex-row justify-center">
          <div className="mx-4 md:mx-0 md:w-1/3">
            <div className='flex justify-center'>
              <Image
                src="/images/icon_1.png"
                alt="icon 1"
                width={100}
                height={100}
              />
            </div>
            <div className='my-3'></div>
            <h3 className="text-center text-lg font-extrabold">Pay-As-You-Go Services</h3>
            <p className="text-center text-lg">Flexibility is the name of the game. Pay only for the services you use, when you use them. We&apos;ve integrated our services seamlessly into our app, allowing you to pick and choose as you navigate your music journey.</p>
          </div>
          <div className="h-8 w-24"></div>
          <div className="mx-4 md:mx-0 md:w-1/3">
            <div className='flex justify-center'>
              <Image
                src="/images/icon_2.png"
                alt="icon 1"
                width={100}
                height={100}
              />
            </div>
            <div className='my-3'></div>
            <h3 className="text-center text-lg font-extrabold">Meet Your Virtual Team</h3>
            <p className="text-center text-lg">With TappedAi, you&apos;re not alone. Our record label package comes with access to seven virtual team members ready to assist you. From marketing and branding to styling and cover art creation, we&apos;ve got you covered.</p>
          </div>
        </div>
        <div className="h-8"></div>
        <div className="flex flex-row justify-center">
          <div className="mx-4 md:mx-0 md:w-1/3">
            <div className='flex justify-center'>
              <Image
                src="/images/icon_3.png"
                alt="icon 1"
                width={100}
                height={100}
              />
            </div>
            <div className='my-3'></div>
            <h3 className="text-center text-lg font-extrabold">Unleash Your Creativity</h3>
            <p className="text-center text-lg">
            We&apos;re not here to dictate your artistic direction. Our focus is on the business side of things, leaving you free to explore your creative genius and reach new heights in your music career.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
