
import Image from 'next/image';

const Benefits = () => {
  return (
    <section>
      <div className="flex flex-col justify-center">
        <h2 className="text-center text-4xl">explore tapped&apos;s benefits</h2>
        <div className="h-12"></div>
        <div className='min-h-screen'>
          <p>look professional</p>
        </div>
        <div className='min-h-screen flex flex-col md:flex-row justify-between'>
          <p>expand your reach</p>
          <Image
            src="/images/marketing_report_sample.png"
            alt="Marketing Report Sample"
            width={500}
            height={500}
          />
        </div>
        <div className='min-h-screen'>
          <p>earn more</p>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
