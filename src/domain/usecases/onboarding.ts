import { type UserModel, emptyUserModel } from "@/domain/types/user_model";
import { Dispatch } from "@/context/auth";
import { User } from "firebase/auth";
import { sleep } from "@/utils/promise";
import { convertToNullableString } from "@/utils/strings";
import { checkUsernameAvailability, createOrUpdateUser } from "@/data/database";
import * as _ from "lodash";
import { uploadProfilePicture } from "@/data/storage";
import { getInstagramHandle, getTiktokHandle, getTwitterHandle } from "@/utils/url_parsing";

type OnboardFormUser = {
  username: string;
  artistName?: string;
  profilePicture: File;
  pressKit?: File;
  eula: boolean;
  instagramHandle?: string | undefined;
  instagramFollowers: number;
  twitterHandle?: string | undefined;
  twitterFollowers: number;
  tiktokHandle?: string | undefined;
  tiktokFollowers: number;
};

export async function onboardNewUser(
  dispatch: Dispatch,
  authUser: User,
  onboardFormUser: OnboardFormUser,
  options?: {
    sleepTime?: number;
  },
) {
  try {
    const usernameAvailable = await checkUsernameAvailability(authUser.uid, onboardFormUser.username);

    if (!usernameAvailable) {
      throw new Error("username already taken");
    }

    const profilePictureUrl = await (async () => {
      if (onboardFormUser.profilePicture) {
        return await uploadProfilePicture(authUser.uid, onboardFormUser.profilePicture); // directly return the URL
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
      artistName: onboardFormUser.artistName ?? authUser.displayName ?? onboardFormUser.username,
      profilePicture: profilePictureUrl,
      socialFollowing: {
        tiktokHandle: getTiktokHandle(tiktokHandle),
        tiktokFollowers: onboardFormUser.tiktokFollowers,
        instagramHandle: getInstagramHandle(instagramHandle),
        instagramFollowers: onboardFormUser.instagramFollowers,
        twitterHandle: getTwitterHandle(twitterHandle),
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

    await createOrUpdateUser(newUserObj.id, newUserObj);
    if (options?.sleepTime) {
      await sleep(options.sleepTime);
    }

    dispatch({ type: "ONBOARD", currentUser: newUserObj });
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function updateOnboardedUser(dispatch: Dispatch, updatedUser: UserModel) {
  try {
    // check that username doesn't already exist on someone else
    const usernameAvailable = await checkUsernameAvailability(updatedUser.id, updatedUser.username);

    if (!usernameAvailable) {
      throw new Error("username already taken");
    }

    await createOrUpdateUser(updatedUser.id, updatedUser);

    dispatch({ type: "ONBOARD", currentUser: updatedUser });
  } catch (e) {
    console.error(e);
    throw e;
  }
}
