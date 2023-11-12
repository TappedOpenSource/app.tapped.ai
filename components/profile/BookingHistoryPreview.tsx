import { getLatestBookingByRequestee, getServiceById, getUserById } from '@/data/database';
import { Booking } from '@/domain/models/booking';
import { Service } from '@/domain/models/service';
import { UserModel } from '@/domain/models/user_model';
import { useEffect, useState } from 'react';
import BookIcon from '@mui/icons-material/Book';

export default function BookingHistoryPreview({ user }: { user: UserModel }) {
  const [latestBooking, setLatestBooking] = useState<Booking | null>(null);
  const [service, setService] = useState<Service | null>(null); // TODO: [service, setService
  const [booker, setBooker] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBooking = async () => {
    // fetch latest booking
      const latestBooking = await getLatestBookingByRequestee(user.id);
      latestBooking.match({
        some: (booking) => {
          setLatestBooking(booking);
        },
        none: () => {
          console.log('booking not found');
        },
      });
    };
    fetchBooking().then(() => setLoading(false));
  }, [user]);

  useEffect(() => {
    const fetchBooker = async () => {
      if (latestBooking === null) {
        return;
      }

      const booker = await getUserById(latestBooking.requesterId);
      booker.match({
        some: (booker) => {
          setBooker(booker);
        },
        none: () => {
          console.log('booker not found');
        },
      });
    };
    fetchBooker();
  }, [latestBooking]);

  useEffect(() => {
    const fetchService = async () => {
      if (latestBooking === null) {
        return;
      }

      if (latestBooking.serviceId.isNone()) {
        return;
      }

      const bookingService = await getServiceById({
        userId: user.id,
        serviceId: latestBooking.serviceId.unwrap(),
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
  }, [latestBooking, user]);

  if (loading) {
    return (
      <p>fetching latest booking...</p>
    );
  }

  if (latestBooking === null) {
    return (
      <p>no booking history</p>
    );
  }

  return (
    <>
      <div className='flex flex-row'>
        <div className='flex justify-center items-center'>
          <BookIcon />
        </div>
        <div className='w-3' />
        <div>
          <div className='flex flex-row items-center'>
            <p className='font-bold'>Performer</p>
            <div className='w-3' />
            <p className='text-xs font-thin text-gray-300'>{latestBooking.timestamp.toDateString()}</p>
          </div>
          <p className='break-word'>
            {booker?.artistName ?? 'someone'}
            {' '}
          booked
            {' '}
            {user.artistName}
            {' for '}
            {service?.title ?? 'a show'}
          </p>
        </div>
      </div>
    </>
  );
}
