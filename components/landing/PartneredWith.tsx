
import Link from 'next/link';
import Image from 'next/image';

export default function PartneredWith() {
  return <>
    <div className='flex flex-col justify-center items-center gap-8'>
      <div className="uppercase text-center font-bold opacity-80 lowercase">
      IN PARTNERSHIP WITH
      </div>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-center items-center gap-10'>
        <Link
          href="https://www.deathrowofficial.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src='/images/drr_logo.png'
            width={100}
            height={100}
            alt='Death row records logo'
            style={{
              maxWidth: '100%',
              height: 'auto',
            }} />
        </Link>
        <Link
          href="https://www.instagram.com/blankkanvaz/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src='/images/bcm_logo.png'
            width={100}
            height={100}
            alt='Black canvaz logo'
            style={{
              maxWidth: '100%',
              height: 'auto',
            }} />
        </Link>
        <Link
          href="https://www.instagram.com/playmakrsent/"
        >
          <Image
            src='/images/pe_logo.png'
            width={100}
            height={100}
            alt='Playmakrs entertainment logo'
            className='rounded-full'
            style={{
              maxWidth: '100%',
              height: 'auto',
            }} />
        </Link>
        <Link
          href="https://tccentertainment.com"
        >
          <Image
            src='/images/tcc_logo.png'
            width={100}
            height={100}
            alt='TCC entertainment logo'
            className='rounded-full'
            style={{
              maxWidth: '100%',
              height: 'auto',
            }} />
        </Link>
        <Link
          href="https://twitter.com/unisonrights"
          className='rounded-xl p-5 bg-white'
        >
          <Image
            src='/images/unison_logo.png'
            width={60}
            height={60}
            alt='Unison logo'
            className=''
            style={{
              maxWidth: '100%',
              height: 'auto',
            }} />
        </Link>
        {/* <Link
          href="https://ktizo.com"
          className='rounded-xl p-5 bg-white'
        >
          <Image
            src='/images/ktizo.svg'
            width={60}
            height={60}
            alt='Ktizo logo'
            className=''
            style={{
              maxWidth: '100%',
              height: 'auto',
            }} />
        </Link> */}
      </div>
    </div>
  </>;
}
