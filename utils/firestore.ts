
import { Option, None, Some } from "@sniptt/monads";
import { Avatar, avatarConverter } from "../domain/models/avatar";
import firebase from "./firebase";
import { doc, collection, addDoc, getDoc } from "firebase/firestore";


const db = firebase.db;
const avatarsRef = collection(db, "avatars");

/**
 * Create new avatar image model
 * @param avatar
 */
export const createAvatar = async ({ avatar }: {
    avatar: Avatar,
}): Promise<string> => {
    const docRef = await addDoc(avatarsRef, {
        ...avatar,
    });

    return docRef.id;
}

export const getAvatar = async (id: string): Promise<Option<Avatar>> => {
    const docRef = doc(db, "avatars", id).withConverter(avatarConverter);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
        return None;
    }

    const avatar = docSnap.data();
    console.log(avatar.toString());

    return Some(avatar);
};