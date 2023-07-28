
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { HttpsError, onCall, onRequest } from 'firebase-functions/v2/https';
import {
  onDocumentCreated,
} from 'firebase-functions/v2/firestore';

import { defineSecret } from 'firebase-functions/params';
import * as logger from 'firebase-functions/logger';

import { Leap, ModelSubjectTypesEnum } from '@leap-ai/sdk';

import llm from './utils/openai';


const app = initializeApp();
const db = getFirestore(app);

// const avatarsRef = db.collection('avatars');
const generatorsRef = db.collection('generators');

const OPEN_AI_KEY = defineSecret('OPEN_AI_KEY');
const LEAP_API_KEY = defineSecret('LEAP_API_KEY');

export const generateAlbumName = onCall(
  { secrets: [OPEN_AI_KEY] },
  async (request) => {
    const oak = OPEN_AI_KEY.value();
    const {
      artistName,
      artistGenres,
      igFollowerCount,
    } = request.data;

    if (!(typeof artistName === 'string') || artistName.length === 0) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new HttpsError('invalid-argument', 'The function must be called ' +
        'with argument "artistName".');
    }

    if (!(typeof artistGenres === 'string') || artistGenres.length === 0) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new HttpsError('invalid-argument', 'The function must be called ' +
        'with argument "artistGenres".');
    }

    if (!(typeof igFollowerCount === 'number') || artistName.length <= 0) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new HttpsError('invalid-argument', 'The function must be called ' +
        'with argument "igFollowerCount".');
    }

    // Checking that the user is authenticated.
    if (!request.auth) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new HttpsError('failed-precondition', 'The function must be ' +
        'called while authenticated.');
    }

    const res = await llm.generateAlbumName({
      artistName,
      artistGenres,
      igFollowerCount,
      apiKey: oak,
    });

    return res;
  });


export const onGeneratorCreated = onDocumentCreated(
  {
    document: '/generators/{userId}/userGenerators/{generatorId}',
    secrets: [LEAP_API_KEY],
  },
  async (event) => {
    const { userId, generatorId } = event.params;
    const data = event.data?.data();
    if (data == null) {
      return;
    }

    const { referenceImages } = data;

    // create LeapAI job
    const leapApiKey = LEAP_API_KEY.value();
    const leap = new Leap(leapApiKey);
    const { data: modelSchema, error: error1 } = await leap
      .fineTune
      .createModel({
        title: `sd/${userId}/${generatorId}`,
        subjectKeyword: '@subject',
        subjectType: ModelSubjectTypesEnum.PERSON,
      });
    if (modelSchema == null) {
      logger.error(error1);
      await generatorsRef
        .doc(generatorId)
        .update({ sdModelStatus: 'errored' });
      return;
    }

    // Save model id to firestore
    const model = await modelSchema;
    const modelId = model.id;
    await generatorsRef
      .doc(generatorId)
      .update({ sdModelId: modelId });

    // upload images to leapai
    const { data: sampleSchema, error: error2 } = await leap
      .fineTune
      .uploadImageSamples({
        modelId,
        images: referenceImages,
      });
    if (sampleSchema == null) {
      logger.error(error2);
      await generatorsRef
        .doc(generatorId)
        .update({ sdModelStatus: 'errored' });
      return;
    }

    // queue training job
    const samples = await sampleSchema;
    logger.debug(`samples: ${JSON.stringify(samples)}`);
    const { data: versionSchema, error: error3 } = await leap
      .fineTune
      .queueTrainingJob({
        modelId,
        webhookUrl: 'https://my-webhook-url.com', // optional
      });
    if (versionSchema == null) {
      logger.error(error3);
      await generatorsRef
        .doc(generatorId)
        .update({ sdModelStatus: 'errored' });
      return;
    }
    const version = await versionSchema;
    logger.debug(`version: ${JSON.stringify(version)}`);

    // change generator sfModel to "training"
    await generatorsRef
      .doc(generatorId)
      .update({ sdModelStatus: 'training' });
  });

export const onTrainingJobCompletedWebhook = onRequest(
  async (req) => {
    // get model id from request
    const { id, state } = req.body;

    // update firestore if error
    if (state !== 'finished') {
      logger.error(`training job ${id} failed with state ${state}`);
      return;
    }

    // update firestore if success
    logger.debug(`training job ${id} finished with state ${state}`);
    const generatorSnapshot = await generatorsRef.where('sdModelId', '==', id).get();
    if (generatorSnapshot.docs.length <= 0) {
      logger.error(`no generator found with sdModelId ${id}`);
      return;
    }

    const generator = generatorSnapshot.docs[0];
    await generator.ref.update({ sdModelStatus: 'ready' });
  });
