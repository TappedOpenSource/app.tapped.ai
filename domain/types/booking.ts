
import {
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from '@firebase/firestore';
import { UserModel } from './user_model';
import { Option } from './option';

export type Booking = {
    id: string;
    serviceId: Option<string>;
    name: string;
    note: string;
    requesterId?: string | null;
    requesteeId: string;
    status: 'pending' | 'confirmed' | 'canceled';
    rate: number;
    placeId: Option<string>;
    geohash: Option<string>;
    lat: Option<number>;
    lng: Option<number>;
    startTime: Date;
    endTime: Date;
    timestamp: Date;
    flierUrl: Option<string>;
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
      startTime: data.startTime.toDate(),
      endTime: data.endTime.toDate(),
      timestamp: data.timestamp.toDate(),
      flierUrl: data.flierUrl,
    };
  },
};

export const bookingImage = (booking: Booking, user: Option<UserModel>): string => {
  if (booking === null) {
    return defaultImage();
  }

  const flierUrl = booking.flierUrl;
  if (flierUrl !== null && flierUrl !== undefined) {
    return flierUrl;
  }

  const pfp = user?.profilePicture;
  if (pfp === null || pfp === undefined) {
    return defaultImage(user?.id);
  }


  return pfp;
};

const defaultImage = (id: Option<string> = null): string => {
  const defaultImages = [
    '/images/default_images/bob.png',
    '/images/default_images/daftpunk.png',
    '/images/default_images/deadmau5.png',
    '/images/default_images/kanye.png',
    '/images/default_images/skrillex.png',
  ];

  const length = id?.length ?? 0;

  const index = length % defaultImages.length;
  return defaultImages[index];
};
