import api from '../../data/api';
import database from '../../data/database';
import storage from '../../data/storage';
import { BrandGenerator } from '../models/brand_generator';
import { uuid as uuidv4 } from 'uuidv4';


export const generateAvatars = async ({ generator }: {
  generator: BrandGenerator,
}): Promise<void> => {
  // TODO : create inference job
  const inf = await api.createAvatarInferenceJob();

  // TODO : poll leapai for results
  const { imageUrls, prompt } = await api.getAvatarInferenceJob(inf.id);

  // TODO save images to firebase storage
  const urls = await storage.saveAvatarImages({
    generatorId: generator.id,
    imageUrls,
  });

  // TODO : save result to firestore for all avatars
  for (const url of urls) {
    const uuid = uuidv4();
    const generateAvatar = {
      id: uuid,
      generatorId: generator.id,
      prompt,
      url,
    };
    await database.createGeneratedAvatar(generatedAvatar);
  }

  // TODO : delete images from leapai
  await api.deleteInferenceJob(inf.id);
};

export const generateAlbumName = async ({ artistName, artistGenres, igFollowerCount }: {
  artistName: string;
  artistGenres: string;
  igFollowerCount: number;
}) => {
  // TODO : call openai
  const res = await api.generateAlbumName({
    artistName,
    artistGenres,
    igFollowerCount,
  });

  console.log(`generated AlbumName: ${JSON.stringify(res)}`);

  // TODO : save result to firestore
  await database.createGeneratedAlbumName({
    text: res.text,
    prompt: res.prompt,
  });

  return res.text;
};
