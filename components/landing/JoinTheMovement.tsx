import Link from 'next/link';

const JoinTheMovement = () => {
  return (
    <section>
      <div className="flex flex-col justify-center items-center">
        <iframe
          className="mb-12 w-5/6 md:w-1/2 aspect-video"
          width={560}
          height={315}
          src="https://www.youtube.com/embed/QxNjQVzzzFE?si=XF3MPIIHwkhhDPgl"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
        <div className="h-2" />
        <Link
          target="_blank"
          rel="noreferrer"
          href="https://forms.gle/F18XCFnAXmyML2Bn8"
          className='mx-2 md:mx-0 border border-gray-400/50 rounded-xl px-8 md:px-24 py-5 bg-white/10 text-white text-center'
        >
          add an opportunity
        </Link>
        <div className="h-4" />
        <h1 className="text-center text-xl md:text-5xl w-3/4">join the movement today and witness the power of art and innovation combined</h1>
      </div>
    </section>
  );
};

export default JoinTheMovement;
