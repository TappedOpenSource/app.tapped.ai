
import * as logger from 'firebase-functions/logger';

// const AVATAR_PROMPT = '';
// const STAGE_PHOTOS_PROMPT = '';
// const ALBUM_ART_PROMPT = '';

export const callSdModel = async ({
  prompt,
}: {
    prompt: string;
}): Promise<{ text: string }> => {
  logger.log(`Generating text ${prompt}`);
  return { text: '' };
};
