'use client';

import type { Review } from '@/domain/models/review';
import type { Booking } from '@/domain/models/booking';
import { Fab } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UserModel, audienceSize, profileImage, reviewCount } from '@/domain/models/user_model';
import PerformerBookingHistoryPreview from '@/components/profile/PerformerBookingHistoryPreview';
import {
  getBookingsByRequestee,
  getUserByUsername,
  getLatestPerformerReviewByPerformerId,
} from '@/data/database';
import InstagramButton from '@/components/profile/InstagramButton';
import TwitterButton from '@/components/profile/TwitterButton';
import TiktokButton from '@/components/profile/TiktokButton';
import SpotifyButton from '@/components/profile/SpotifyButton';
import ReviewTile from '@/components/profile/ReviewTile';
import Nav from './landing/Nav';

export default function PerformerProfileView({ username }: { username: string }) {
  const router = useRouter();
  const [user, setUser] = useState<UserModel | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [latestReview, setLatestReview] = useState<Review | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (typeof username !== 'string') {
        return;
      }

      // get user by username
      const user = await getUserByUsername(username);
      user.match({
        some: (user) => {
          // set user
          setUser(user);
        },
        none: () => {
          console.log('user not found');
          router.push('/404');
        },
      });
    };
    fetchUser();
  }, [router, username]);

  useEffect(() => {
    const fetchBooking = async () => {
      if (user === null) {
        return;
      }

      // fetch latest booking
      const latestBookings = await getBookingsByRequestee(user.id);
      setBookings(latestBookings);
    };
    fetchBooking();

    const fetchLatestReview = async () => {
      if (user === null) {
        return;
      }

      // get latest review
      const latestReview = await getLatestPerformerReviewByPerformerId(user.id);
      latestReview.match({
        some: (review) => {
          setLatestReview(review);
        },
        none: () => {
          console.log('no reviews found');
        },
      });
    };
    fetchLatestReview();
  }, [user]);

  if (user === null) {
    return (
      <>
        <div className="flex min-h-screen items-center justify-center">
          <p>fetching {username}... </p>
        </div>
      </>
    );
  }

  if (user === null) {
    return (
      <>
        <div className='min-h-screen flex justify-center items-center'>
          <p>fetching {username}... </p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="fixed right-8 bottom-8">
        <Link href="/download">
          <Fab color="primary" aria-label="add" variant="extended">
            book them on the app
          </Fab>
        </Link>
      </div>
      <Nav />
      <div className='lg:flex lg:justify-center'>
        <BuildHeader user={user} />
        <BuildRows user={user} bookings={bookings} latestReview={latestReview} />
      </div>
    </>
  );
}

function BuildHeader({ user }: { user: UserModel }) {
  const imageSrc = profileImage(user);
  const audience = audienceSize(user);
  return (
    <div className='py-6 lg:py-12 px-6 md:w-1/2 lg:w-[30vw]'>
      <div className='flex flex-row lg:flex-col justify-start items-center'>
        <div className='relative w-[128px] h-[128px] lg:h-[256px] lg:w-[256px] overflow-hidden rounded-full'>
          <Image
            src={imageSrc}
            alt={`${user.artistName} profile picture`}
            fill
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }} />
        </div>
        <div className="w-4 lg:h-6" />
        <div>
          <h1
            className='text-4xl lg:text-4xl font-extrabold'
          >{user.artistName}</h1>
          <p className='text-sm lg:text-xl text-gray-500'>@{user.username}</p>
        </div>
      </div>
      <div className='h-4' />
      <div className='flex flex-row items-center justify-around'>
        <div className='flex flex-col justify-center items-center'>
          <h3 className='text-2xl font-bold'>{audience.toLocaleString()}</h3>
          <p className='text-xs text-font text-gray-500'>audience</p>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <h3 className='text-2xl font-bold'>{reviewCount(user)}</h3>
          <p className='text-xs text-font text-gray-500'>reviews</p>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <h3 className='text-2xl font-bold'>{user.performerInfo?.rating ? `${user.performerInfo?.rating}/5` : 'N/A'}</h3>
          <p className='text-sm text-gray-400'>rating</p>
        </div>
      </div>
      <div className='h-4' />
      <div className='flex flex-row items-center justify-around'>
        {user.socialFollowing.instagramHandle && <InstagramButton instagramHandle={user.socialFollowing.instagramHandle} />}
        {user.socialFollowing.twitterHandle && <TwitterButton twitterHandle={user.socialFollowing.twitterHandle} />}
        {user.socialFollowing.tiktokHandle && <TiktokButton tiktokHandle={user.socialFollowing.tiktokHandle} />}
        {user.performerInfo?.spotifyId && <SpotifyButton spotifyId={user.performerInfo.spotifyId} />}
      </div>
    </div>
  );
}

function BuildRows({ user, bookings, latestReview }: {
  user: UserModel;
  bookings: Booking[];
  latestReview: Review | null;
}) {
  return (
    <div className='lg:w-[70vw] py-6 lg:py-12 px-3'>
      <div className='h-4' />
      {bookings.length !== 0 && (
        <div>
          <div className='flex flex-row items-center'>
            <h2 className='text-2xl font-bold'>Booking History</h2>
            <div className='w-2' />
            <Link
              href={`/history/${user.id}`}
              className='text-sm text-blue-500'
            >
        see all
            </Link>
          </div>
          <div className="h-2" />
          <PerformerBookingHistoryPreview user={user} bookings={bookings} />
        </div>
      )}
      <div className='h-8' />
      {latestReview && (
        <div>
          <div className='flex flex-row items-center'>
            <h2 className='text-2xl font-bold'>Reviews</h2>
            <div className='w-2' />
            <Link
              href={`/reviews/${user.id}`}
              className='text-sm text-blue-500'
            >
        see all
            </Link>
          </div>
          <div className="h-2" />
          <ReviewTile review={latestReview} />
        </div>
      )}
      <div className='h-8' />
      <div>
        <h2 className='text-2xl font-bold'>About</h2>
        <div className="h-2" />
        <p>{user.bio}</p>
      </div>
    </div>
  );
}
