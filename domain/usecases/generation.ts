import { None } from '@sniptt/monads';
import api from '@/data/api';
import database from '@/data/database';
import storage from '@/data/storage';
import { Avatar } from '@/domain/models/avatar';
import { BrandGenerator } from '@/domain/models/brand_generator';
import { uuid as uuidv4 } from 'uuid';
import { AlbumName } from '@/domain/models/album_name';


export const generateAvatars = async ({ generator }: {
  generator: BrandGenerator,
}): Promise<{ urls: string[] }> => {
  // create inference job
  const { id, prompt } = await api.createAvatarInferenceJob({
    modelId: generator.sdModelId,
    avatarStyle: generator.avatarStyle,
  });

  // poll leapai for results
  const { imageUrls } = await api.getAvatarInferenceJob(id);

  // ave images to firebase storage
  const urls = await Promise.all(
    imageUrls.map(async (imageUrl) => {
      const uuid = uuidv4();
      const { url } = await storage.saveGeneratedAvatarImage({
        generatorId: generator.id,
        avatarId: uuid,
        imageUrl,
      });

      // save result to firestore for all avatars
      const generatedAvatar: Avatar = {
        id: uuid,
        userId: generator.userId,
        generatorId: generator.id,
        prompt,
        url,
        errorMsg: None,
        timestamp: new Date(),
      };
      await database.createGeneratedAvatar(generatedAvatar);

      return url;
    })
  );

  // delete images from leapai
  await api.deleteInferenceJob(id);

  return { urls };
};

export const generateAlbumName = async ({ generator }: {
  generator: BrandGenerator,
}): Promise<{ text: string }> => {
  const { text, prompt } = await api.generateAlbumName({
    artistName: generator.artistName,
    artistGenres: generator.genres,
    igFollowerCount: generator.socialFollowing,
  });

  console.log(`generated AlbumName: ${text}`);

  // save result to firestore
  const uuid = uuidv4();
  const generatedAlbumName: AlbumName = {
    id: uuid,
    userId: generator.userId,
    generatorId: generator.id,
    text: text,
    prompt: prompt,
    timestamp: new Date(),
  };
  await database.createGeneratedAlbumName(generatedAlbumName);

  return { text };
};
