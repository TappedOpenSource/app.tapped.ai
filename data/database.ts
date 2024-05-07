import {
  addDoc,
  collection,
  doc,
  query,
  getDoc,
  getDocs,
  setDoc,
  where,
  onSnapshot,
  orderBy,
  limit,
} from 'firebase/firestore';
import {
  LabelApplication,
  labelApplicationConverter,
} from '@/domain/types/label_application';
import { db } from '@/utils/firebase';
import type { UserModel } from '@/domain/types/user_model';
import type { Option } from '@/domain/types/option';
import { type Booking, bookingConverter } from '@/domain/types/booking';
import { type Review, reviewConverter } from '@/domain/types/review';
import { type Service, serviceConverter } from '@/domain/types/service';
import { type Opportunity, opportunityConverter } from '@/domain/types/opportunity';

export async function getUserById(userId: string): Promise<Option<UserModel>> {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    console.log('user doesnt exist');
    return null;
  }

  return docSnap.data() as UserModel;
}

export async function getUserByUsername(
  username: string
): Promise<Option<UserModel>> {
  const usersCollection = collection(db, 'users');
  const q = query(usersCollection, where('username', '==', username), limit(1));

  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    console.log('No user found!');
    return null;
  }

  return querySnapshot.docs[0].data() as UserModel;
}
export async function getLatestBookingByRequestee(
  userId: string
): Promise<Option<Booking>> {
  const bookingsCollection = collection(db, 'bookings');
  const querySnapshot = query(
    bookingsCollection,
    where('requesteeId', '==', userId),
    where('status', '==', 'confirmed'),
    orderBy('timestamp', 'desc'),
    limit(1)
  ).withConverter(bookingConverter);
  const queryDocs = await getDocs(querySnapshot);

  if (queryDocs.empty) {
    console.log('No booking found!');
    return null;
  }

  return queryDocs.docs[0].data();
}

export async function getLatestBookingByRequester(
  userId: string
): Promise<Option<Booking>> {
  const bookingsCollection = collection(db, 'bookings');
  const querySnapshot = query(
    bookingsCollection,
    where('requesterId', '==', userId),
    where('status', '==', 'confirmed'),
    orderBy('timestamp', 'desc'),
    limit(1)
  ).withConverter(bookingConverter);
  const queryDocs = await getDocs(querySnapshot);

  if (queryDocs.empty) {
    console.log('No booking found!');
    return null;
  }

  return queryDocs.docs[0].data();
}

export async function getLatestPerformerReviewByPerformerId(
  userId: string
): Promise<Option<Review>> {
  const reviewsCollection = collection(
    db,
    `reviews/${userId}/performerReviews`
  );
  const querySnapshot = query(
    reviewsCollection,
    orderBy('timestamp', 'desc'),
    limit(1)
  ).withConverter(reviewConverter);

  const queryDocs = await getDocs(querySnapshot);

  if (queryDocs.empty) {
    console.log('No review found!');
    return null;
  }

  return queryDocs.docs[0].data();
}

export async function getLatestBookerReviewByBookerId(
  userId: string
): Promise<Option<Review>> {
  const reviewsCollection = collection(db, `reviews/${userId}/bookerReviews`);
  const querySnapshot = query(
    reviewsCollection,
    orderBy('timestamp', 'desc'),
    limit(1)
  ).withConverter(reviewConverter);

  const queryDocs = await getDocs(querySnapshot);

  if (queryDocs.empty) {
    console.log('No review found!');
    return null;
  }

  return queryDocs.docs[0].data();
}

export async function getUserOpportunities(
  userId: string
): Promise<Opportunity[]> {
  const opportunitiesCollection = collection(db, 'opportunities');
  const querySnapshot = query(
    opportunitiesCollection,
    orderBy('startTime', 'desc'),
    where('startTime', '>', new Date()),
    where('deleted', '==', false),
    where('userId', '==', userId)
  ).withConverter(opportunityConverter);

  const queryDocs = await getDocs(querySnapshot);

  if (queryDocs.empty) {
    return [];
  }

  return queryDocs.docs.map((doc) => doc.data());
}

export async function getOpportunityById(opportunityId: string) {
  const docRef = doc(db, 'opportunities', opportunityId).withConverter(
    opportunityConverter
  );
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    console.log('No such document!');
    return null;
  }

  return docSnap.data() as Opportunity;
}

export async function getFeaturedOpportunities(): Promise<Opportunity[]> {
  const opportunitiesRef = collection(db, 'opportunities');
  const tccOpsQuery = query(
    opportunitiesRef,
    where('userId', '==', 'yfjw9oCMwPVzAxgENxGxecPcNym1'),
    where('deleted', '==', false),
    where('startTime', '>', new Date()),
    orderBy('startTime', 'desc'),
    limit(3),
  ).withConverter(opportunityConverter);
  const tccOpsSnap = await getDocs(tccOpsQuery);
  const tccOps = tccOpsSnap.docs.map((doc) => doc.data());

  const leadersRef = collection(db, 'leaderboard');
  const leadersSnap = doc(leadersRef, 'leaders');
  const leadersDoc = await getDoc(leadersSnap);
  const { featuredOpportunities } = leadersDoc.data() as {
    featuredOpportunities: string[];
  };
  const leaderOps = await Promise.all(
    featuredOpportunities
      .map(getOpportunityById)
      .filter(async (op) => (await op) !== null)
  ) as Opportunity[];

  return [...tccOps, ...leaderOps];
}

