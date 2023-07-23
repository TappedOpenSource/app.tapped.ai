import { getFunctions, httpsCallable } from "firebase/functions";

type PollHuggingFaceAvatarModelInput = {
    prompt: string,
    userId: string,
    avatarId: string,
}

type PollHuggingFaceAvatarModelOutput = {
    url: string;
    status: string;
    updatedAt: Date;
}

type Gpt3MarketingPlanInput = {
    artistName: string,
    artistGenres: string,
    igFollowerCount: number,
}

type Gpt3MarketingPlanOutput = {
    text: string;
}

export type Api = {
    pollHuggingFaceAvatarModel: (input: PollHuggingFaceAvatarModelInput) => Promise<PollHuggingFaceAvatarModelOutput>;
    gpt3MarketingPlan: (input: Gpt3MarketingPlanInput) => Promise<Gpt3MarketingPlanOutput>;
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
        >(functions, "pollHuggingFaceAvatarModel");
    const resp = await func({ prompt, userId, avatarId });
    const { status, url, updatedAt } = resp.data;
    console.log(`status: ${status} url: ${url} updatedAt: ${updatedAt}`);

    return resp.data;
  },

  gpt3MarketingPlan: async ({
    artistName,
    artistGenres,
    igFollowerCount,
  }: Gpt3MarketingPlanInput): Promise<Gpt3MarketingPlanOutput> => {
    const functions = getFunctions();
    const func = httpsCallable<
            Gpt3MarketingPlanInput,
            Gpt3MarketingPlanOutput
        >(functions, "gpt3MarketingPlan");
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
