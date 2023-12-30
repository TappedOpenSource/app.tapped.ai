
import Link from 'next/link';

export default function Venue() {
  return (
    <>
      <div
        className='px-2 py-24 my-12 md:my-0 md:min-h-screen flex flex-col justify-center items-center bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-red-300 via-purple-500 to-pink-600'
      >
        <h1
          className='uppercase text-5xl md:text-9xl font-extrabold text-center text-white lg:text-6xl'
        >need an artist for a show?</h1>
        <div className="h-12"></div>
        <div className="flex justify-center py-2 px-4">
          <Link
            href="https://forms.gle/F18XCFnAXmyML2Bn8"
            target="_blank"
            title="app download"
            rel="noreferrer"
            className="bg-white text-black text-lg font-black text-center rounded-full px-6 py-3 hover:scale-105 transform transition-all duration-200 ease-in-out"
          >add an opportunity</Link>
        </div>
      </div>
    </>
  );
}
