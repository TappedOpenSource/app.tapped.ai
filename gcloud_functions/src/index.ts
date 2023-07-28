
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { HttpsError, onCall } from 'firebase-functions/v2/https';
import {
  onDocumentCreated,
} from 'firebase-functions/v2/firestore';

import { defineSecret } from 'firebase-functions/params';
import * as logger from 'firebase-functions/logger';

import { Leap, ModelSubjectTypesEnum } from '@leap-ai/sdk';

import llm from './utils/openai';


const app = initializeApp();
const db = getFirestore(app);

const avatarsRef = db.collection('avatars');
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

    // create LeapAI job
    const leapApiKey = LEAP_API_KEY.value();
    const leap = new Leap(leapApiKey);
    const { data: modelSchema, error: error1 } = await leap
      .fineTune
      .createModel({
        title: 'My Avatars',
        subjectKeyword: '@subject',
        subjectType: ModelSubjectTypesEnum.PERSON,
      });
    if (modelSchema == null) {
      logger.error(error1);
      // TODO: mark generator as errored
      return;
    }
    const model = await modelSchema;
    const modelId = model.id;

    const { data: sampleSchema, error: error2 } = await leap
      .fineTune
      .uploadImageSamples({
        modelId,
        images: [
          'https://my-image-bucket.com/image1.jpg',
          'https://my-image-bucket.com/image2.jpg',
          'https://my-image-bucket.com/image3.jpg',
        ],
      });
    if (sampleSchema == null) {
      logger.error(error2);
      // TODO: mark generator as errored
      return;
    }

    const sample = await sampleSchema;

    const { data: versionSchema, error: error3 } = await leap
      .fineTune
      .queueTrainingJob({
        modelId,
        webhookUrl: 'https://my-webhook-url.com', // optional
      });
    if (versionSchema == null) {
      logger.error(error3);
      // TODO: mark generator as errored
      return;
    }
    const version = await versionSchema;

    // change generator sfModel to "training"
    await generatorsRef
      .doc(userId)
      .collection('userGenerators')
      .doc(generatorId)
      .update({ sfModel: 'training' });
  });
