
import {
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from '@firebase/firestore';
import { Option } from '@sniptt/monads';

export type Booking = {
    id: string;
    serviceId: Option<string>;
    name: string;
    note: string;
    requesterId: string;
    requesteeId: string;
    status: 'pending' | 'confirmed' | 'canceled';
    rate: number;
    placeId: Option<string>;
    geohash: Option<string>;
    lat: Option<number>;
    lng: Option<number>;
    startTime: Option<Date>;
    endTime: Option<Date>;
    timestamp: Date;
}

export const bookingConverter = {
  toFirestore: (booking: Booking) => {
    return {
      ...booking,
      timestamp: Timestamp.fromDate(booking.timestamp),
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Booking {
    const data = snapshot.data(options);
    return {
      id: data.id,
      serviceId: data.serviceId,
      name: data.name,
      note: data.note,
      requesterId: data.requesterId,
      requesteeId: data.requesteeId,
      status: data.status,
      rate: data.rate,
      placeId: data.placeId,
      geohash: data.geohash,
      lat: data.lat,
      lng: data.lng,
      startTime: data.startTime,
      endTime: data.endTime,
      timestamp: data.timestamp.toDate(),
    };
  },
};
