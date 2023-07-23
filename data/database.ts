import { doc, getDoc, setDoc } from "firebase/firestore";
import { Option, None, Some } from "@sniptt/monads";
import { Avatar, avatarConverter } from "../domain/models/avatar";
import firebase from "../utils/firebase";

export type Database = {
    createAvatar: (avatar: Avatar) => Promise<string>;
    getAvatar: ({userId, id}: {
        userId: string;
        id: string;
    }) => Promise<Option<Avatar>>;
}

const db = firebase.db;
const FirestoreDB: Database = {
    /**
     * Create new avatar image model
     * @param avatar
     */
    createAvatar: async (avatar: Avatar): Promise<string> => {
        const docRef = doc(db, `avatars/${avatar.userId}/userAvatars/${avatar.id}`);
        await setDoc(docRef, avatarConverter.toFirestore(avatar));

        return docRef.id;

    },

    getAvatar: async ({ userId, id }: {
        userId: string,
        id: string,
    }): Promise<Option<Avatar>> => {
        const docRef = doc(db, `avatars/${userId}/userAvatars/${id}`).withConverter(avatarConverter);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            return None;
        }

        const avatar = docSnap.data();
        console.log(JSON.stringify(avatar));

        return Some(avatar);
    },

}

export default FirestoreDB;