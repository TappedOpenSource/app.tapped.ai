
import { v4 as uuidv4 } from 'uuid';
import { None } from '@sniptt/monads';
import { BrandGenerator } from '../models/brand_generator';
import database from '@/data/database';
import storage from '@/data/storage';
import auth from '@/data/auth';

export const submitCreateGeneratorForm = async (formInputs: {
  artistDescription: string;
  artistName: string;
  artistProfession: string;
  gender: string;
  modelName: string;
  postFreq: string;
  refImages: string[];
  sellingPoint: string;
  socialFollowing: number;
  theme: string;
}) => {
  if (auth.currentUser.isNone()) {
    throw new Error('User is not logged in');
  }

  const uuid = uuidv4();

  // TODO: upload images to cloudinary
  const uploadedImages = await Promise.all(
    formInputs.refImages.map(async (image) => {
      const { url } = await storage.uploadInputImage({
        imagePath: image,
      });
      return url;
    }),
  );

  // Create new generator object
  const generator: BrandGenerator = {
    id: uuid,
    userId: auth.currentUser.unwrap().uid,
    name: formInputs.modelName,
    quota: 100,
    updatedAt: new Date(),
    createdAt: new Date(),

    // inputs
    artistDescription: formInputs.artistDescription,
    artistName: formInputs.artistName,
    artistProfession: formInputs.artistProfession,
    gender: formInputs.gender,
    postFreq: formInputs.postFreq,
    refImages: uploadedImages,
    sellingPoint: formInputs.sellingPoint,
    socialFollowing: formInputs.socialFollowing,
    theme: formInputs.theme,
    avatarStyle: 'Vintage',
    genres: [],

    sdModelId: None,
    sdModelStatus: 'initial',
  };

  // Add to DB
  database.createGenerator(generator);
};
