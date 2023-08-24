import { DocumentSnapshot, Timestamp } from 'firebase/firestore';
import { Option, Some, None } from '@sniptt/monads';

export type Avatar = {
    id: string;
    userId: string;
    prompt: string;
    url: Option<string>;
    errorMsg: Option<string>;
    timestamp: Date;
};

export type AvatarStyle = 'Death Note Anime' | 'Power Puff Girls' | 'Vintage';

export const avatarConverter = {
  toFirestore: (avatar: Avatar) => {
    return {
      ...avatar,
      errorMsg: avatar.errorMsg.isSome() ? avatar.errorMsg.unwrap() : null,
      timestamp: Timestamp.fromDate(avatar.timestamp),
    };
  },
  fromFirestore: (snapshot: DocumentSnapshot, options): Avatar => {
    const data = snapshot.data(options);
    return {
      id: data.id,
      userId: data.userId,
      prompt: data.prompt,
      url: data.url,
      errorMsg: data.errorMsg ? Some(data.errorMsg) : None,
      timestamp: data.timestamp.toDate(),
    };
  },
};
