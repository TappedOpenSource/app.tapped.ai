import { getFunctions, httpsCallable } from "firebase/functions";
import firebase from "../utils/firebase";

type PollHuggingFaceAvatarModelInput = {
    prompt: string,
    userId: string,
    avatarId: string,
}

type PollHuggingFaceAvatarModelOutput = {
    url: string;
    status: string;
    updatedAt: Date;
}

export const pollHuggingFaceAvatarModel = async ({ prompt, userId, avatarId }: {
    userId: string
    avatarId: string,
    prompt: string,
}): Promise<{
    url: string;
    status: string;
    updatedAt: Date;
}> => {
    const functions = getFunctions();
    const func = httpsCallable<
        PollHuggingFaceAvatarModelInput,
        PollHuggingFaceAvatarModelOutput
    >(functions, "pollHuggingFaceAvatarModel");
    const resp = await func({ prompt, userId, avatarId });
    const { status, url, updatedAt } = resp.data;
    console.log(`status: ${status} url: ${url} updatedAt: ${updatedAt}`);

    return resp.data;
}