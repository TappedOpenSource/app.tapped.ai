import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Booking } from '@/domain/models/booking';
import { UserModel, profileImage } from '@/domain/models/user_model';
import { getServiceById, getUserById } from '@/data/database';
import { Service } from '@/domain/models/service';
import { None } from '@sniptt/monads';

export default function BookingCard({ booking, user }: {
    booking: Booking;
    user: UserModel;
 }) {
  const [booker, setBooker] = useState<UserModel | null>(null);
  const [performer, setPerformer] = useState<UserModel | null>(null);
  const [service, setService] = useState<Service | null>(null); // TODO: [service, setService

  useEffect(() => {
    const fetchUsers = async () => {
      if (booking === null) {
        return;
      }

      const requesterId = booking.requesterId;
      const booker = await (() => {
        if (requesterId === undefined || requesterId === null) {
          return None;
        }

        return getUserById(requesterId);
      })();

      const performer = await getUserById(booking.requesteeId);
      booker.match({
        some: (booker) => {
          setBooker(booker);
        },
        none: () => {
          console.log('booker not found');
        },
      });
      performer.match({
        some: (performer) => {
          setPerformer(performer);
        },
        none: () => {
          console.log('former not found');
        },
      });
    };
    fetchUsers();
  }, [booking]);

  useEffect(() => {
    const fetchService = async () => {
      if (booking === null) {
        return;
      }

      if (booking.serviceId.isNone()) {
        return;
      }

      const bookingService = await getServiceById({
        userId: user.id,
        serviceId: booking.serviceId.unwrap(),
      });

      bookingService.match({
        some: (service) => {
          setService(service);
        },
        none: () => {
          console.log('service not found');
        },
      });
    };
    fetchService();
  }, [booking, user]);

  const bookerImageSrc = booker !== null ? profileImage(booker) : '/images/default_avatar.png';
  const startTimeStr = booking.startTime.toDateString();

  return (
    <>
      <div>
        <div>
          <Image
            src={bookerImageSrc}
            alt={'booking image'}
            width={150}
            height={150}
            className='rounded-lg'
          />
        </div>
        <div className='w-6' />
        <p className='font-bold'>Performer</p>
        <div className='w-3' />
        <div>
          <p className='text-xs font-thin text-gray-300'>{startTimeStr}</p>
        </div>
      </div>
    </>
  );
}
