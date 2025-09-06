import { type Booking, bookingConverter } from "@/domain/types/booking";
import { ContactVenueRequest } from "@/domain/types/contact_venue_request";
import { LabelApplication, labelApplicationConverter } from "@/domain/types/label_application";
import { type Opportunity, opportunityConverter } from "@/domain/types/opportunity";
import type { Option } from "@/domain/types/option";
import { RecursivePartial } from "@/domain/types/recursive_partial";
import { type Review, reviewConverter } from "@/domain/types/review";
import { type Service, serviceConverter } from "@/domain/types/service";
import type { UserModel } from "@/domain/types/user_model";
import { analytics, db } from "@/utils/firebase";
import { trackEvent } from "@/utils/tracking";
import { logEvent } from "firebase/analytics";
import {
  addDoc,
  collection,
  collectionGroup,
  count,
  doc,
  getAggregateFromServer,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import { LRUCache } from "lru-cache";

const verifiedBadgeId = "0aa46576-1fbe-4312-8b69-e2fef3269083";

export async function checkUsernameAvailability(userId: string, username: string): Promise<boolean> {
  const blacklist = ["anonymous", "*deleted*"];

  if (blacklist.includes(username)) {
    return false;
  }

  const usersRef = collection(db, "users");
  const userQuery = query(usersRef, where("username", "==", username), limit(1));
  const userQuerySnapshot = await getDocs(userQuery);
  const userQueryDocs = userQuerySnapshot.docs;

  return !(userQueryDocs.length > 0 && userQueryDocs[0].id !== userId);
}

export async function createOrUpdateUser(id: string, user: RecursivePartial<UserModel>): Promise<void> {
  const docRef = doc(db, "users", id);
  await setDoc(docRef, user, { merge: true });
}

const userByIdCache = new LRUCache<string, UserModel>({
  max: 500,
});
export async function getUserById(userId: string): Promise<Option<UserModel>> {
  const cached = userByIdCache.get(userId);
  if (cached !== undefined) {
    return cached;
  }

  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    console.log("user doesnt exist");
    return null;
  }

  const user = docSnap.data() as UserModel;
  userByIdCache.set(userId, user);

  return user;
}

const userByUsernameCache = new LRUCache<string, UserModel>({
  max: 500,
});
export async function getUserByUsername(username: string): Promise<Option<UserModel>> {
  const cached = userByUsernameCache.get(username);
  if (cached !== undefined) {
    return cached;
  }

  const usersCollection = collection(db, "users");
  const q = query(usersCollection, where("username", "==", username), limit(1));

  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    console.log("no user found!");
    return null;
  }

  const user = querySnapshot.docs[0].data() as UserModel;
  userByUsernameCache.set(username, user);

  return user;
}

