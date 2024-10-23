"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Booking, bookingImage } from "@/domain/types/booking";
import { UserModel } from "@/domain/types/user_model";
import { getUserById } from "@/data/database";
// import { Service } from "@/domain/types/service";
import { useRouter } from "next/navigation";

export default function BookingTile({ booking }: { booking: Booking }) {
  const router = useRouter();
  const [booker, setBooker] = useState<UserModel | null>(null);
  const [performer, setPerformer] = useState<UserModel | null>(null);
  // const [service, setService] = useState<Service | null>(null); // TODO: [service, setService

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

  // useEffect(() => {
  //   const fetchService = async () => {
  //     if (booking === null) {
  //       return;
  //     }

  //     if (booking.serviceId === undefined || booking.serviceId === null) {
  //       return;
  //     }

  //     const bookingService = await getServiceById({
  //       userId: user.id,
  //       serviceId: booking.serviceId,
  //     });

  //     setService(bookingService ?? null);
  //   };
  //   fetchService();
  // }, [booking, user]);

  const imageSrc = bookingImage(booking, null);

  return (
    <>
      <button
        className="m-0 p-0"
        onClick={() => {
          router.push(`/booking/${booking.id}`);
        }}
      >
        <div className="flex flex-row">
          <div className="flex items-center justify-center">
            <Image src={imageSrc} alt="booking image" width={50} height={50} style={{ objectFit: "cover" }} />
          </div>
          <div className="w-3" />
          <div>
            <div className="flex flex-row items-center">
              <p className="line-clamp-1 text-ellipsis text-start font-bold">{booking.name ?? "live performance"}</p>
              <div className="w-3" />
              <p className="line-clamp-1 text-xs font-thin text-gray-300">{booking.timestamp.toDateString()}</p>
            </div>
            <p className="break-word text-start">
              {booker?.artistName ?? "someone"} booked {performer?.artistName ?? "someone"}
              {" for a show"}
            </p>
          </div>
        </div>
      </button>
    </>
  );
}
