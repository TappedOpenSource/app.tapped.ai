
const SupportJourney = () => {
  return (
    <section id="support-journey">
      <div className="flex flex-col place-items-center justify-center">
        {/* <div className="bg-white/20 rounded-full">
          <p
            className="text-center text-white py-4 px-8"
          >
            here to support your creative journey
          </p>
        </div>
        <div className="h-8"></div> */}
        <h2 className="text-center text-4xl mx-4 md:mx-0 md:w-1/2">
        giving artists the tools they need to succeed in the music industry
        </h2>
        <div className="h-8"></div>
        <p className="text-center text-lg mx-4 md:mx-0 md:w-1/2 lowercase">
        Unlike traditional record labels, we&apos;re not interested in taking a slice of your hard-earned success. We believe your art should remain yours. That&apos;s why we don&apos;t ask for any equity, and there are no long-term contracts tying you down.
        </p>
        {/* <div className="h-8"></div>
        <Image
          className='md:rounded-xl'
          src="/images/billboard1.png"
          alt="photo of the first tapped billboard"
          width={512}
          height={512}
        /> */}
      </div>
    </section>
  );
};

export default SupportJourney;
