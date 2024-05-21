import { type UserModel, emptyUserModel } from "@/domain/types/user_model";
import { Dispatch } from "@/context/auth";
import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import { sleep } from "@/utils/promise";
import { convertToNullableString } from "@/utils/strings";
import { checkUsernameAvailability, createOrUpdateUser } from "@/data/database";
import * as _ from "lodash";
import { uploadProfilePicture } from "@/data/storage";

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
    const usernameAvailable = await checkUsernameAvailability(
      authUser.uid,
      onboardFormUser.username,
    );

    if (!usernameAvailable) {
      throw new Error("username already taken");
    }

    const profilePictureUrl = await (async () => {
      if (onboardFormUser.profilePicture) {
        return await uploadProfilePicture(
          authUser.uid,
          onboardFormUser.profilePicture
        ); // directly return the URL
      } else {
        return null; // return null if no photo is picked
      }
    })();

    const tiktokHandle = convertToNullableString(onboardFormUser.tiktokHandle);
    const instagramHandle = convertToNullableString(onboardFormUser.instagramHandle);
    const twitterHandle = convertToNullableString(onboardFormUser.twitterHandle);

    const newUserObj = _.merge(emptyUserModel, {
      id: authUser.uid,
      email: authUser.email!,
      unclaimed: false,
      deleted: false,
      username: onboardFormUser.username,
      artistName: authUser.displayName ?? onboardFormUser.username,
      profilePicture: profilePictureUrl,
      socialFollowing: {
        tiktokHandle,
        tiktokFollowers: onboardFormUser.tiktokFollowers,
        instagramHandle,
        instagramFollowers: onboardFormUser.instagramFollowers,
        twitterHandle,
        twitterFollowers: onboardFormUser.twitterFollowers,
      },
      performerInfo: {
        genres: [],
        label: "Independent",
        reviewCount: 0,
        rating: 0,
        category: "undiscovered",
      },
    });

    await createOrUpdateUser(newUserObj);
    await sleep(2000);

    dispatch({ type: "ONBOARD", currentUser: newUserObj });
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function updateOnboardedUser(
  dispatch: Dispatch,
  updatedUser: UserModel,
) {
  try {
  // check that username doesn't already exist on someone else
    const usernameAvailable = await checkUsernameAvailability(
      updatedUser.id,
      updatedUser.username,
    );

    if (!usernameAvailable) {
      throw new Error("username already taken");
    }

    await createOrUpdateUser(updatedUser);

    dispatch({ type: "ONBOARD", currentUser: updatedUser });
  } catch (e) {
    console.error(e);
    throw e;
  }
}
