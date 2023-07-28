import { getFunctions, httpsCallable } from 'firebase/functions';
import { AvatarStyle } from '../domain/models/avatar';


export type Api = {
  createAvatarInferenceJob: (input: {
    modelId: string;
    avatarStyle: AvatarStyle;
  }) => Promise<{
    inferenceId: string,
    prompt: string,
  }>;
  getAvatarInferenceJob: (inferenceId: string) => Promise<{
    imageUrls: string[],
  }>;
  deleteInferenceJob: (inferenceId: string) => Promise<void>;
  generateAlbumName: (input: {
    artistName: string;
    artistGenres: string[];
    igFollowerCount: number;
  }) => Promise<{ text: string, prompt: string }>;
};


const FirebaseFuncs: Api = {
  createAvatarInferenceJob: async ({ modelId, avatarStyle }: {
    modelId: string;
    avatarStyle: AvatarStyle;
  }): Promise<{
    inferenceId: string,
    prompt: string,
  }> => {
    const functions = getFunctions();
    const func = httpsCallable<
      { modelId: string, avatarStyle: AvatarStyle },
      { inferenceId: string, prompt: string }
    >(functions, 'createAvatarInferenceJob');
    const resp = await func({ modelId, avatarStyle });
    const { inferenceId, prompt } = resp.data;
    console.log(`res: ${JSON.stringify(inferenceId)}`);

    return { inferenceId, prompt };
  },
  getAvatarInferenceJob: async (inferenceId: string): Promise<{
    imageUrls: string[],
  }> => {
    const functions = getFunctions();
    const func = httpsCallable<{ inferenceId: string }, { imageUrls: string[] }>(functions, 'getAvatarInferenceJob');
    const resp = await func({ inferenceId });
    const { imageUrls } = resp.data;
    console.log(`res: ${JSON.stringify(imageUrls)}`);

    return { imageUrls };
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
};

export default FirebaseFuncs;
