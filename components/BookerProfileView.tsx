'use client';

import { Fab } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Opportunity } from '@/domain/models/opportunity';
import { Review } from '@/domain/models/review';
import { Booking } from '@/domain/models/booking';
import {
  UserModel,
  audienceSize,
  profileImage,
  reviewCount,
} from '@/domain/models/user_model';
import { getBookingsByRequester, getLatestBookerReviewByBookerId, getLatestBookingByRequester, getUserByUsername, getUserOpportunities } from '@/data/database';
import InstagramButton from '@/components/profile/InstagramButton';
import TwitterButton from '@/components/profile/TwitterButton';
import TiktokButton from '@/components/profile/TiktokButton';
import SpotifyButton from '@/components/profile/SpotifyButton';
import BookerBookingHistoryPreview from '@/components/profile/BookerBookingHistoryPreview';
import OpportunitiesSlider from '@/components/profile/OpportunitiesSlider';
import ReviewTile from './profile/ReviewTile';

export default function BookerProfileView({ username }: { username: string }) {
  const router = useRouter();
  const [user, setUser] = useState<UserModel | null>(null);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
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
    const fetchOpportunities = async () => {
      if (user === null) {
        return;
      }

      const opportunities = await getUserOpportunities(user.id);
      setOpportunities(opportunities);
    };

    fetchOpportunities();

    const fetchBooking = async () => {
      if (user === null) {
        return;
      }

      // fetch latest booking
      const bookings = await getBookingsByRequester(user.id);
      setBookings(bookings);
    };
    fetchBooking();

    const fetchLatestReview = async () => {
      if (user === null) {
        return;
      }

      // get latest review
      const latestReview = await getLatestBookerReviewByBookerId(user.id);
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

  const imageSrc = profileImage(user);
  const audience = audienceSize(user);

  return (
    <>
      <div className="fixed right-8 bottom-8">
        <Link href="/download">
          <Fab color="primary" aria-label="add" variant="extended">
            get more info from the app
          </Fab>
        </Link>
      </div>
      <div className="relative h-[256px] w-screen overflow-hidden">
        <Image
          src={imageSrc}
          alt={`${user.artistName} profile picture`}
          objectFit="cover"
          objectPosition="center"
          fill
        />
      </div>
      <div className="md:flex md:justify-center">
        <div className="py-4 px-6 md:w-2/3">
          <div>
            <h1 className="text-4xl font-extrabold">{user.artistName}</h1>
            <p className="text-sm text-gray-500">@{user.username}</p>
          </div>
          <div className="h-4" />
          {/* <div>
            <h2 className='text-2xl font-bold'>Pricings</h2>
            <p>the prices</p>
          </div>
          <div className='h-4' /> */}
          <div className="flex flex-row items-center justify-around">
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-2xl font-bold">
                {audience.toLocaleString()}
              </h3>
              <p className="text-font text-xs text-gray-500">audience</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-2xl font-bold">{reviewCount(user) ?? 0}</h3>
              <p className="text-font text-xs text-gray-500">reviews</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-2xl font-bold">
                {user.bookerInfo?.rating ?
                  `${user.bookerInfo?.rating}/5` :
                  'N/A'}
              </h3>
              <p className="text-sm text-gray-400">rating</p>
            </div>
          </div>
          <div className="h-4" />
          <div className="flex flex-row items-center justify-around">
            {user.socialFollowing.instagramHandle && (
              <InstagramButton
                instagramHandle={user.socialFollowing.instagramHandle}
              />
            )}
            {user.socialFollowing.twitterHandle && (
              <TwitterButton
                twitterHandle={user.socialFollowing.twitterHandle}
              />
            )}
            {user.socialFollowing.tiktokHandle && (
              <TiktokButton tiktokHandle={user.socialFollowing.tiktokHandle} />
            )}
            {user.performerInfo?.spotifyId && (
              <SpotifyButton spotifyId={user.performerInfo?.spotifyId} />
            )}
          </div>
          <div className="h-8" />
          {opportunities.length > 0 && (
            <div>
              <div className="flex flex-row items-center">
                <h2 className="text-2xl font-bold">
                  Performance Opportunities
                </h2>
              </div>
              <div className="h-2" />
              <OpportunitiesSlider opportunities={opportunities} />
            </div>
          )}
          <div className="h-8" />
          {bookings.length !== 0 && (
            <div>
              <div className="flex flex-row items-center">
                <h2 className="text-2xl font-bold">Booking History</h2>
                <div className="w-2" />
                <Link
                  href={`/b/history/${user.id}`}
                  className="text-sm text-blue-500"
                >
                see all
                </Link>
              </div>
              <div className="h-2" />
              <BookerBookingHistoryPreview user={user} bookings={bookings} />
            </div>
          )}
          <div className="h-8" />
          {latestReview && (
            <div>
              <div className="flex flex-row items-center">
                <h2 className="text-2xl font-bold">Reviews</h2>
                <div className="w-2" />
                <Link
                  href={`/b/reviews/${user.id}`}
                  className="text-sm text-blue-500"
                >
                see all
                </Link>
              </div>
              <div className="h-2" />
              <ReviewTile review={latestReview} />
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold">More Info</h2>
            <div className="h-2" />
            <p>{user.bio}</p>
          </div>
        </div>
      </div>
    </>
  );
}
