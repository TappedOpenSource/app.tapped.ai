"use client";
import Search from "@/components/search";
// import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 lg:p-24">
      <h1
        className='text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500'
      >tapped data</h1>
      <h3
        className='text-2xl font-bold text-center text-white'
      >predicting the future of live music</h3>
      <Search />
    </main>
  );
}
