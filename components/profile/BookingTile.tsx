import { useState, useEffect } from 'react';
import { Booking } from '@/domain/models/booking';
import { UserModel } from '@/domain/models/user_model';
import BookIcon from '@mui/icons-material/Book';
import { getServiceById, getUserById } from '@/data/database';
import { Service } from '@/domain/models/service';

export default function BookingTile({ booking, user }: {
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

      const booker = await getUserById(booking.requesterId);
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
            <p className='text-xs font-thin text-gray-300'>{booking.timestamp.toDateString()}</p>
          </div>
          <p className='break-word'>
            {booker?.artistName ?? 'someone'}
            {' '}
          booked
            {' '}
            {performer?.artistName ?? 'someone'}
            {' for '}
            {service?.title ?? 'a show'}
          </p>
        </div>
      </div>
    </>
  );
}
