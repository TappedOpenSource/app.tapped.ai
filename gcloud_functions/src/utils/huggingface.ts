
import {Bucket} from "@google-cloud/storage";
import * as logger from "firebase-functions/logger";
import {HfInference} from "@huggingface/inference";
import {Timestamp} from "firebase-admin/firestore";
import {Readable} from "stream";
import {pipeline} from "stream/promises";
import {getDownloadURL} from "firebase-admin/storage";

export const pollHuggingFace = async ({
  model,
  prompt,
  hfKey,
}: {
  model: string;
  prompt: string;
  hfKey: string;
}): Promise<Blob> => {
  logger.log("Generating image");

  const hf = new HfInference(hfKey);
  const output = await hf.textToImage({
    model: model,
    inputs: prompt,
  }, {
    wait_for_model: false,
    retry_on_error: false,
  });

  return output;
};

export const completeAvatarGeneration = async ({
  output,
  bucket,
  avatarsRef,
  userId,
  avatarId,
}: {
  output: Blob;
  bucket: Bucket;
  avatarsRef: FirebaseFirestore
  .CollectionReference<FirebaseFirestore.DocumentData>;
  userId: string;
  avatarId: string;
}) => {
  const outputFile = bucket.file(`images/${userId}/${avatarId}.jpeg`);
  const imageStream = output.stream() as unknown as Readable;
  const writeStream = outputFile.createWriteStream({
    metadata: {
      contentType: "image/jpeg",
    },
  });


  logger.log("Uploading image to firebase storage");

  await pipeline(imageStream, writeStream);

  // await imageStream.pipeTo(writeStream);
  logger.log("Image uploaded to firebase storage");

  const url = await getDownloadURL(outputFile);
  // const urlRes = await outputFile.getSignedUrl({
  //   action: "read",
  //   expires: "03-09-2491",
  // });
  // const url = urlRes[0];


  logger.log("Updating firestore");
  const updatePayload = {
    url: url,
    status: "complete",
    updatedAt: new Date(),
  };
  await avatarsRef
    .doc(userId)
    .collection("userAvatars")
    .doc(avatarId)
    .update({
      ...updatePayload,
      updatedAt: Timestamp.fromDate(updatePayload.updatedAt),
    });

  return updatePayload;
};
