import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Option, None, Some } from '@sniptt/monads';
import { Avatar, avatarConverter } from '../domain/models/avatar';
import { BrandGenerator, generatorConverter } from '../domain/models/brand_generator';
import firebase from '../utils/firebase';

export type Database = {
    createGenerator: (generator: BrandGenerator) => Promise<string>;
    createGeneratedAvatar: (avatar: Avatar) => Promise<string>
    getGeneratedAvatar: ({ generatorId, id }: {
      id: string;
      generatorId: string;
    }) => Promise<Option<Avatar>>;
    createdGeneratedAlbumName: (bio: GeneratedAlbumName) => Promise<string>;
}

const db = firebase.db;
const FirestoreDB: Database = {
  createGeneratedAvatar: async (avatar: Avatar): Promise<string> => {
    const docRef = doc(db, `avatars/${avatar.generatorId}/generatedAvatars/${avatar.id}`);
    await setDoc(docRef, avatarConverter.toFirestore(avatar));

    return docRef.id;
  },
  getGeneratedAvatar: async ({ generatorId, id }: {
        generatorId: string,
        id: string,
    }): Promise<Option<Avatar>> => {
    const docRef = doc(db, `avatars/${generatorId}/generatedAvatars/${id}`).withConverter(avatarConverter);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return None;
    }

    const avatar = docSnap.data();
    console.log(JSON.stringify(avatar));

    return Some(avatar);
  },

  createGenerator: async (generator: BrandGenerator): Promise<string> => {
    const docRef = doc(db, `generators/${generator.userId}/userGenerators/${generator.id}]`);
    await setDoc(docRef, generatorConverter.toFirestore(generator));

    return docRef.id;
  },
};

export default FirestoreDB;
