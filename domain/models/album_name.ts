import { DocumentSnapshot, Timestamp } from 'firebase/firestore';

export type AlbumName = {
    id: string;
    userId: string;
    teamId: string;
    prompt: string;
    text: string;
    timestamp: Date;
};

export const albumNameConverter = {
  toFirestore: (albumName: AlbumName) => {
    return {
      ...albumName,
      timestamp: Timestamp.fromDate(albumName.timestamp),
    };
  },
  fromFirestore: (snapshot: DocumentSnapshot, options): AlbumName => {
    const data = snapshot.data(options);
    return {
      id: data.id,
      userId: data.userId,
      teamId: data.teamId,
      prompt: data.prompt,
      text: data.text,
      timestamp: data.timestamp.toDate(),
    };
  },
};
