

import {HttpsError, onCall} from "firebase-functions/v2/https";
import {defineSecret} from "firebase-functions/params";
import * as logger from "firebase-functions/logger";

import {HfInference} from "@huggingface/inference";

const HF_AUTH_KEY = defineSecret("HUGGINGFACE_API_KEY");

// const MODEL_URL = "https://api-inference.huggingface.co/models/jonaylor89/sd-johannes";

export const generateAvatar = onCall(
  {secrets: [HF_AUTH_KEY]},
  async (request) => {
    logger.log("Received request");

    const hfKey = HF_AUTH_KEY.value();
    const hf = new HfInference(hfKey);
    const {input} = request.data;

    // Checking attribute.
    if (!(typeof input === "string") || input.length === 0) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new HttpsError("invalid-argument", "The function must be called " +
          "with one arguments \"text\" containing the message text to add.");
    }

    // Checking that the user is authenticated.
    // if (!request.auth) {
    //   // Throwing an HttpsError so that the client gets the error details.
    //   throw new HttpsError("failed-precondition", "The function must be " +
    //       "called while authenticated.");
    // }

    const output = await hf.textToImage({
      model: "jonaylor89/sd-johannes",
      inputs: input,
    });

    return {
      image: output,
    };

    // if (resp.ok) {
    //   const buffer = await resp.arrayBuffer();
    //   return {
    //     result: "success",
    //     image: buffer,
    //   };
    // } else if (resp.status === 503) {
    //   const json = await resp.json();
    //   const estimatedTime = json.estimated_time;
    //   return {
    //     estimatedTime,
    //     result: "waiting",
    //     error: {
    //       code: 503,
    //     },
    //   };
    // } else {
    //   throw new HttpsError("internal", "Error calling HF API");
    // }
  });
