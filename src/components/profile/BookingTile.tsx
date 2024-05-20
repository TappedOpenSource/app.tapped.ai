import Image from "next/image";
import { useState, useEffect } from "react";
import { Booking, bookingImage } from "@/domain/types/booking";
import { UserModel, profileImage } from "@/domain/types/user_model";
import { getServiceById, getUserById } from "@/data/database";
import { Service } from "@/domain/types/service";

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

      const booker = await (() => {
        if (booking.requesterId === undefined || booking.requesterId === null) {
          return null;
        }

        return getUserById(booking.requesterId);
      })();
      setBooker(booker ?? null);
      const performer = await getUserById(booking.requesteeId);
      setPerformer(performer ?? null);
    };
    fetchUsers();
  }, [booking]);

  useEffect(() => {
    const fetchService = async () => {
      if (booking === null) {
        return;
      }

      if (booking.serviceId === undefined || booking.serviceId === null) {
        return;
      }

      const bookingService = await getServiceById({
        userId: user.id,
        serviceId: booking.serviceId,
      });

      setService(bookingService ?? null);
    };
    fetchService();
  }, [booking, user]);

  const imageSrc = bookingImage(booking, null);

  return (
    <>
      <div className='flex flex-row'>
        <div className='flex justify-center items-center'>
          <Image
            src={imageSrc}
            alt='booking image'
            width={50}
            height={50}
            objectFit='cover'
          />
        </div>
        <div className='w-3' />
        <div>
          <div className='flex flex-row items-center'>
            <p className='font-bold'>Performer</p>
            <div className='w-3' />
            <p className='text-xs font-thin text-gray-300'>{booking.timestamp.toDateString()}</p>
          </div>
          <p className='break-word'>
            {booker?.artistName ?? "someone"}
            {" "}
          booked
            {" "}
            {performer?.artistName ?? "someone"}
            {" for "}
            {service?.title ?? "a show"}
          </p>
        </div>
      </div>
    </>
  );
}