const verifiedCache = new LRUCache<string, boolean>({
  max: 500,
});
export async function isVerified(userId: string): Promise<boolean> {
  try {
    const cached = verifiedCache.get(userId);
    if (cached !== undefined) {
      return cached;
    }

    const badgesSentRef = collection(db, "badgesSent");

    const verifiedBadgeSentDoc = await getDoc(doc(badgesSentRef, userId, "badges", verifiedBadgeId));

    const verified = verifiedBadgeSentDoc.exists();
    verifiedCache.set(userId, verified);

    return verified;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function getBookingCount(userId: string) {
  const bookingQuery = query(collection(db, "bookings"), where("requesteeId", "==", userId));
  const aggr = await getAggregateFromServer(bookingQuery, {
    bookingCount: count(),
  });

  const data = aggr.data();

  return data.bookingCount;
}

export async function getLatestBookingByRequestee(userId: string): Promise<Option<Booking>> {
  const bookingsCollection = collection(db, "bookings");
  const querySnapshot = query(
    bookingsCollection,
    where("requesteeId", "==", userId),
    where("status", "==", "confirmed"),
    orderBy("timestamp", "desc"),
    limit(1),
  ).withConverter(bookingConverter);
  const queryDocs = await getDocs(querySnapshot);

  if (queryDocs.empty) {
    console.log("No booking found!");
    return null;
  }

  return queryDocs.docs[0].data();
}

export async function getLatestBookingByRequester(userId: string): Promise<Option<Booking>> {
  const bookingsCollection = collection(db, "bookings");
  const querySnapshot = query(
    bookingsCollection,
    where("requesterId", "==", userId),
    where("status", "==", "confirmed"),
    orderBy("timestamp", "desc"),
    limit(1),
  ).withConverter(bookingConverter);
  const queryDocs = await getDocs(querySnapshot);

  if (queryDocs.empty) {
    console.log("No booking found!");
    return null;
  }

  return queryDocs.docs[0].data();
}

export async function getLatestPerformerReviewByPerformerId(userId: string): Promise<Option<Review>> {
  const reviewsCollection = collection(db, `reviews/${userId}/performerReviews`);
  const querySnapshot = query(reviewsCollection, orderBy("timestamp", "desc"), limit(1)).withConverter(reviewConverter);

  const queryDocs = await getDocs(querySnapshot);

  if (queryDocs.empty) {
    console.log("No review found!");
    return null;
  }

  return queryDocs.docs[0].data();
}

export async function getLatestBookerReviewByBookerId(userId: string): Promise<Option<Review>> {
  const reviewsCollection = collection(db, `reviews/${userId}/bookerReviews`);
  const querySnapshot = query(reviewsCollection, orderBy("timestamp", "desc"), limit(1)).withConverter(reviewConverter);

  const queryDocs = await getDocs(querySnapshot);

  if (queryDocs.empty) {
    console.log("No review found!");
    return null;
  }

  return queryDocs.docs[0].data();
}

export async function getBookingsByEventId(eventId: string): Promise<Booking[]> {
  const bookingsQuery = query(
    collection(db, "bookings"),
    where("referenceEventId", "==", eventId),
    where("status", "==", "confirmed"),
  ).withConverter(bookingConverter);

  const querySnapshot = await getDocs(bookingsQuery);
  const queryDocs = querySnapshot.docs;

  return queryDocs.map((doc) => doc.data());
}

export async function getBookingsByEventUrl(eventUrl: string): Promise<Booking[]> {
  const bookingsQuery = query(
    collection(db, "bookings"),
    where("eventUrl", "==", eventUrl),
    where("status", "==", "confirmed"),
  ).withConverter(bookingConverter);

  const querySnapshot = await getDocs(bookingsQuery);
  const queryDocs = querySnapshot.docs;

  return queryDocs.map((doc) => doc.data());
}

export async function getUserOpportunities(userId: string): Promise<Opportunity[]> {
  const opportunitiesCollection = collection(db, "opportunities");
  const querySnapshot = query(
    opportunitiesCollection,
    orderBy("startTime", "desc"),
    where("startTime", ">", new Date()),
    where("deleted", "==", false),
    where("userId", "==", userId),
  ).withConverter(opportunityConverter);

  const queryDocs = await getDocs(querySnapshot);

  if (queryDocs.empty) {
    return [];
  }

  return queryDocs.docs.map((doc) => doc.data());
}

export async function getOpportunityById(opportunityId: string) {
  const docRef = doc(db, "opportunities", opportunityId).withConverter(opportunityConverter);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    console.log("No such document!");
    return null;
  }

  return docSnap.data() as Opportunity;
}

export async function getFeaturedOpportunities(): Promise<Opportunity[]> {
  const opportunitiesRef = collection(db, "opportunities");
  const tccOpsQuery = query(
    opportunitiesRef,
    where("userId", "==", "yfjw9oCMwPVzAxgENxGxecPcNym1"),
    where("deleted", "==", false),
    where("startTime", ">", new Date()),
    orderBy("startTime", "desc"),
    limit(3),
  ).withConverter(opportunityConverter);
  const tccOpsSnap = await getDocs(tccOpsQuery);
  const tccOps = tccOpsSnap.docs.map((doc) => doc.data());

  const leadersRef = collection(db, "leaderboard");
  const leadersSnap = doc(leadersRef, "leaders");
  const leadersDoc = await getDoc(leadersSnap);
  const { featuredOpportunities } = leadersDoc.data() as {
    featuredOpportunities: string[];
  };
  const leaderOps = (await Promise.all(featuredOpportunities.map(getOpportunityById))).filter(
    (u) => u !== null,
  ) as Opportunity[];

  return [...tccOps, ...leaderOps];
}

export async function checkIfUserApplied(opId: string, userId: string) {
  try {
    const opsRef = collection(db, "opportunities");
    const interestedCollection = collection(opsRef, `${opId}/interestedUsers`);
    const userDoc = doc(interestedCollection, userId);
    const user = await getDoc(userDoc);
    return user.exists();
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function applyForOpportunity({
  opId,
  userId,
  userComment,
}: {
  opId: string;
  userId: string;
  userComment: string;
}) {
  try {
    const opsRef = collection(db, "opportunities");
    const interestedCollection = collection(opsRef, `${opId}/interestedUsers`);
    const userDoc = doc(interestedCollection, userId);
    await setDoc(userDoc, {
      timestamp: Timestamp.now(),
      userComment: userComment,
    });

    trackEvent("apply_for_opportunity", {
      opportunity_id: opId,
      user_id: userId,
    });
  } catch (e) {
    console.error(e);
  }
}

export async function getOpportunityQuota(opId: string): Promise<number> {
  try {
    const opsRef = collection(db, "credits");
    const opDoc = doc(opsRef, opId);
    const op = await getDoc(opDoc);

    if (!op.exists()) {
      return 0;
    }

    const { opportunityQuota } = op.data() as { opportunityQuota: number };

    return opportunityQuota;
  } catch (e) {
    console.error(e);
    return 0;
  }
}

export async function getInterestedUsersForOpportunity(opId: string): Promise<UserModel[]> {
  const opsRef = collection(db, "opportunities");
  const interestedCollection = collection(opsRef, `${opId}/interestedUsers`);
  const interestedUsers = await getDocs(interestedCollection);

  return (
    await Promise.all(
      interestedUsers.docs.map(async (doc) => {
        return await getUserById(doc.id);
      }),
    )
  ).filter((u) => u !== null) as UserModel[];
}

const featuredPerformersCache = new LRUCache<string, UserModel[]>({
  max: 1,
});
export async function getFeaturedPerformers(): Promise<UserModel[]> {
  const cached = featuredPerformersCache.get("featuredPerformers");
  if (cached !== undefined) {
    return cached;
  }

  const leadersRef = collection(db, "leaderboard");
  const leadersSnap = doc(leadersRef, "leaders");
  const leadersDoc = await getDoc(leadersSnap);
  const { featuredPerformers } = leadersDoc.data() as {
    featuredPerformers: string[];
  };
  const featured = (await Promise.all(featuredPerformers.map(getUserByUsername))).filter(
    (u) => u !== null,
  ) as UserModel[];

  featuredPerformersCache.set("featuredPerformers", featured);
  return featured;
}

const bookingLeadersCache = new LRUCache<string, UserModel[]>({
  max: 1,
});
export async function getBookingLeaders(): Promise<UserModel[]> {
  const cached = bookingLeadersCache.get("bookingLeaders");
  if (cached !== undefined) {
    return cached;
  }

  const leadersRef = collection(db, "leaderboard");
  const leadersSnap = doc(leadersRef, "leaders");
  const leadersDoc = await getDoc(leadersSnap);
  const { bookingLeaders } = leadersDoc.data() as {
    bookingLeaders: string[];
  };
  const leaders = (await Promise.all(bookingLeaders.map(getUserByUsername))).filter((u) => u !== null) as UserModel[];

  bookingLeadersCache.set("bookingLeaders", leaders);
  return leaders;
}

export async function getServiceById({
  userId,
  serviceId,
}: {
  userId: string;
  serviceId: string;
}): Promise<Option<Service>> {
  const docRef = doc(db, `/services/${userId}/userServices/${serviceId}`).withConverter(serviceConverter);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    return null;
  }

  return docSnap.data();
}

export async function getReviewsByPerformerId(userId: string): Promise<Review[]> {
  const reviewsCollection = collection(db, `reviews/${userId}/performerReviews`);
  const querySnapshot = query(reviewsCollection, orderBy("timestamp", "desc")).withConverter(reviewConverter);

  const queryDocs = await getDocs(querySnapshot);

  return queryDocs.docs.map((doc) => doc.data());
}

export async function getReviewsByBookerId(userId: string): Promise<Review[]> {
  const reviewsCollection = collection(db, `reviews/${userId}/bookerReviews`);
  const querySnapshot = query(reviewsCollection, orderBy("timestamp", "desc")).withConverter(reviewConverter);

  const queryDocs = await getDocs(querySnapshot);

  return queryDocs.docs.map((doc) => doc.data());
}

export async function getBookingsByRequestee(userId: string, params?: { limit: number }): Promise<Booking[]> {
  const bookingsCollection = collection(db, "bookings");
  const querySnapshot = query(
    bookingsCollection,
    where("requesteeId", "==", userId),
    where("status", "==", "confirmed"),
    orderBy("timestamp", "desc"),
    limit(params?.limit ?? 100),
  ).withConverter(bookingConverter);
  const queryDocs = await getDocs(querySnapshot);

  return queryDocs.docs.map((doc) => doc.data());
}

export async function getBookingsByRequester(userId: string, params?: { limit: number }): Promise<Booking[]> {
  const bookingsCollection = collection(db, "bookings");
  const querySnapshot = query(
    bookingsCollection,
    where("requesterId", "==", userId),
    where("status", "==", "confirmed"),
    orderBy("timestamp", "desc"),
    limit(params?.limit ?? 100),
  ).withConverter(bookingConverter);
  const queryDocs = await getDocs(querySnapshot);

  return queryDocs.docs.map((doc) => doc.data());
}

export async function getBookingById(bookingId: string): Promise<Option<Booking>> {
  const docRef = doc(db, "bookings", bookingId).withConverter(bookingConverter);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    console.log("No such document!");
    return null;
  }

  return docSnap.data();
}

export async function createCheckoutSession({
  userId,
  priceId,
}: {
  userId: string;
  priceId: string;
}): Promise<void> {
  const sessionsRef = collection(db, `customers/${userId}/checkout_sessions`);
  const docRef = await addDoc(sessionsRef, {
    price: priceId,
    success_url: `${window.location.origin}/signup_complete`,
    cancel_url: window.location.origin,
    allow_promotion_codes: true,
    mode: "subscription",
  });

  // Wait for the CheckoutSession to get attached by the extension
  onSnapshot(docRef, (snap) => {
    const { error, url } = snap.data() as { error: Error; url: string };
    if (error) {
      // Show an error to your customer and then inspect your function logs.
      alert(`An error occured: ${error.message}`);
      document.querySelectorAll("button").forEach((b) => (b.disabled = false));
    }
    if (url) {
      window.location.assign(url);
    }
  });
}
export async function getActiveProducts(): Promise<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { product: any; prices: any }[]
> {
  const productsQuery = query(collection(db, "products"), where("active", "==", true));
  const products = await getDocs(productsQuery);

  return await Promise.all(
    products.docs.map(async (product) => {
      const priceRef = collection(db, `products/${product.id}/prices`);
      const pricesQuery = query(priceRef, where("active", "==", true), orderBy("unit_amount"));
      const prices = await getDocs(pricesQuery);

      return {
        product: {
          id: product.id,
          ...product.data(),
        },
        prices: prices.docs.map((price) => {
          return {
            id: price.id,
            ...price.data(),
          };
        }),
      };
    }),
  );
}
export async function addCustomerSubscriptionListener(userId, callback) {
  const subscriptionsRef = collection(db, `customers/${userId}/subscriptions`);
  const queryRef = query(subscriptionsRef, where("status", "in", ["trialing", "active"]));
  return onSnapshot(queryRef, callback);
}

export async function createNewApplicationResponse({
  userId,
  labelApplication,
}: {
  userId: string;
  labelApplication: LabelApplication;
}) {
  const docRef = doc(db, `label_applications/${labelApplication.id}`);
  await setDoc(docRef, {
    userId,
    ...labelApplicationConverter.toFirestore(labelApplication),
  });

  return docRef.id;
}

export async function hasUserSentContactRequest({
  userId,
  venueId,
}: {
  userId: string;
  venueId: string;
}) {
  try {
    const contactVenuesRef = collection(db, "contactVenues");
    const userCollection = collection(contactVenuesRef, `${userId}/venuesContacted`);
    const venueDoc = doc(userCollection, venueId);

    const docSnap = await getDoc(venueDoc);
    return docSnap.exists();
  } catch (e) {
    console.error("can't check if user has sent contact request", { cause: e });
    return false;
  }
}

export async function getContactedVenues(userId: string, params?: { limit: number }): Promise<ContactVenueRequest[]> {
  try {
    const contactVenuesRef = collection(db, "contactVenues");
    const userCollection = collection(contactVenuesRef, `${userId}/venuesContacted`);
    const querySnapshot = await query(userCollection, orderBy("timestamp", "desc"), limit(params?.limit ?? 100));
    const snap = await getDocs(querySnapshot);
    return snap.docs.map((doc) => doc.data() as ContactVenueRequest);
  } catch (e) {
    console.error("can't get contacted venues", { cause: e });
    return [];
  }
}

export async function contactVenue({
  currentUser,
  venue,
  note,
  bookingEmail,
}: {
  currentUser: UserModel;
  venue: UserModel;
  note: string;
  bookingEmail: string;
}) {
  try {
    // already contacted?
    const hasSentContactRequest = await hasUserSentContactRequest({
      userId: currentUser.id,
      venueId: venue.id,
    });

    if (hasSentContactRequest) {
      return;
    }

    if (analytics !== null) {
      await logEvent(analytics, "contact_venue", {
        user_id: currentUser.id,
        venue_id: venue.id,
        booking_email: bookingEmail,
        note: note,
      });
    }

    const contactVenueRequest: ContactVenueRequest = {
      venue: venue,
      user: currentUser,
      bookingEmail: bookingEmail,
      allEmails: [bookingEmail],
      note: note,
      timestamp: Timestamp.now(),
      originalMessageId: null,
      latestMessageId: null,
      subject: null,
      collaborators: [],
    };

    console.info("contactVenueRequest $contactVenueRequest");

    const contactVenuesRef = collection(db, "contactVenues");
    const userCollection = collection(contactVenuesRef, `${currentUser.id}/venuesContacted`);
    const venueDoc = doc(userCollection, venue.id);
    await setDoc(venueDoc, contactVenueRequest);

    trackEvent("contact_venue", {
      user_id: currentUser.id,
      venue_id: venue.id,
      booking_email: bookingEmail,
      note: note,
    });
  } catch (e) {
    console.error("can't contact venue", { cause: e });
  }
}
