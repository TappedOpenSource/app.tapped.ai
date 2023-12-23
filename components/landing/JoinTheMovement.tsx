
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
        <div className="h-4" />
        <h1 className="text-center text-xl md:text-5xl w-3/4">join the movement today and witness the power of art and innovation combined</h1>
      </div>
    </section>
  );
};

export default JoinTheMovement;
