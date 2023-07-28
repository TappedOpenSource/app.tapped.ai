import { getFunctions, httpsCallable } from 'firebase/functions';
import { AvatarStyle } from '../domain/models/avatar';


export type Api = {
  createAvatarInferenceJob: (input: {
    modelId: string;
    avatarStyle: AvatarStyle;
  }) => Promise<{
    id: string,
    prompt: string,
  }>;
  getAvatarInferenceJob: (id: string) => Promise<{
    imageUrls: string[],
  }>;
  deleteInferenceJob: (id: string) => Promise<void>;
  generateAlbumName: (input: {
    artistName: string;
    artistGenres: string[];
    igFollowerCount: number;
  }) => Promise<{ text: string, prompt: string }>;
};


const FirebaseFuncs: Api = {
  pollHuggingFaceAvatarModel: async ({
    prompt,
    userId,
    avatarId,
  }: PollHuggingFaceAvatarModelInput): Promise<PollHuggingFaceAvatarModelOutput> => {
    const functions = getFunctions();
    const func = httpsCallable<
      PollHuggingFaceAvatarModelInput,
      PollHuggingFaceAvatarModelOutput
    >(functions, 'pollHuggingFaceAvatarModel');
    const resp = await func({ prompt, userId, avatarId });
    const { status, url, updatedAt } = resp.data;
    console.log(`status: ${status} url: ${url} updatedAt: ${updatedAt}`);

    return resp.data;
  },

  gpt3MarketingPlan: async ({
    artistName,
    artistGenres,
    igFollowerCount,
  }: Gpt3MarketingPlanInput): Promise<{ text: string }> => {
    const functions = getFunctions();
    const func = httpsCallable<
      Gpt3MarketingPlanInput,
      { text: string }
    >(functions, 'gpt3MarketingPlan');
    const resp = await func({
      artistName,
      artistGenres,
      igFollowerCount,
    });
    const { text } = resp.data;
    console.log(`res: ${JSON.stringify(text)}`);

    return resp.data;
  },
};

export default FirebaseFuncs;
