import { None, Some } from '@sniptt/monads';
import api from '@/data/api';
import database from '@/data/database';
import storage from '@/data/storage';
import { Avatar } from '@/domain/models/avatar';
import { Team } from '@/domain/models/team';
import { uuid as uuidv4 } from 'uuid';
import { AlbumName } from '@/domain/models/album_name';


export const generateAvatars = async ({ team }: {
  team: Team,
}): Promise<{ urls: string[] }> => {
  // create inference job
  const { inferenceId, prompt } = await api.createAvatarInferenceJob({
    modelId: team.sdModelId.unwrap(),
    avatarStyle: team.avatarStyle,
  });

  // poll leapai for results
  const { imageUrls } = await api.getAvatarInferenceJob(inferenceId);

  // save images to firebase storage
  const urls = await Promise.all(
    imageUrls.map(async (imageUrl) => {
      const uuid = uuidv4();
      const { url } = await storage.saveGeneratedAvatarImage({
        teamId: team.id,
        avatarId: uuid,
        imageUrl,
      });

      // save result to firestore for all avatars
      const generatedAvatar: Avatar = {
        id: uuid,
        userId: team.userId,
        teamId: team.id,
        prompt,
        url: Some(url),
        errorMsg: None,
        timestamp: new Date(),
      };
      await database.createAvatar(generatedAvatar);

      return url;
    })
  );

  // delete images from leapai
  await api.deleteInferenceJob(inferenceId);

  return { urls };
};

export const generateAlbumName = async ({ team }: {
  team: Team,
}): Promise<{ text: string }> => {
  const { text, prompt } = await api.generateAlbumName({
    artistName: team.artistName,
    artistGenres: team.genres,
    igFollowerCount: team.socialFollowing,
  });

  console.log(`generated AlbumName: ${text}`);

  // save result to firestore
  const uuid = uuidv4();
  const generatedAlbumName: AlbumName = {
    id: uuid,
    userId: team.userId,
    teamId: team.id,
    text: text,
    prompt: prompt,
    timestamp: new Date(),
  };
  await database.createGeneratedAlbumName(generatedAlbumName);

  return { text };
};
