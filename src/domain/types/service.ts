import { DocumentData, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export type Service = {
  id: string;
  userId: string;
  title: string;
  description: string;
  rate: number;
  rateType: "hourly" | "fixed";
  count: number;
  deleted: boolean;
};

export const serviceConverter = {
  toFirestore(service: Service): DocumentData {
    return {
      ...service,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Service {
    const data = snapshot.data(options);
    return {
      id: data.id,
      userId: data.userId,
      title: data.title,
      description: data.description,
      rate: data.rate,
      rateType: data.rateType,
      count: data.count,
      deleted: data.deleted,
    };
  },
};
