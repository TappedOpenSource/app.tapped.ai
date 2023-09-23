import { getFunctions, httpsCallable } from 'firebase/functions';
import { Prompt } from '@/domain/models/avatar';
import { InferenceJob } from '@/domain/models/inference_job';


export type Api = {
  createAvatarInferenceJob: (input: {
    modelId: string;
    prompt: Prompt;
  }) => Promise<{
    inferenceId: string,
  }>;
  getAvatarInferenceJob: (inferenceId: string) => Promise<{
    job: InferenceJob,
  }>;
  deleteInferenceJob: (inferenceId: string) => Promise<void>;
  trainUserModel: ({
    imageUrls,
    type,
    name,
  }: {
    imageUrls: string[];
    type: string;
    name: string;
  }) => Promise<void>;
  generateAlbumName: (input: {
    artistName: string;
    artistGenres: string[];
    igFollowerCount: number;
  }) => Promise<{ text: string, prompt: string }>;
  createPortalLink: ({ returnUrl }: { returnUrl: string; }) => Promise<{ url: string; }>;
};

const FirebaseFuncs: Api = {
  trainUserModel: async ({ imageUrls, type, name }: {
    imageUrls: string[];
    type: string;
    name: string;
  }): Promise<void> => {
    const functions = getFunctions();
    const func = httpsCallable<
      {imageUrls: string[], type: string, name: string}
    >(functions, 'trainModel');
    await func({ imageUrls, type, name });
  },
  createAvatarInferenceJob: async ({ modelId, prompt }: {
    modelId: string;
    prompt: Prompt;
  }): Promise<{
    inferenceId: string,
  }> => {
    const functions = getFunctions();
    const func = httpsCallable<
      { modelId: string, prompt: Prompt },
      { inferenceId: string}
    >(functions, 'createAvatarInferenceJob');
    const resp = await func({ modelId, prompt });
    const { inferenceId } = resp.data;
    console.log(`res: ${JSON.stringify(inferenceId)}`);

    return { inferenceId };
  },
  getAvatarInferenceJob: async (inferenceId: string): Promise<{ job: InferenceJob }> => {
    const functions = getFunctions();
    const callable = httpsCallable<{ inferenceId: string }, any>(functions, 'getAvatarInferenceJob');
    const results = await callable({ inferenceId });

    console.log(`getAvatarInferenceJob: ${JSON.stringify(results.data)}`);

    const data = results.data;

    const job = InferenceJob.fromResponse(data['inferenceJob'] || {});

    return { job };
  },
  deleteInferenceJob: async (id: string): Promise<void> => {
    const functions = getFunctions();
    const func = httpsCallable<{ id: string }, void>(functions, 'deleteInferenceJob');
    await func({ id });
  },
  generateAlbumName: async ({ artistName, artistGenres, igFollowerCount }: {
    artistName: string;
    artistGenres: string[];
    igFollowerCount: number;
  }): Promise<{ text: string, prompt: string }> => {
    const functions = getFunctions();
    const func = httpsCallable<
      { artistName: string, artistGenres: string[], igFollowerCount: number },
      { text: string, prompt: string }
    >(functions, 'generateAlbumName');
    const resp = await func({ artistName, artistGenres, igFollowerCount });
    const { text, prompt } = resp.data;
    console.log(`res: ${JSON.stringify(text)}`);

    return { text, prompt };
  },
  createPortalLink: async ({ returnUrl }) => {
    const functions = getFunctions();
    const func = httpsCallable<{
      returnUrl: string;
     }, { url: string; }>(functions, 'ext-firestore-stripe-payments-createPortalLink');
    const { data } = await func({ returnUrl });
    return { url: data.url };
  },
};

export default FirebaseFuncs;
