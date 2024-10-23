import { Timestamp } from "firebase/firestore";
import type { Option } from "./option";
import { UserModel } from "./user_model";

export type ContactVenueRequest = {
  venue: UserModel;
  user: UserModel;
  bookingEmail: string;
  note: string;
  timestamp: Timestamp;
  originalMessageId: Option<string>;
  latestMessageId: Option<string>;
  subject: Option<string>;
  allEmails: string[];
  collaborators: UserModel[];
};
