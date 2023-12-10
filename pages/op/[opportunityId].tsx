import { getOpportunityById, getUserById } from '@/data/database';
import { Opportunity } from '@/domain/models/opportunity';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import UserTile from '@/components/UserTile';
import { UserModel } from '@/domain/models/user_model';
import { FaMoneyBill } from 'react-icons/fa';
import { getPlaceById } from '@/data/places';
import { Fab } from '@mui/material';

export default function Page() {
  const router = useRouter();
  const opportunityId = router.query.opportunityId;
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [booker, setBooker] = useState<UserModel | null>(null);
  const [location, setLocation] = useState<string | null>(null);

  useEffect(() => {
    const getOpportunity = async () => {
      if (!opportunityId || typeof opportunityId !== 'string') {
        return;
      }

      const opportunity = await getOpportunityById(opportunityId);
      opportunity.match({
        some: (opportunity) => setOpportunity(opportunity),
        none: () => setOpportunity(null),
      });
    };
    getOpportunity();
  }, [opportunityId]);

  useEffect(() => {
    if (!opportunity) {
      return;
    }

    const getBooker = async () => {
      const booker = await getUserById(opportunity.userId);
      booker.match({
        some: (booker) => setBooker(booker),
        none: () => setBooker(null),
      });
    };
    getBooker();
  }, [opportunity]);

  useEffect(() => {
    if (!opportunity) {
      return;
    }

    const getLocation = async () => {
      await getPlaceById(opportunity.placeId);
    };
    getLocation();
  }, [opportunity]);

  if (!opportunity) {
    return (
      <>
        <p>loading...</p>
      </>
    );
  }

  const opImage = (() => {
    if (
      opportunity.flierUrl !== undefined &&
      opportunity.flierUrl !== null &&
      opportunity.flierUrl !== '') {
      return opportunity.flierUrl;
    }

    return '/images/default_avatar.png';
  })();

  console.log({ opportunity });

  return (
    <>
      <div className='fixed right-8 bottom-8'>
        <Link
          href='https://app.tapped.ai/download'
        >
          <Fab color="primary" aria-label="add" variant='extended'>
          apply in the app
          </Fab>
        </Link>
      </div>
      <div className='h-4 md:h-12' />
      <div
        className='flex justify-center items-center px-4 md:px-0'
      >
        <div className='md:px-0 relative h-[512px] w-full md:w-1/2 overflow-hidden'>
          <Image
            src={opImage}
            alt={`${opportunity.title} flier`}
            objectFit='cover'
            objectPosition='center'
            fill
            className='rounded-xl'
          />
        </div>
      </div>
      <div className='md:flex md:justify-center'>
        <div className='py-4 px-6 md:w-1/2'>
          <div>
            <h1 className='text-4xl font-extrabold'>{opportunity.title}</h1>
          </div>
          <div className='h-4' />
          <div>
            <p className='text-xl'>{opportunity.description}</p>
          </div>
          <div className='h-4' />
          <div>
            <h3 className='text-3xl font-bold'>booking agent</h3>
            <div className='h-2' />
            {booker && (
              <UserTile user={booker} />
            )}
          </div>
          {/* <div className='h-4' />
          <div>
            <h3 className='text-3xl font-bold'>location</h3>
            <div className='h-2' />
            <p className='text-xl'>{opportunity.placeId}</p>
          </div> */}
          <div className='h-4' />
          <div>
            <h3 className='text-3xl font-bold'>date</h3>
            <div className='h-2' />
            <p className='text-xl'>{opportunity.startTime.toLocaleDateString('en-US')}</p>
          </div>
          <div className='h-4' />
          <div>
            <h3 className='text-3xl font-bold'>compensation</h3>
            <div className='h-2' />
            <p className='text-xl'>
              {
                !opportunity.isPaid ?
                  <FaMoneyBill
                    color='green'
                    size={20}
                  /> :
                  <FaMoneyBill
                    color='red'
                    size={20}
                  />
              }
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
