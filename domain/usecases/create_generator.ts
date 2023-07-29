
import { v4 as uuidv4 } from 'uuid';
import { None } from '@sniptt/monads';
import { BrandGenerator } from '../models/brand_generator';
import database from '../../data/database';
import auth from '../../data/auth';

export const submitCreateGeneratorForm = async (formInputs: {
  name: string;
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

  // TODO: upload images to cloudinary

  // Create new generator object
  const uuid = uuidv4();
  const generator: BrandGenerator = {
    id: uuid,
    userId: auth.currentUser.unwrap().uid,
    name: formInputs.name,
    quota: 100,
    updatedAt: new Date(),
    createdAt: new Date(),

    // inputs
    artistDescription: formInputs.artistDescription,
    artistName: formInputs.artistName,
    artistProfession: formInputs.artistProfession,
    gender: formInputs.gender,
    postFreq: formInputs.postFreq,
    refImages: formInputs.refImages,
    sellingPoint: formInputs.sellingPoint,
    socialFollowing: formInputs.socialFollowing,
    theme: formInputs.theme,
    avatarStyle: 'Vintage',

    sdModelId: None,
    sdModelStatus: 'initial',
  };

  // Add to DB
  database.createGenerator(generator);
};
