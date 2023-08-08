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
  Unsubscribe,
  QuerySnapshot,
  orderBy,
} from 'firebase/firestore';
import { Option, None, Some } from '@sniptt/monads';
import { Avatar, avatarConverter } from '../domain/models/avatar';
import { BrandGenerator, generatorConverter } from '../domain/models/brand_generator';
import firebase from '../utils/firebase';
import { AlbumName } from '../domain/models/album_name';

export type Database = {
  createGenerator: (generator: BrandGenerator) => Promise<string>;
  createGeneratedAvatar: (avatar: Avatar) => Promise<string>
  getGeneratedAvatar: ({ generatorId, id }: {
    id: string;
    generatorId: string;
  }) => Promise<Option<Avatar>>;
  createGeneratedAlbumName: (albumName: AlbumName) => Promise<string>;
  createCheckoutSession: ({ userId, priceId }: {
    userId: string;
    priceId: string;
  }) => Promise<void>;
  getActiveProducts: () => Promise<{ product: any, prices: any }[]>;
  addCustomerSubscriptionListener: (
    userId: string,
    listener: (snapshot: QuerySnapshot,
    ) => void) => Promise<Unsubscribe>;
}

const db = firebase.db;
const FirestoreDB: Database = {
  createGenerator: async (generator: BrandGenerator): Promise<string> => {
    const docRef = doc(db, `generators/${generator.id}]`);
    await setDoc(docRef, generatorConverter.toFirestore(generator));

    return docRef.id;
  },
  createGeneratedAvatar: async (avatar: Avatar): Promise<string> => {
    const docRef = doc(db, `generators/${avatar.generatorId}/avatars/${avatar.id}`);
    await setDoc(docRef, avatarConverter.toFirestore(avatar));

    return docRef.id;
  },
  getGeneratedAvatar: async ({ generatorId, id }: {
    generatorId: string,
    id: string,
  }): Promise<Option<Avatar>> => {
    const docRef = doc(db, `generators/${generatorId}/avatars/${id}`).withConverter(avatarConverter);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return None;
    }

    const avatar = docSnap.data();
    console.log(JSON.stringify(avatar));

    return Some(avatar);
  },
  createGeneratedAlbumName: async (albumName: AlbumName): Promise<string> => {
    const docRef = doc(db, `generators/${albumName.generatorId}/albumNames/${albumName.id}`);
    await setDoc(docRef, albumName);

    return docRef.id;
  },
  createCheckoutSession: async ({
    userId,
    priceId,
  }: {
    userId: string;
    priceId: string;
  }): Promise<void> => {
    const sessionsRef = collection(db, `customers/${userId}/checkout_sessions`);
    const docRef = await addDoc(sessionsRef, {
      price: priceId,
      success_url: `${window.location.origin}/branding`,
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
  },
  getActiveProducts: async (): Promise<{ product: any, prices: any }[]> => {
    const productsQuery = query(collection(db, 'products'), where('active', '==', true));
    const products = await getDocs(productsQuery);

    const productWithPrice = await Promise.all(products.docs.map(async (product) => {
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

    return productWithPrice;
  },
  addCustomerSubscriptionListener: async (userId, callback) => {
    const subscriptionsRef = collection(db, `customers/${userId}/subscriptions`);
    const queryRef = query(subscriptionsRef, where('status', 'in', ['trialing', 'active']));
    return onSnapshot(queryRef, callback);
  },
};

export default FirestoreDB;
