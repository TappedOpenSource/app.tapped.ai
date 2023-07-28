
import * as logger from 'firebase-functions/logger';

// const AVATAR_PROMPT = '';
// const STAGE_PHOTOS_PROMPT = '';
// const ALBUM_ART_PROMPT = '';

export const createInferenceJob = async ({
  modelId,
  prompt,
}: {
    modelId: string;
    prompt: string;
}): Promise<{ text: string }> => {
  logger.log(`Generating text ${prompt}`);

  const { data, error } = await leap.generate.createInferenceJob({
    prompt: 'A photo of a cat',
  });

  return { text: '' };
};

export const getInferenceJob = async ({
  inferenceId,
}: {
        inferenceId: string;
}) => {
  const { data, error } = await leap.generate.getInferenceJob({
    inferenceId: 'inferenceId',
  });
};

export const deleteInferenceJob = async ({
  inferenceId,
}: {
    interenceId: string;
}) => {
  const { data, error } = await leap.generate.deleteInference({
    inferenceId: 'inferenceId',
  });
};