export async function getServiceById({
  userId,
  serviceId,
}: {
  userId: string;
  serviceId: string;
}): Promise<Option<Service>> {
  const docRef = doc(
    db,
    `/services/${userId}/userServices/${serviceId}`
  ).withConverter(serviceConverter);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    return null;
  }

  return docSnap.data();
}

export async function getReviewsByPerformerId(
  userId: string
): Promise<Review[]> {
  const reviewsCollection = collection(
    db,
    `reviews/${userId}/performerReviews`
  );
  const querySnapshot = query(
    reviewsCollection,
    orderBy('timestamp', 'desc')
  ).withConverter(reviewConverter);

  const queryDocs = await getDocs(querySnapshot);

  return queryDocs.docs.map((doc) => doc.data());
}

export async function getReviewsByBookerId(userId: string): Promise<Review[]> {
  const reviewsCollection = collection(db, `reviews/${userId}/bookerReviews`);
  const querySnapshot = query(
    reviewsCollection,
    orderBy('timestamp', 'desc')
  ).withConverter(reviewConverter);

  const queryDocs = await getDocs(querySnapshot);

  return queryDocs.docs.map((doc) => doc.data());
}

export async function getBookingsByRequestee(
  userId: string
): Promise<Booking[]> {
  const bookingsCollection = collection(db, 'bookings');
  const querySnapshot = query(
    bookingsCollection,
    where('requesteeId', '==', userId),
    where('status', '==', 'confirmed'),
    orderBy('timestamp', 'desc')
  ).withConverter(bookingConverter);
  const queryDocs = await getDocs(querySnapshot);

  return queryDocs.docs.map((doc) => doc.data());
}

export async function getBookingsByRequester(
  userId: string
): Promise<Booking[]> {
  const bookingsCollection = collection(db, 'bookings');
  const querySnapshot = query(
    bookingsCollection,
    where('requesterId', '==', userId),
    where('status', '==', 'confirmed'),
    orderBy('timestamp', 'desc')
  ).withConverter(bookingConverter);
  const queryDocs = await getDocs(querySnapshot);

  return queryDocs.docs.map((doc) => doc.data());
}

export async function getBookingById(
  bookingId: string
): Promise<Option<Booking>> {
  const docRef = doc(db, 'bookings', bookingId).withConverter(bookingConverter);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    console.log('No such document!');
    return null;
  }

  return docSnap.data();
}

export async function createCheckoutSession({
  userId,
  priceId,
}: {
  userId: string;
  priceId: string;
}): Promise<void> {
  const sessionsRef = collection(db, `customers/${userId}/checkout_sessions`);
  const docRef = await addDoc(sessionsRef, {
    price: priceId,
    success_url: `${window.location.origin}/signup_complete`,
    cancel_url: window.location.origin,
    allow_promotion_codes: true,
    mode: 'subscription',
  });

  // Wait for the CheckoutSession to get attached by the extension
  onSnapshot(docRef, (snap) => {
    const { error, url } = snap.data() as { error: Error; url: string };
    if (error) {
      // Show an error to your customer and then inspect your function logs.
      alert(`An error occured: ${error.message}`);
      document.querySelectorAll('button').forEach((b) => (b.disabled = false));
    }
    if (url) {
      window.location.assign(url);
    }
  });
}
export async function getActiveProducts(): Promise<
  { product: any; prices: any }[]
  > {
  const productsQuery = query(
    collection(db, 'products'),
    where('active', '==', true)
  );
  const products = await getDocs(productsQuery);

  return await Promise.all(
    products.docs.map(async (product) => {
      const priceRef = collection(db, `products/${product.id}/prices`);
      const pricesQuery = query(
        priceRef,
        where('active', '==', true),
        orderBy('unit_amount')
      );
      const prices = await getDocs(pricesQuery);

      return {
        product: {
          id: product.id,
          ...product.data(),
        },
        prices: prices.docs.map((price) => {
          return {
            id: price.id,
            ...price.data(),
          };
        }),
      };
    })
  );
}
export async function addCustomerSubscriptionListener(userId, callback) {
  const subscriptionsRef = collection(db, `customers/${userId}/subscriptions`);
  const queryRef = query(
    subscriptionsRef,
    where('status', 'in', ['trialing', 'active'])
  );
  return onSnapshot(queryRef, callback);
}
export async function createNewApplicationResponse({
  userId,
  labelApplication,
}: {
  userId: string;
  labelApplication: LabelApplication;
}) {
  const docRef = doc(db, `label_applications/${labelApplication.id}`);
  await setDoc(docRef, {
    userId,
    ...labelApplicationConverter.toFirestore(labelApplication),
  });

  return docRef.id;
}
