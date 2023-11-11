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
  limit,
} from 'firebase/firestore';
import { Option, None, Some } from '@sniptt/monads';
import { Avatar, avatarConverter } from '@/domain/models/avatar';
import { AlbumName, albumNameConverter } from '@/domain/models/album_name';
import { LabelApplication, labelApplicationConverter } from '@/domain/models/label_application';
import { AiModel } from '@/domain/models/ai_model';
import { db } from '@/utils/firebase';
import { UserModel } from '@/domain/models/user_model';

export type Database = {
  getUserByUsername: (username: string) => Promise<Option<UserModel>>;
  createAvatar: (avatar: Avatar) => Promise<string>
  getAvatar: ({ userId, id }: {
    id: string;
    userId: string;
  }) => Promise<Option<Avatar>>;
  getAvatarsByUser: ({ userId }: {
    userId: string;
  }) => Promise<Avatar[]>;
  createGeneratedAlbumName: (albumName: AlbumName) => Promise<string>;
  createCheckoutSession: ({ userId, priceId }: {
    userId: string;
    priceId: string;
  }) => Promise<void>;
  getActiveProducts: () => Promise<{
    product: any,
    prices: any,
  }[]>;
  addCustomerSubscriptionListener: (
    userId: string,
    listener: (snapshot: QuerySnapshot,
    ) => void) => Promise<Unsubscribe>;
  createNewApplicationResponse: ({ userId, labelApplication }: {
    userId: string;
    labelApplication: LabelApplication;
  }) => Promise<string>;
  getLatestImageModel: (userId: string) => Promise<Option<AiModel>>;
}

const FirestoreDB: Database = {
  getUserByUsername: async (username: string): Promise<Option<UserModel>> => {
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
  },
  createAvatar: async (avatar: Avatar): Promise<string> => {
    const docRef = doc(
      db,
      `/avatars/${avatar.userId}/userAvatars/${avatar.id}`,
    ).withConverter(avatarConverter);
    await setDoc(docRef, avatar);

    return docRef.id;
  },
  getAvatar: async ({ userId, id }: {
    userId: string,
    id: string,
  }): Promise<Option<Avatar>> => {
    const docRef = doc(db, `/avatars/${userId}/userAvatars/${id}`).withConverter(avatarConverter);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return None;
    }

    const avatar = docSnap.data();
    console.log(JSON.stringify(avatar));

    return Some(avatar);
  },
  getAvatarsByUser: async ({ userId }: {
    userId: string,
  }): Promise<Avatar[]> => {
    const avatarsCollection = collection(db, `/avatars/${userId}/userAvatars`).withConverter(avatarConverter);
    const avatarDocs = await getDocs(avatarsCollection);
    return avatarDocs.docs.map((doc) => doc.data());
  },
  createGeneratedAlbumName: async (albumName: AlbumName): Promise<string> => {
    const docRef = doc(
      db,
      `/albumNames/${albumName.userId}/userAlbumNames/${albumName.id}`,
    ).withConverter(albumNameConverter);
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
  },
  getActiveProducts: async (): Promise<{ product: any, prices: any }[]> => {
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
  },
  addCustomerSubscriptionListener: async (userId, callback) => {
    const subscriptionsRef = collection(db, `customers/${userId}/subscriptions`);
    const queryRef = query(subscriptionsRef, where('status', 'in', ['trialing', 'active']));
    return onSnapshot(queryRef, callback);
  },
  createNewApplicationResponse: async ({ userId, labelApplication }: {
    userId: string;
    labelApplication: LabelApplication;
  }) => {
    const docRef = doc(db, `label_applications/${labelApplication.id}`);
    await setDoc(docRef,
      {
        userId,
        ...labelApplicationConverter.toFirestore(labelApplication),
      },
    );

    return docRef.id;
  },
  getLatestImageModel: async (userId: string): Promise<Option<AiModel>> => {
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
  },
};

export default FirestoreDB;
