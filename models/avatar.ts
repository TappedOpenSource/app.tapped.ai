import { DocumentSnapshot, Timestamp } from "firebase/firestore";

export type Avatar = {
    id: number;
    userId: number;
    prompt: string;
    url: string;
    status: AvatarStatus;
    errorMsg?: string;
    createdAt: Date;
    updatedAt: Date;
};

export type AvatarStatus = "generating" | "uploading" | "complete" | "error"

export const avatarConverter = {
    toFirestore: (avatar: Avatar) => {
        return {
            ...avatar,
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
            url: data.url,
            status: data.status,
            errorMsg: data.errorMsg,
            createdAt: data.createdAt.toDate(),
            updatedAt: data.updatedAt.toDate(),
        };
    }
};
