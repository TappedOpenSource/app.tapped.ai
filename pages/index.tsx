import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-w-screen flex min-h-screen w-full flex-col items-center justify-start overflow-x-hidden bg-[#42A5F5] p-12">
      <div className="w-full max-w-5xl items-center justify-between text-sm lg:flex">
        <div
          id="by-tapped"
          className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center rounded-lg bg-white lg:static lg:h-auto lg:w-auto"
        >
          <a
            className="text-md pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://app.tapped.ai"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/images/tapped_logo.png"
              alt="Tapped AI Logo"
              width={65}
              height={14}
              priority
            />
          </a>
        </div>
      </div>

      <div className="before:bg-gradient-radial after:bg-gradient-conic flex flex-col place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:from-white before:to-transparent before:blur-2xl before:content-[''] after:h-[180px] after:w-[240px] after:translate-x-1/3 after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 md:pl-24 md:pr-24 md:pt-24 before:lg:h-[360px]">
        <h1 className="text-center text-5xl font-bold text-white lg:text-8xl">
          Welcome to the first ever{' '}
          <span className="md:underline">AI Record Label</span>.
        </h1>
        <div className="pb-2 pt-2"></div>
        <h2 className="text-center text-2xl font-thin text-white lg:text-4xl">
          let&apos;s destroy traditional record labels together....
        </h2>
        <Link
          className="pointer z-10 mt-6 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4"
          href="/branding"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
