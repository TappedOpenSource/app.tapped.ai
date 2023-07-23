import { DocumentSnapshot, Timestamp } from "firebase/firestore";
import { Option, Some, None } from "@sniptt/monads";

export type Avatar = {
    id: string;
    userId: string;
    prompt: string;
    status: AvatarStatus;
    url: Option<string>;
    errorMsg: Option<string>;
    createdAt: Date;
    updatedAt: Date;
};

export type AvatarStatus = 'initial' | "generating" | "complete" | "error"

export const avatarConverter = {
    toFirestore: (avatar: Avatar) => {
        return {
            ...avatar,
            url: avatar.url.unwrapOr(undefined),
            errorMsg: avatar.errorMsg.unwrapOr(undefined),
            createdAt: Timestamp.fromDate(avatar.createdAt),
            updatedAt: Timestamp.fromDate(avatar.updatedAt),
        };
    },
    fromFirestore: (snapshot: DocumentSnapshot, options): Avatar => {
        const data = snapshot.data(options);
        return {
            id: data.id,
            userId: data.userId,
            prompt: data.prompt,
            status: data.status,
            url: data.url ? Some(data.url) : None,
            errorMsg: data.errorMsg ? Some(data.errorMsg) : None,
            createdAt: data.createdAt.toDate(),
            updatedAt: data.updatedAt.toDate(),
        };
    }
};
