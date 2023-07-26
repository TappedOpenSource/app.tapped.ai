import { DocumentSnapshot, Timestamp } from "firebase/firestore";
import { Option, Some, None } from "@sniptt/monads";

export type Avatar = {
    id: string;
    userId: string;
    generatorId: string;
    prompt: string;
    status: AvatarStatus;
    url: Option<string>;
    errorMsg: Option<string>;
    timestamp: Date;
};

export type AvatarStatus = "initial" | "generating" | "complete" | "error"

export const avatarConverter = {
  toFirestore: (avatar: Avatar) => {
    return {
      ...avatar,
      url: avatar.url.isSome() ? avatar.url.unwrap() : null,
      errorMsg: avatar.errorMsg.isSome() ? avatar.errorMsg.unwrap() : null,
      timestamp: Timestamp.fromDate(avatar.timestamp),
    };
  },
  fromFirestore: (snapshot: DocumentSnapshot, options): Avatar => {
    const data = snapshot.data(options);
    return {
      id: data.id,
      userId: data.userId,
      generatorId: data.generatorId,
      prompt: data.prompt,
      status: data.status,
      url: data.url ? Some(data.url) : None,
      errorMsg: data.errorMsg ? Some(data.errorMsg) : None,
      timestamp: data.timestamp.toDate(),
    };
  },
};
