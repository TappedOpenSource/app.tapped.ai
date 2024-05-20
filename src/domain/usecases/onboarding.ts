import type { UserModel } from "@/domain/types/user_model";
import { Dispatch } from "@/context/auth";
import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import { sleep } from "@/utils/promise";
import { convertToNullableString } from "@/utils/strings";
import { createUser } from "@/data/database";

type OnboardFormUser = {
    username: string;
    profilePicture: File;
    eula: boolean;
    instagramHandle?: string | undefined;
    instagramFollowers: number;
    twitterHandle?: string | undefined;
    twitterFollowers: number;
    tiktokHandle?: string | undefined;
    tiktokFollowers: number;
}

export async function onboardNewUser(
  dispatch: Dispatch,
  authUser: User,
  onboardFormUser: OnboardFormUser,
) {
  try {
    //   const profilePictureUrl = await switch (onboardFormUser.pickedPhoto) {
    //     Some(:const value) => () async {
    //         const url = await storageRepository.uploadProfilePicture(
    //           currentAuthUser.uid,
    //           value,
    //         );
    //         return Option.of(url);
    //       }(),
    //     None() => Future.value(const None()),
    //   };

    const tiktokHandle = convertToNullableString(onboardFormUser.tiktokHandle);
    const instagramHandle = convertToNullableString(onboardFormUser.instagramHandle);
    const twitterHandle = convertToNullableString(onboardFormUser.twitterHandle);

    const newUserObj: UserModel = {
      id: authUser.uid,
      email: authUser.email!,
      unclaimed: false,
      deleted: false,
      timestamp: Timestamp.now(),
      username: onboardFormUser.username,
      artistName: authUser.displayName ?? onboardFormUser.username,
      profilePicture: null,
      socialFollowing: {
        tiktokHandle,
        tiktokFollowers: onboardFormUser.tiktokFollowers,
        instagramHandle,
        instagramFollowers: onboardFormUser.instagramFollowers,
        twitterHandle,
        twitterFollowers: onboardFormUser.twitterFollowers,
        facebookHandle: null,
        facebookFollowers: 0,
        audiusHandle: null,
        audiusFollowers: 0,
        soundcloudHandle: null,
        soundcloudFollowers: 0,
        twitchHandle: null,
        twitchFollowers: 0,
      },
      bio: "",
      performerInfo: {
        genres: [],
        label: "Independent",
        reviewCount: 0,
        rating: 0,
        category: "undiscovered",
      },
      occupations: [],
      location: null,
      venueInfo: null,
      bookerInfo: null,
      emailNotifications: {
        appReleases: true,
        tappedUpdates: true,
        bookingRequests: true,
      },
      pushNotifications: {
        appReleases: true,
        tappedUpdates: true,
        bookingRequests: true,
        directMessages: true,
      },
      stripeConnectedAccountId: null,
      stripeCustomerId: null,
    };

    await createUser(newUserObj);
    await sleep(2000);

    dispatch({ type: "ONBOARD", currentUser: newUserObj });
  } catch (e) {
    console.error(e);
  }
}

export async function updateOnboardedUser(
  dispatch: Dispatch,
  updatedUser: UserModel,
) {
  try {
  // check that username doesn't already exist on someone else

    // update user in DB

    dispatch({ type: "ONBOARD", currentUser: updatedUser });
  } catch (e) {
    console.error(e);
    throw e;
  }
}
