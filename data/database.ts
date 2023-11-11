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
import { Option, None, Some } from '@sniptt/monads';
import { Avatar, avatarConverter } from '@/domain/models/avatar';
import { AlbumName, albumNameConverter } from '@/domain/models/album_name';
import { LabelApplication, labelApplicationConverter } from '@/domain/models/label_application';
import { AiModel } from '@/domain/models/ai_model';
import { db } from '@/utils/firebase';
import { UserModel } from '@/domain/models/user_model';
import { Booking, bookingConverter } from '@/domain/models/booking';
import { PerformerReview, reviewConverter } from '@/domain/models/review';


export async function getUserByUsername(username: string): Promise<Option<UserModel>> {
  const usersCollection = collection(db, 'users');
  const q = query(
    usersCollection,
    where('username', '==', username),
    limit(1),
  );

  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    console.log('No user found!');
    return None;
  }

  const user = querySnapshot.docs[0].data() as UserModel;
  return Some(user);
}
export async function getLatestBookingByRequestee(userId: string): Promise<Option<Booking>> {
  const bookingsCollection = collection(db, 'bookings');
  const querySnapshot = query(
    bookingsCollection,
    where('requesteeId', '==', userId),
    orderBy('timestamp', 'desc'),
    limit(1),
  ).withConverter(bookingConverter);
  const queryDocs = await getDocs(querySnapshot);

  if (queryDocs.empty) {
    console.log('No booking found!');
    return None;
  }

  const booking = queryDocs.docs[0].data();
  return Some(booking);
}

export async function getLatestPerformerReviewByPerformerId(userId: string): Promise<Option<PerformerReview>> {
  const reviewsCollection = collection(db, `reviews/${userId}/performerReviews`);
  const querySnapshot = query(
    reviewsCollection,
    orderBy('timestamp', 'desc'),
    limit(1),
  ).withConverter(reviewConverter);

  const queryDocs = await getDocs(querySnapshot);

  if (queryDocs.empty) {
    console.log('No review found!');
    return None;
  }

  const review = queryDocs.docs[0].data();
  return Some(review);
}

export async function createAvatar(avatar: Avatar): Promise<string> {
  const docRef = doc(
    db,
    `/avatars/${avatar.userId}/userAvatars/${avatar.id}`,
  ).withConverter(avatarConverter);
  await setDoc(docRef, avatar);

  return docRef.id;
}
export async function getAvatar({ userId, id }: {
    userId: string,
    id: string,
  }): Promise<Option<Avatar>> {
  const docRef = doc(db, `/avatars/${userId}/userAvatars/${id}`).withConverter(avatarConverter);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    return None;
  }

  const avatar = docSnap.data();
  console.log(JSON.stringify(avatar));

  return Some(avatar);
}
export async function getAvatarsByUser({ userId }: {
    userId: string,
  }): Promise<Avatar[]> {
  const avatarsCollection = collection(db, `/avatars/${userId}/userAvatars`).withConverter(avatarConverter);
  const avatarDocs = await getDocs(avatarsCollection);
  return avatarDocs.docs.map((doc) => doc.data());
}
export async function createGeneratedAlbumName(albumName: AlbumName): Promise<string> {
  const docRef = doc(
    db,
    `/albumNames/${albumName.userId}/userAlbumNames/${albumName.id}`,
  ).withConverter(albumNameConverter);
  await setDoc(docRef, albumName);

  return docRef.id;
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
    success_url: `${window.location.origin}/tmp_home`,
    cancel_url: window.location.origin,
    allow_promotion_codes: true,
    mode: 'subscription',
  });

  // Wait for the CheckoutSession to get attached by the extension
  onSnapshot(docRef, (snap) => {
    const { error, url } = snap.data();
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
export async function getActiveProducts(): Promise<{ product: any, prices: any }[]> {
  const productsQuery = query(collection(db, 'products'), where('active', '==', true));
  const products = await getDocs(productsQuery);

  return await Promise.all(products.docs.map(async (product) => {
    const priceRef = collection(db, `products/${product.id}/prices`);
    const pricesQuery = query(priceRef, where('active', '==', true), orderBy('unit_amount'));
    const prices = await getDocs(pricesQuery);

    return {
      product: {
        id: product.id,
        ...(product.data()),
      },
      prices: prices.docs.map((price) => {
        return {
          id: price.id,
          ...(price.data()),
        };
      }),
    };
  })
  );
}
export async function addCustomerSubscriptionListener(userId, callback) {
  const subscriptionsRef = collection(db, `customers/${userId}/subscriptions`);
  const queryRef = query(subscriptionsRef, where('status', 'in', ['trialing', 'active']));
  return onSnapshot(queryRef, callback);
}
export async function createNewApplicationResponse({ userId, labelApplication }: {
    userId: string;
    labelApplication: LabelApplication;
  }) {
  const docRef = doc(db, `label_applications/${labelApplication.id}`);
  await setDoc(docRef,
    {
      userId,
      ...labelApplicationConverter.toFirestore(labelApplication),
    },
  );

  return docRef.id;
}
export async function getLatestImageModel(userId: string): Promise<Option<AiModel>> {
  const aiModelsCollection = collection(db, 'aiModels');
  const userDoc = doc(aiModelsCollection, userId);
  const imageModelsSubCollection = collection(userDoc, 'imageModels');

  const q = query(imageModelsSubCollection, orderBy('timestamp', 'desc'), limit(1));

  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    console.log('No modelId found for user!');
    return None;
  }

  const imageModel = querySnapshot.docs[0].data() as AiModel;
  return Some(imageModel);
}

