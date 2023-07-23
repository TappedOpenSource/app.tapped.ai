import { getFunctions, httpsCallable } from "firebase/functions";
import firebase from "../utils/firebase";

export const pollHuggingFaceAvatarModel = async ({ prompt, avatarId }: {
    avatarId: string,
    prompt: string,
}): Promise<void> => {
    const userId = firebase.JOHANNES_USERID;
    const functions = getFunctions();
    const func = httpsCallable<{ 
        prompt: string,
        userId: string,
        avatarId: string,
    }, { 
        result: string 
    }>(functions, "pollHuggingFaceAvatarModel");
    const resp = await func({ prompt, userId, avatarId });
    const { result } = resp.data as { result: string };
    console.log(result);
}