import { doc, getDoc, setDoc } from 'firebase/firestore';
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
};

export default FirestoreDB;
