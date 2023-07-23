
import {initializeApp} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";
import {HttpsError, onCall} from "firebase-functions/v2/https";
import {defineSecret} from "firebase-functions/params";
import * as logger from "firebase-functions/logger";
import {HfInference} from "@huggingface/inference";
import {getStorage} from "firebase-admin/storage";


const app = initializeApp();
const db = getFirestore(app);
const bucket = getStorage(app).bucket();

const avatarsRef = db.collection("avatars");

const HF_AUTH_KEY = defineSecret("HUGGINGFACE_API_KEY");

const MODEL_NAME = "jonaylor89/sd-johannes";

export const pollHuggingFaceAvatarModel = onCall(
  {secrets: [HF_AUTH_KEY]},
  async (request) => {
    const hfKey = HF_AUTH_KEY.value();
    const hf = new HfInference(hfKey);
    const {prompt, userId, avatarId} = request.data;

    if (!(typeof prompt === "string") || prompt.length === 0) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new HttpsError("invalid-argument", "The function must be called " +
        "with one arguments \"prompt\" containing the message text to add.");
    }

    // Checking that the user is authenticated.
    // if (!request.auth) {
    //   // Throwing an HttpsError so that the client gets the error details.
    //   throw new HttpsError("failed-precondition", "The function must be " +
    //       "called while authenticated.");
    // }

    logger.log("Generating image");
    const output = await hf.textToImage({
      model: MODEL_NAME,
      inputs: prompt,
    });

    // TODO: check if output is waiting, errored, of done

    // TODO: if errored, return error message

    // TODO: if waiting, return estimated time

    // TODO: if done, upload to firebase storage and update firestore
    const file = bucket.file(`images/${userId}/imageName.png`);
    const imageStream = output.stream();
    const writeStream = file.createWriteStream({
      metadata: {
        contentType: "image/jpeg",
      },
    });


    logger.log("Uploading image to firebase storage");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    /* @ts-ignore */
    await imageStream.pipeTo(writeStream);
    logger.log("Image uploaded to firebase storage");

    logger.log("Updating firestore");
    await avatarsRef.doc(avatarId).update({
      status: "complete",
    });

    return {
      result: "success",
    };
  });
