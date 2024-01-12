import Link from 'next/link';
import Image from 'next/image';
import { Opportunity } from '@/domain/models/opportunity';

export default function OpportunityTile({ opportunity }: {
    opportunity: Opportunity;
}) {
  const opImage = (() => {
    if (
      opportunity.flierUrl !== undefined &&
      opportunity.flierUrl !== null &&
      opportunity.flierUrl !== '') {
      return opportunity.flierUrl;
    }

    return '/images/default_avatar.png';
  })();

  return (
    <>
      <Link href={`/opportunity/${opportunity.id}`}>
        <div className='flex flex-col w-[320px] h-[350px] justify-between rounded-xl p-4 overflow-hidden hover:scale-105 transform transition-all duration-200 ease-in-out'>
          <div className='relative w-[300px] h-[300px]'>
            <Image
              src={opImage}
              alt='opportunity flier'
              fill
              objectFit='cover'
              className='rounded-xl'
            />
          </div>
          <h1
            className='text-xl font-bold'
          >{opportunity.title}</h1>
          <div className='h-2' />
        </div>
      </Link>
    </>
  );
}
